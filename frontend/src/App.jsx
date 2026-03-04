// src/App.jsx
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientVitals from "./pages/patient/Vitals";
import PatientAppointments from "./pages/patient/Appointments";
import PatientConsultations from "./pages/patient/Consultations";
import PatientRecords from "./pages/patient/HealthRecords";
import PatientPrescriptions from "./pages/patient/Prescriptions";
import DoctorPatients from "./pages/doctor/Patients";
import DoctorAppointments from "./pages/doctor/Appointments";
import DoctorConsultations from "./pages/doctor/Consultations";
import DoctorAnalytics from "./pages/doctor/Analytics";
import DoctorReports from "./pages/doctor/Reports";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import ForgotPassword from "./pages/ForgotPassword";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import "./App.css";
import "./components/Loading.css"
import "./components/Navbar.css"
import "./components/VitalForm.css"

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    } else if (allowedRoles && !allowedRoles.includes(user.role)) {
      navigate('/');
    }
  }, [user, allowedRoles, navigate]);

  return user ? children : null;
};

// Wrapper component to provide navigate to AuthProvider
function AppWithAuth() {
  const navigate = useNavigate();
  
  return (
    <AuthProvider navigate={navigate}>
      <Navbar />
      <main className="main-content">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />

          {/* Patient Routes */}
          <Route path="/patient" element={
            <ProtectedRoute allowedRoles={['patient']}>
              <PatientDashboard />
            </ProtectedRoute>
          } />
          <Route path="/patient/vitals" element={
            <ProtectedRoute allowedRoles={['patient']}>
              <PatientVitals />
            </ProtectedRoute>
          } />
          <Route path="/patient/appointments" element={
            <ProtectedRoute allowedRoles={['patient']}>
              <PatientAppointments />
            </ProtectedRoute>
          } />
          <Route path="/patient/consultations" element={
            <ProtectedRoute allowedRoles={['patient']}>
              <PatientConsultations />
            </ProtectedRoute>
          } />
          <Route path="/patient/records" element={
            <ProtectedRoute allowedRoles={['patient']}>
              <PatientRecords />
            </ProtectedRoute>
          } />
          <Route path="/patient/prescriptions" element={
            <ProtectedRoute allowedRoles={['patient']}>
              <PatientPrescriptions />
            </ProtectedRoute>
          } />
          <Route path="/patient/health-summary" element={
            <ProtectedRoute allowedRoles={['patient']}>
              <PatientDashboard />
            </ProtectedRoute>
          } />

          {/* Doctor Routes */}
          <Route path="/doctor" element={
            <ProtectedRoute allowedRoles={['doctor']}>
              <DoctorDashboard />
            </ProtectedRoute>
          } />
          <Route path="/doctor/patients" element={
            <ProtectedRoute allowedRoles={['doctor']}>
              <DoctorPatients />
            </ProtectedRoute>
          } />
          <Route path="/doctor/appointments" element={
            <ProtectedRoute allowedRoles={['doctor']}>
              <DoctorAppointments />
            </ProtectedRoute>
          } />
          <Route path="/doctor/consultations" element={
            <ProtectedRoute allowedRoles={['doctor']}>
              <DoctorConsultations />
            </ProtectedRoute>
          } />
          <Route path="/doctor/analytics" element={
            <ProtectedRoute allowedRoles={['doctor']}>
              <DoctorAnalytics />
            </ProtectedRoute>
          } />
          <Route path="/doctor/reports" element={
            <ProtectedRoute allowedRoles={['doctor']}>
              <DoctorReports />
            </ProtectedRoute>
          } />
          <Route path="/doctor/availability" element={
            <ProtectedRoute allowedRoles={['doctor']}>
              <DoctorDashboard />
            </ProtectedRoute>
          } />

          {/* Shared Protected Routes */}
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } />

          {/* Catch all route - 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
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