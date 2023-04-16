import React from "react";
import { useAgoraVideoCallContext } from "./AgoraVideoCallContext";

interface ChannelFormProps {
  setInCall: React.Dispatch<React.SetStateAction<boolean>>;
  appId: string;
  setChannelName: React.Dispatch<React.SetStateAction<string>>;
}

const ChannelForm: React.FunctionComponent<ChannelFormProps> = ({
  setInCall,
  appId,
  setChannelName,
}) => {
  return (
    <div className="p-16">
      {appId === "" && (
        <p style={{ color: "red" }}>
          Please enter your Agora App ID in App.tsx and refresh the page
        </p>
      )}
      <div className="relative max-w-lg">
        <label
          htmlFor="name"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Chanel
        </label>
        <div className="mt-2">
          <input
            name="name"
            id="name"
            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="abc-xyz"
            onChange={(e) => setChannelName(e.target.value)}
          />
        </div>
      </div>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          setInCall(true);
        }}
        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Join
      </button>
    </div>
  );
};

export default ChannelForm;
