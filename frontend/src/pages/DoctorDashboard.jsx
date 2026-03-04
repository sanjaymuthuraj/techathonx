import VideoCall from "../components/VideoCall";

export default function DoctorDashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Doctor Dashboard</h2>
      <p>Monitor Patients & Alerts Here</p>

      <h3>Join Video Consultation</h3>
      <VideoCall roomName="CareTrack-Consultation" />
    </div>
  );
}