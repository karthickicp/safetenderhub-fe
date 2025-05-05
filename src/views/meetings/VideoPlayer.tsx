import React, { useRef, useEffect } from "react";

interface Props {
  stream: MediaStream | null;
  isLocal?: boolean;
}

const VideoPlayer: React.FC<Props> = ({ stream, isLocal }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted={isLocal}
      playsInline
      className="w-full h-auto rounded-md"
    />
  );
};

export default VideoPlayer;
