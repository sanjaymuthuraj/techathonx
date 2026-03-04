// src/components/Navbar.jsx - Updated with correct routes
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Get navigation links based on user role
  const getNavLinks = () => {
    if (!user) return [];

    if (user.role === 'patient') {
      return [
        { path: '/patient', label: 'Dashboard', icon: '📊' },
        { path: '/patient/vitals', label: 'My Vitals', icon: '❤️' },
        { path: '/patient/appointments', label: 'Appointments', icon: '📅' },
        { path: '/patient/consultations', label: 'Consultations', icon: '👨‍⚕️' },
        { path: '/patient/records', label: 'Health Records', icon: '📋' },
        { path: '/patient/prescriptions', label: 'Prescriptions', icon: '💊' }
      ];
    }

    if (user.role === 'doctor') {
      return [
        { path: '/doctor', label: 'Dashboard', icon: '📊' },
        { path: '/doctor/patients', label: 'My Patients', icon: '👥' },
        { path: '/doctor/appointments', label: 'Schedule', icon: '📅' },
        { path: '/doctor/consultations', label: 'Video Calls', icon: '📹' },
        { path: '/doctor/analytics', label: 'Analytics', icon: '📈' },
        { path: '/doctor/reports', label: 'Reports', icon: '📑' }
      ];
    }

    return [];
  };

  const navLinks = getNavLinks();

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={() => setIsMobileMenuOpen(false)}>
          <span className="logo-icon">🏥</span>
          <span className="logo-text">CareTrack</span>
          {user && <span className="role-badge">{user.role}</span>}
        </Link>

        {/* Desktop Navigation Links */}
        {user && (
          <div className="navbar-links">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              >
                <span className="nav-icon">{link.icon}</span>
                <span className="nav-label">{link.label}</span>
              </Link>
            ))}
          </div>
        )}

        {/* Right Section - User Menu / Auth Buttons */}
        <div className="navbar-right">
          {user ? (
            <div className="user-menu">
              {/* Notifications */}
              <button className="notification-btn" onClick={() => {}}>
                <span className="notification-icon">🔔</span>
                <span className="notification-badge">3</span>
              </button>

              {/* Profile Dropdown */}
              <div className="profile-dropdown">
                <button
                  className="profile-btn"
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                >
                  <div className="profile-avatar">
                    {user.name?.charAt(0) || 'U'}
                  </div>
                  <span className="profile-name">{user.name}</span>
                  <span className={`dropdown-arrow ${isProfileMenuOpen ? 'open' : ''}`}>
                    ▼
                  </span>
                </button>

                {isProfileMenuOpen && (
                  <div className="dropdown-menu">
                    <div className="dropdown-header">
                      <div className="dropdown-avatar">
                        {user.name?.charAt(0) || 'U'}
                      </div>
                      <div className="dropdown-user-info">
                        <strong>{user.name}</strong>
                        <span>{user.email}</span>
                        <span className="user-role">{user.role}</span>
                      </div>
                    </div>

                    <div className="dropdown-divider"></div>

                    <Link to="/profile" className="dropdown-item">
                      <span className="item-icon">👤</span>
                      My Profile
                    </Link>

                    <Link to="/settings" className="dropdown-item">
                      <span className="item-icon">⚙️</span>
                      Settings
                    </Link>

                    {user.role === 'patient' && (
                      <Link to="/patient/health-summary" className="dropdown-item">
                        <span className="item-icon">📊</span>
                        Health Summary
                      </Link>
                    )}

                    {user.role === 'doctor' && (
                      <Link to="/doctor/availability" className="dropdown-item">
                        <span className="item-icon">⏰</span>
                        Set Availability
                      </Link>
                    )}

                    <div className="dropdown-divider"></div>

                    <button onClick={handleLogout} className="dropdown-item logout-btn">
                      <span className="item-icon">🚪</span>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/" className="login-btn-nav">
                <span>🔐</span>
                Login
              </Link>
              <Link to="/register" className="register-btn-nav">
                <span>📝</span>
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        {user ? (
          <>
            {/* Mobile User Info */}
            <div className="mobile-user-info">
              <div className="mobile-avatar">
                {user.name?.charAt(0) || 'U'}
              </div>
              <div className="mobile-user-details">
                <strong>{user.name}</strong>
                <span>{user.email}</span>
                <span className="mobile-role">{user.role}</span>
              </div>
            </div>

            <div className="mobile-divider"></div>

            {/* Mobile Navigation Links */}
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="mobile-nav-icon">{link.icon}</span>
                <span className="mobile-nav-label">{link.label}</span>
              </Link>
            ))}

            <div className="mobile-divider"></div>

            {/* Mobile Profile Links */}
            <Link to="/profile" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              <span className="mobile-nav-icon">👤</span>
              My Profile
            </Link>

            <Link to="/settings" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              <span className="mobile-nav-icon">⚙️</span>
              Settings
            </Link>

            {user.role === 'patient' && (
              <Link to="/patient/health-summary" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                <span className="mobile-nav-icon">📊</span>
                Health Summary
              </Link>
            )}

            {user.role === 'doctor' && (
              <Link to="/doctor/availability" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                <span className="mobile-nav-icon">⏰</span>
                Set Availability
              </Link>
            )}

            <button onClick={handleLogout} className="mobile-logout-btn">
              <span className="mobile-nav-icon">🚪</span>
              Logout
            </button>
          </>
        ) : (
          // Mobile Auth Buttons
          <div className="mobile-auth">
            <Link to="/" className="mobile-login-btn" onClick={() => setIsMobileMenuOpen(false)}>
              <span>🔐</span>
              Login
            </Link>
            <Link to="/register" className="mobile-register-btn" onClick={() => setIsMobileMenuOpen(false)}>
              <span>📝</span>
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;