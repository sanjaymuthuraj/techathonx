// pages/PatientDashboard.jsx
import { useState, useEffect } from 'react';
import VitalForm from "../components/VitalForm";
import VideoCall from "../components/VideoCall";
import Loading, { CardSkeleton } from "../components/Loading";

export default function PatientDashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Patient Dashboard</h2>
        <CardSkeleton />
        <hr />
        <CardSkeleton />
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Patient Dashboard</h2>
      <VitalForm />
      <hr />
      <h3>Consult Doctor</h3>
      <VideoCall roomName="CareTrack-Consultation" />
    </div>
  );
}