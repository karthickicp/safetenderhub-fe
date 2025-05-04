// components/MeetingScreen.tsx
import React, { useEffect, useRef, useState } from "react";

const MeetingScreen: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);

  useEffect(() => {
    const getMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing media devices:", err);
      }
    };

    getMedia();

    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const toggleAudio = () => {
    const audioTracks = streamRef.current?.getAudioTracks();
    if (audioTracks && audioTracks[0]) {
      audioTracks[0].enabled = !audioTracks[0].enabled;
      setIsAudioOn(audioTracks[0].enabled);
    }
  };

  const toggleVideo = () => {
    const videoTracks = streamRef.current?.getVideoTracks();
    if (videoTracks && videoTracks[0]) {
      videoTracks[0].enabled = !videoTracks[0].enabled;
      setIsVideoOn(videoTracks[0].enabled);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <div className="relative w-full max-w-4xl aspect-video bg-black rounded-md overflow-hidden shadow-md">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
          <button
            onClick={toggleAudio}
            className={`px-4 py-2 rounded-full text-white shadow-md ${
              isAudioOn ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {isAudioOn ? "Mute" : "Unmute"}
          </button>
          <button
            onClick={toggleVideo}
            className={`px-4 py-2 rounded-full text-white shadow-md ${
              isVideoOn ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {isVideoOn ? "Camera Off" : "Camera On"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MeetingScreen;
