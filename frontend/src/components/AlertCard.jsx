export default function AlertCard({ status }) {
  return (
    <div style={{
      marginTop: "20px",
      padding: "15px",
      border: "1px solid #ccc",
      background: "#f5f5f5"
    }}>
      <h4>Health Status: {status.alert}</h4>
      <p>Recovery Score: {status.score}/100</p>
    </div>
  );
}