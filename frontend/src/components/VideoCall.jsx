import { JitsiMeeting } from "@jitsi/react-sdk";

export default function VideoCall({ roomName }) {
  return (
    <div style={{ height: "500px", marginTop: "20px" }}>
      <JitsiMeeting
        domain="meet.jit.si"
        roomName={roomName}
        configOverwrite={{
          startWithAudioMuted: false,
          startWithVideoMuted: false,
        }}
        getIFrameRef={(iframeRef) => {
          iframeRef.style.height = "100%";
        }}
      />
    </div>
  );
}