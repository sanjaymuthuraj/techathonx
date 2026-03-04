// components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return (
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        backgroundColor: '#f8f9fa',
        borderBottom: '1px solid #dee2e6'
      }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold', fontSize: '1.2rem' }}>
          CareTrack
        </Link>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/" style={{ textDecoration: 'none', color: '#666' }}>
            Login
          </Link>
          <Link to="/register" style={{ textDecoration: 'none', color: '#666' }}>
            Register
          </Link>
        </div>
      </nav>
    );
  }

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: '#f8f9fa',
      borderBottom: '1px solid #dee2e6'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold', fontSize: '1.2rem' }}>
          CareTrack
        </Link>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          {user.role === 'patient' && (
            <Link to="/patient" style={{ textDecoration: 'none', color: '#666' }}>
              Dashboard
            </Link>
          )}
          {user.role === 'doctor' && (
            <Link to="/doctor" style={{ textDecoration: 'none', color: '#666' }}>
              Dashboard
            </Link>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ color: '#666' }}>Welcome, {user.name}</span>
        <button 
          onClick={handleLogout}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            transition: 'background-color 0.3s'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#c82333'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#dc3545'}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}