import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { io } from "socket.io-client";
import Peer from "simple-peer";

const socket = io("http://localhost:5000"); // Replace with your signaling server URL

interface PeerConnection {
  peerID: string;
  peer: Peer.Instance;
}

const MeetingRoom = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { audio, video } = location.state || { audio: true, video: true };

  const [peers, setPeers] = useState<PeerConnection[]>([]);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [isAudio, setIsAudio] = useState(audio);
  const [isVideo, setIsVideo] = useState(video);

  const userVideo = useRef<HTMLVideoElement | null>(null);
  const peersRef = useRef<any[]>([]);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: isVideo, audio: isAudio })
      .then((stream) => {
        setStream(stream);
        if (userVideo.current) {
          userVideo.current.srcObject = stream;
        }

        socket.emit("join-room");

        socket.on("all-users", (users: string[]) => {
          const peers: PeerConnection[] = [];
          users.forEach((userID) => {
            const peer = createPeer(userID, socket.id || "", stream);
            peersRef.current.push({ peerID: userID, peer });
            peers.push({ peerID: userID, peer });
          });
          setPeers(peers);
        });

        socket.on("user-joined", (payload: any) => {
          const peer = addPeer(payload.signal, payload.callerID, stream);
          peersRef.current.push({ peerID: payload.callerID, peer });
          setPeers((users) => [...users, { peerID: payload.callerID, peer }]);
        });

        socket.on("receiving-returned-signal", (payload: any) => {
          const item = peersRef.current.find((p) => p.peerID === payload.id);
          item.peer.signal(payload.signal);
        });
      });
  }, []);

  function createPeer(
    userToSignal: string,
    callerID: string,
    stream: MediaStream
  ) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socket.emit("sending-signal", { userToSignal, callerID, signal });
    });

    return peer;
  }

  function addPeer(
    incomingSignal: Peer.SignalData,
    callerID: string,
    stream: MediaStream
  ) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socket.emit("returning-signal", { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  }

  const toggleAudio = () => {
    if (stream) {
      stream
        .getAudioTracks()
        .forEach((track) => (track.enabled = !track.enabled));
      setIsAudio(!isAudio);
    }
  };

  const toggleVideo = () => {
    if (stream) {
      stream
        .getVideoTracks()
        .forEach((track) => (track.enabled = !track.enabled));
      setIsVideo(!isVideo);
    }
  };

  const sendMessage = () => {
    if (message.trim()) {
      setChatMessages((prev) => [...prev, `You: ${message}`]);
      socket.emit("send-chat-message", message);
      setMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive-chat-message", (msg: string) => {
      setChatMessages((prev) => [...prev, `Peer: ${msg}`]);
    });
  }, []);

  const leaveMeeting = () => {
    stream?.getTracks().forEach((track) => track.stop());
    socket.disconnect();
    navigate("/");
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-black text-white">
      <div className="w-full md:w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-2">
        <video
          muted
          ref={userVideo}
          autoPlay
          playsInline
          className="w-full h-64 bg-gray-800 rounded-lg"
        />
        {peers.map((peer, index) => (
          <Video key={index} peer={peer.peer} />
        ))}
      </div>
      <div className="w-full md:w-1/4 flex flex-col bg-white text-black">
        <div className="flex-1 p-2 overflow-y-auto border-b border-gray-300">
          <h2 className="text-lg font-semibold mb-2">Chat</h2>
          {chatMessages.map((msg, idx) => (
            <div key={idx} className="text-sm mb-1">
              {msg}
            </div>
          ))}
        </div>
        <div className="p-2 flex gap-2">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 p-1 border border-gray-300 rounded"
            placeholder="Type message"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-3 rounded"
          >
            Send
          </button>
        </div>
        <div className="flex justify-between p-2 border-t border-gray-300">
          <button
            onClick={toggleAudio}
            className="bg-gray-800 text-white px-4 py-2 rounded"
          >
            {isAudio ? "Mute" : "Unmute"}
          </button>
          <button
            onClick={toggleVideo}
            className="bg-gray-800 text-white px-4 py-2 rounded"
          >
            {isVideo ? "Turn Off Camera" : "Turn On Camera"}
          </button>
          <button
            onClick={leaveMeeting}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  );
};

const Video = ({ peer }: { peer: Peer.Instance }) => {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    peer.on("stream", (stream) => {
      if (ref.current) {
        ref.current.srcObject = stream;
      }
    });
  }, []);

  return (
    <video
      playsInline
      autoPlay
      ref={ref}
      className="w-full h-64 bg-gray-800 rounded-lg"
    />
  );
};

export default MeetingRoom;
