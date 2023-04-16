import React from "react";
import {
  AgoraVideoCallConfig,
  AgoraVideoCallContextProvider,
} from "./AgoraVideoCallContext";
import ChannelForm from "./ChannelForm";
import VideoCall from "./VideoCall";

const appId: string = process.env.NEXT_PUBLIC_AGORA_ID_APP || "";

interface AgoraVideoCallProps {}

const AgoraVideoCall: React.FunctionComponent<AgoraVideoCallProps> = () => {
  const [inCall, setInCall] = React.useState(false);
  const [channelName, setChannelName] = React.useState("");
  const [token, setToken] = React.useState("");
  const [configAgora, setConfigAgora] = React.useState<AgoraVideoCallConfig>({
    mode: "rtc",
    codec: "vp8",
    appId,
  });

  React.useEffect(() => {
    setConfigAgora((prev) => ({ ...prev, channel: channelName }));
  }, [channelName]);

  React.useEffect(() => {
    console.log("configAgora", configAgora);
  }, [configAgora]);

  return (
    <div className="w-full h-full">
      {inCall ? (
        <>
          <AgoraVideoCallContextProvider
            config={configAgora}
            channel={channelName}
            token={token}
          >
            <VideoCall setInCall={setInCall} />
          </AgoraVideoCallContextProvider>
        </>
      ) : (
        <ChannelForm
          setInCall={setInCall}
          setChannelName={setChannelName}
          appId={configAgora.appId}
        />
      )}
    </div>
  );
};

export default AgoraVideoCall;
