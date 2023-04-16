import React from "react";
import Controls from "./Controls";
import Videos from "./Videos";
import { useAgoraVideoCallContext } from "./AgoraVideoCallContext";
import { IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng";

interface VideoCallProps {
  setInCall: React.Dispatch<React.SetStateAction<boolean>>;
}

const VideoCall: React.FunctionComponent<VideoCallProps> = ({ setInCall }) => {
  const { useAgoraClient, useMicrophoneAndCameraTracks, config, channel } =
    useAgoraVideoCallContext();

  //   const { setInCall, channelName } = props;
  const [users, setUsers] = React.useState<IAgoraRTCRemoteUser[]>([]);
  const [start, setStart] = React.useState<boolean>(false);
  // using the hook to get access to the client object
  const client = useAgoraClient();
  // ready is a state variable, which returns true when the local tracks are initialized, untill then tracks variable is null
  const { ready, tracks } = useMicrophoneAndCameraTracks();

  React.useEffect(() => {
    // function to initialise the SDK
    let init = async (name: string) => {
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        console.log("subscribe success");
        if (mediaType === "video") {
          setUsers((prevUsers) => {
            return [...prevUsers, user];
          });
        }
        if (mediaType === "audio") {
          user.audioTrack?.play();
        }
      });

      client.on("user-unpublished", (user, type) => {
        console.log("unpublished", user, type);
        if (type === "audio") {
          user.audioTrack?.stop();
        }
        if (type === "video") {
          setUsers((prevUsers) => {
            return prevUsers.filter((User) => User.uid !== user.uid);
          });
        }
      });

      client.on("user-left", (user) => {
        console.log("leaving", user);
        setUsers((prevUsers) => {
          return prevUsers.filter((User) => User.uid !== user.uid);
        });
      });

      console.log("channel", name);
      await client.join(config.appId, name, null, null);
      if (tracks) await client.publish([tracks[0], tracks[1]]);
      setStart(true);
    };

    if (ready && tracks) {
      console.log("init ready");
      init(channel);
    }
  }, [channel, client, ready, tracks]);

  return (
    <div className="relative w-full h-full gap-2 border border-red-400">
      <div className="absolute bottom-0 left-0 w-full h-16 z-100">
        {ready && tracks && (
          <Controls tracks={tracks} setStart={setStart} setInCall={setInCall} />
        )}
      </div>
      {/* only show 9 videos at a time */}
      {start && tracks && <Videos users={users.slice(0, 8)} tracks={tracks} />}
    </div>
  );
};

export default VideoCall;
