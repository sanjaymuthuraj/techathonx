// App.jsx
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import Navbar from "./components/Navbar";
import "./App.css";

// Wrapper component to provide navigate to AuthProvider
function AppWithAuth() {
  const navigate = useNavigate();
  
  return (
    <AuthProvider navigate={navigate}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/patient" element={<PatientDashboard />} />
        <Route path="/doctor" element={<DoctorDashboard />} />
      </Routes>
    </AuthProvider>
  );
}

function App() {
  return (
    <Router>
      <AppWithAuth />
    </Router>
  );
}

export default App;