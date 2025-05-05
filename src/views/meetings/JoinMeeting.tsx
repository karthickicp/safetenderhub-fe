import React, { useEffect, useRef, useState } from "react";

interface JoinMeetingProps {
  onJoin: (stream: MediaStream) => void;
}

const JoinMeeting: React.FC<JoinMeetingProps> = ({ onJoin }) => {
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const getStream = async () => {
      try {
        const media = await navigator.mediaDevices.getUserMedia({
          video: camOn,
          audio: micOn,
        });
        setStream(media);
        if (videoRef.current) {
          videoRef.current.srcObject = media;
        }
      } catch (err) {
        console.error("Permission denied or error:", err);
      }
    };

    getStream();

    return () => {
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, [micOn, camOn]);

  const toggleMic = () => setMicOn((prev) => !prev);
  const toggleCam = () => setCamOn((prev) => !prev);

  const handleJoin = () => {
    if (stream) onJoin(stream);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4 py-8">
      <h2 className="text-3xl font-semibold mb-6 text-center">
        Ready to Join?
      </h2>

      <div className="w-full max-w-2xl bg-gray-800 rounded-lg p-4 flex flex-col items-center space-y-4 shadow-lg">
        <div className="w-full aspect-video bg-black rounded-md overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={toggleMic}
            className={`px-4 py-2 rounded-md font-medium ${
              micOn
                ? "bg-green-600 hover:bg-green-700"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {micOn ? "Mic On" : "Mic Off"}
          </button>
          <button
            onClick={toggleCam}
            className={`px-4 py-2 rounded-md font-medium ${
              camOn
                ? "bg-green-600 hover:bg-green-700"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {camOn ? "Camera On" : "Camera Off"}
          </button>
        </div>

        <button
          onClick={handleJoin}
          className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-lg w-full max-w-xs"
        >
          Join Meeting
        </button>
      </div>
    </div>
  );
};

export default JoinMeeting;
