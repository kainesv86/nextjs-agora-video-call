import React from "react";
// import {} from "agora-rtc-sdk-ng";
import {
  createClient,
  ClientConfig,
  createMicrophoneAndCameraTracks,
  IAgoraRTCClient,
  IMicrophoneAudioTrack,
  ICameraVideoTrack,
  AgoraRTCError,
} from "agora-rtc-react";

export interface AgoraVideoCallConfig extends Omit<ClientConfig, "channel"> {
  appId: string;
}

export interface AgoraMicrophoneAndCameraTracks {
  ready: boolean;
  tracks: [IMicrophoneAudioTrack, ICameraVideoTrack] | null;
  error: AgoraRTCError | null;
}

interface AgoraVideoCallContextProps {
  useAgoraClient: () => IAgoraRTCClient;
  useMicrophoneAndCameraTracks: () => AgoraMicrophoneAndCameraTracks;
  config: AgoraVideoCallConfig;
  channel: string;
  token: string | undefined;
}

const AgoraVideoCallContext = React.createContext<AgoraVideoCallContextProps>({
  useAgoraClient: createClient({
    appId: "",
    mode: "rtc",
    codec: "vp8",
  } as AgoraVideoCallConfig),
  config: {
    appId: "",
    mode: "rtc",
    codec: "vp8",
  },
  useMicrophoneAndCameraTracks: createMicrophoneAndCameraTracks(),
  channel: "",
  token: "",
});

interface AgoraVideoCallContextProviderProps extends React.PropsWithChildren {
  config: AgoraVideoCallConfig;
  channel: string;
  token?: string;
}

export const AgoraVideoCallContextProvider: React.FunctionComponent<
  AgoraVideoCallContextProviderProps
> = ({ config, children, channel, token }) => {
  const methods = React.useMemo(() => createClient(config), [config]);
  const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

  return (
    <AgoraVideoCallContext.Provider
      value={{
        channel,
        token,
        config,
        useAgoraClient: methods,
        useMicrophoneAndCameraTracks,
      }}
    >
      {children}
    </AgoraVideoCallContext.Provider>
  );
};

export const useAgoraVideoCallContext = () => {
  const methods = React.useContext(AgoraVideoCallContext);
  return { ...methods };
};
