import dynamic from "next/dynamic";

const AgoraVideoCall = dynamic(() => import("@/screens/AgoraVideoCall"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="w-full h-screen bg-white">
      <AgoraVideoCall />
    </main>
  );
}
