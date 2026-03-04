// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import './Auth.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [role, setRole] = useState('patient');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await login(formData.email, formData.password, role);
      if (!result?.success) {
        setError(result?.error || 'Invalid credentials');
      }
    } catch (err) {
      setError('Connection error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <center>
      {/* Left Panel - Hidden on mobile */}
      <div className="login-illustration">
        <div className="illustration-content">
          <div className="floating-cards">
            <div className="card card-1">
              <span className="card-icon">❤️</span>
              <div className="card-info">
                <span>Heart Rate</span>
                <strong>72 bpm</strong>
              </div>
            </div>
            <div className="card card-2">
              <span className="card-icon">🩺</span>
              <div className="card-info">
                <span>Blood Pressure</span>
                <strong>120/80</strong>
              </div>
            </div>
            <div className="card card-3">
              <span className="card-icon">🌡️</span>
              <div className="card-info">
                <span>Temperature</span>
                <strong>98.6°F</strong>
              </div>
            </div>
          </div>
          <div className="illustration-text">
            <h1>CareTrack</h1>
            <p>Your Complete Healthcare<br />Monitoring Solution</p>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="login-form-panel">
        <div className="form-wrapper">
          {/* Header */}
          <div className="form-header">
            <h2>Welcome Back</h2>
            <p>Please enter your details to sign in</p>
          </div>

          {/* Role Tabs */}
          <div className="role-tabs">
            <button
              className={`tab-btn ${role === 'patient' ? 'active' : ''}`}
              onClick={() => setRole('patient')}
            >
              <span className="tab-icon">👤</span>
              Patient
            </button>
            <button
              className={`tab-btn ${role === 'doctor' ? 'active' : ''}`}
              onClick={() => setRole('doctor')}
            >
              <span className="tab-icon">👨‍⚕️</span>
              Doctor
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="error-alert">
              <span className="alert-icon">⚠️</span>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="form-group">
              <label className="form-label">
                <span className="label-icon">📧</span>
                Email Address
              </label>
              <div className="input-wrapper">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="doctor@caretrack.com"
                  disabled={loading}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label className="form-label">
                <span className="label-icon">🔒</span>
                Password
              </label>
              <div className="input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  disabled={loading}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            {/* Form Options */}
            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" defaultChecked />
                <span className="checkbox-custom"></span>
                <span className="checkbox-text">Remember me</span>
              </label>
              <Link to="/forgot-password" className="forgot-link">
                Forgot password?
              </Link>
            </div>

            {/* Demo Credentials */}
            <div className="demo-section">
              <div className="demo-title">DEMO CREDENTIALS</div>
              <div className="demo-buttons">
                <button
                  type="button"
                  className="demo-btn patient"
                  onClick={() => setFormData({ 
                    email: 'patient@caretrack.com', 
                    password: 'password123' 
                  })}
                >
                  <span>👤</span>
                  Patient Demo
                </button>
                <button
                  type="button"
                  className="demo-btn doctor"
                  onClick={() => setFormData({ 
                    email: 'doctor@caretrack.com', 
                    password: 'password123' 
                  })}
                >
                  <span>👨‍⚕️</span>
                  Doctor Demo
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <span className="btn-arrow">→</span>
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="form-footer">
            <p className="register-text">
              Don't have an account? <Link to="/register">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
      </center>
    </div>
    
  );
}

export default Login;