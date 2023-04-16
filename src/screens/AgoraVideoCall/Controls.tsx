import {
  MicrophoneIcon,
  PhoneIcon,
  VideoCameraIcon,
  VideoCameraSlashIcon,
} from "@heroicons/react/24/solid";
import { ICameraVideoTrack, IMicrophoneAudioTrack } from "agora-rtc-sdk-ng";
import React from "react";
import { useAgoraVideoCallContext } from "./AgoraVideoCallContext";

interface ControlsProps {
  tracks: [IMicrophoneAudioTrack, ICameraVideoTrack];
  setStart: React.Dispatch<React.SetStateAction<boolean>>;
  setInCall: React.Dispatch<React.SetStateAction<boolean>>;
}

const Controls: React.FunctionComponent<ControlsProps> = ({
  setInCall,
  setStart,
  tracks,
}) => {
  const { useAgoraClient } = useAgoraVideoCallContext();
  const client = useAgoraClient();

  const [trackState, setTrackState] = React.useState({
    video: true,
    audio: true,
  });

  const mute = async (type: "audio" | "video") => {
    if (type === "audio") {
      await tracks[0].setEnabled(!trackState.audio);
      setTrackState((ps) => {
        return { ...ps, audio: !ps.audio };
      });
    } else if (type === "video") {
      await tracks[1].setEnabled(!trackState.video);
      setTrackState((ps) => {
        return { ...ps, video: !ps.video };
      });
    }
  };

  const leaveChannel = async () => {
    await client.leave();
    client.removeAllListeners();
    // we close the tracks to perform cleanup
    tracks[0].close();
    tracks[1].close();
    setStart(false);
    setInCall(false);
  };

  return (
    <div className="flex items-center justify-center h-full gap-2 bg-gray-900 text-gray-50">
      <button className={"h-10 w-10"} onClick={() => mute("audio")}>
        {trackState.audio ? (
          <MicrophoneIcon />
        ) : (
          <MicrophoneIcon className="text-red-600" />
        )}
      </button>
      <button className={"h-10 w-10"} onClick={() => mute("video")}>
        {trackState.video ? <VideoCameraIcon /> : <VideoCameraSlashIcon />}
      </button>
      {
        <button className={"h-10 w-10"} onClick={() => leaveChannel()}>
          <PhoneIcon className="text-red-600" />
        </button>
      }
    </div>
  );
};

export default Controls;
