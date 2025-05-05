import { useState } from "react";
import JoinMeeting from "./JoinMeeting";
import MeetingRoom from "./MeetingRoom";

export default function MeetingRouter() {
  const [joined, setJoined] = useState(false);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);

  const handleJoin = (stream: MediaStream) => {
    setLocalStream(stream);
    setJoined(true);
  };

  return joined && localStream ? (
    <MeetingRoom />
  ) : (
    <JoinMeeting onJoin={handleJoin} />
  );
}
