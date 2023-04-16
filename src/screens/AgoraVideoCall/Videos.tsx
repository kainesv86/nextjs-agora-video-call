import { AgoraVideoPlayer } from "agora-rtc-react";
import {
  IAgoraRTCRemoteUser,
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
} from "agora-rtc-sdk-ng";
import React from "react";

interface VideosProps {
  users: IAgoraRTCRemoteUser[];
  tracks: [IMicrophoneAudioTrack, ICameraVideoTrack];
}

const Videos: React.FunctionComponent<VideosProps> = ({ tracks, users }) => {
  return (
    <div
      id="videos"
      className="flex flex-wrap items-center justify-center w-full h-full gap-4"
    >
      {/* AgoraVideoPlayer component takes in the video track to render the stream,
                you can pass in other props that get passed to the rendered div */}
      <AgoraVideoPlayer
        className="h-full max-h-72 aspect-video"
        videoTrack={tracks[1]}
      />
      {users.length > 0 &&
        users.map((user) => {
          if (user.videoTrack) {
            return (
              <AgoraVideoPlayer
                className="h-full max-h-72 aspect-video"
                videoTrack={user.videoTrack}
                key={user.uid}
              />
            );
          } else return null;
        })}
    </div>
  );
};

export default Videos;
