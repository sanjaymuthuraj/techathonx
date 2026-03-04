// src/context/AuthContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children, navigate }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error('Error loading user from localStorage:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email, password, role) => {
    try {
      console.log('AuthContext login called with:', { email, role });
      
      // Validate inputs
      if (!email || !password || !role) {
        return { success: false, error: 'All fields are required' };
      }

      // Mock login - In production, replace with actual API call
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock user data based on role
      const userData = {
        id: Date.now().toString(),
        email,
        name: role === 'doctor' ? 'Dr. Smith' : 'John Doe',
        role,
        token: 'mock-jwt-token-' + Date.now()
      };
      
      // Save to state and localStorage
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      
      console.log('Login successful, user:', userData);
      
      // Navigate based on role
      if (navigate) {
        const path = role === 'patient' ? '/patient' : '/doctor';
        console.log('Navigating to:', path);
        navigate(path);
      }
      
      return { success: true, user: userData };
    } catch (error) {
      console.error('Login error in context:', error);
      return { success: false, error: error.message || 'Login failed' };
    }
  };

  const register = async (userData) => {
    try {
      // Validate inputs
      if (!userData.name || !userData.email || !userData.password) {
        return { success: false, error: 'All fields are required' };
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newUser = {
        id: Date.now().toString(),
        ...userData,
        token: 'mock-jwt-token-' + Date.now()
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      if (navigate) {
        navigate(userData.role === 'patient' ? '/patient' : '/doctor');
      }
      
      return { success: true, user: newUser };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: error.message || 'Registration failed' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    if (navigate) {
      navigate('/');
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};