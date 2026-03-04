// src/pages/Login.jsx
import { useState, useEffect } from 'react';
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
  const [activeField, setActiveField] = useState(null);

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
      if (result?.success) {
        // Success toast
      } else {
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
      {/* Left Panel - Healthcare Illustration */}
      <div className="login-illustration">
        <div className="illustration-content">
          <div className="floating-cards">
            <div className="card card-1">
              <span className="card-icon">❤️</span>
              <span>Heart Rate</span>
              <strong>72 bpm</strong>
            </div>
            <div className="card card-2">
              <span className="card-icon">🩺</span>
              <span>Blood Pressure</span>
              <strong>120/80</strong>
            </div>
            <div className="card card-3">
              <span className="card-icon">🌡️</span>
              <span>Temperature</span>
              <strong>98.6°F</strong>
            </div>
          </div>
          <div className="illustration-text">
            <h1>CareTrack</h1>
            <p>Your Complete Healthcare Monitoring Solution</p>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-value">24/7</span>
                <span className="stat-label">Monitoring</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">100+</span>
                <span className="stat-label">Doctors</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">10k+</span>
                <span className="stat-label">Patients</span>
              </div>
            </div>
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
          <form onSubmit={handleSubmit} className="login-form">
            {/* Email Field */}
            <div className={`input-group ${activeField === 'email' ? 'focused' : ''}`}>
              <label className="input-label">
                <span className="label-icon">📧</span>
                Email Address
              </label>
              <div className="input-wrapper">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setActiveField('email')}
                  onBlur={() => setActiveField(null)}
                  placeholder="doctor@caretrack.com"
                  disabled={loading}
                  required
                />
                {formData.email && !error && (
                  <span className="input-check">✓</span>
                )}
              </div>
            </div>

            {/* Password Field */}
            <div className={`input-group ${activeField === 'password' ? 'focused' : ''}`}>
              <label className="input-label">
                <span className="label-icon">🔒</span>
                Password
              </label>
              <div className="input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setActiveField('password')}
                  onBlur={() => setActiveField(null)}
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
              <label className="checkbox-container">
                <input type="checkbox" defaultChecked />
                <span className="checkmark"></span>
                <span className="checkbox-text">Remember me</span>
              </label>
              <Link to="/forgot-password" className="forgot-link">
                Forgot password?
              </Link>
            </div>

            {/* Demo Credentials */}
            <div className="demo-section">
              <p className="demo-title">Demo Credentials</p>
              <div className="demo-buttons">
                <button
                  type="button"
                  className="demo-btn patient"
                  onClick={() => setFormData({ email: 'patient@caretrack.com', password: 'password123' })}
                >
                  <span>👤</span>
                  Patient Demo
                </button>
                <button
                  type="button"
                  className="demo-btn doctor"
                  onClick={() => setFormData({ email: 'doctor@caretrack.com', password: 'password123' })}
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

            {/* Social Login */}
            <div className="social-section">
              <div className="divider">
                <span>Or continue with</span>
              </div>
              <div className="social-buttons">
                <button type="button" className="social-btn google">
                  <img src="https://www.google.com/favicon.ico" alt="Google" />
                  Google
                </button>
                <button type="button" className="social-btn github">
                  <span className="github-icon">⌨️</span>
                  GitHub
                </button>
              </div>
            </div>

            {/* Register Link */}
            <p className="register-text">
              Don't have an account? <Link to="/register">Create account</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;