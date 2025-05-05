interface Props {
  isMuted: boolean;
  isCameraOff: boolean;
  onToggleAudio: () => void;
  onToggleVideo: () => void;
  onExit: () => void;
}

const Controls: React.FC<Props> = ({
  isMuted,
  isCameraOff,
  onToggleAudio,
  onToggleVideo,
  onExit,
}) => (
  <div className="flex gap-4 justify-center mt-4 flex-wrap">
    <button
      onClick={onToggleAudio}
      className="bg-gray-800 text-white px-4 py-2 rounded"
    >
      {isMuted ? "Unmute" : "Mute"}
    </button>
    <button
      onClick={onToggleVideo}
      className="bg-gray-800 text-white px-4 py-2 rounded"
    >
      {isCameraOff ? "Turn On Camera" : "Turn Off Camera"}
    </button>
    <button
      onClick={onExit}
      className="bg-red-600 text-white px-4 py-2 rounded"
    >
      Exit Meeting
    </button>
  </div>
);

export default Controls;
