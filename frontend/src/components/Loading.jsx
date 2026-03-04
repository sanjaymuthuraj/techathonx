// src/components/Loading.jsx
import { useState, useEffect } from 'react';
import './Loading.css';

const Loading = ({ type = 'fullscreen', message = 'Loading...', progress = null }) => {
  const [dots, setDots] = useState('');

  // Animated dots for text
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 400);
    return () => clearInterval(interval);
  }, []);

  // Different loading types
  if (type === 'fullscreen') {
    return (
      <div className="loading-fullscreen">
        <div className="loading-container">
          <div className="medical-loader">
            <div className="heart-beat">
              <div className="beat"></div>
              <div className="beat"></div>
              <div className="beat"></div>
              <div className="beat"></div>
              <div className="beat"></div>
            </div>
            <div className="pulse-ring"></div>
          </div>
          <div className="loading-text">
            {message}
            <span className="loading-dots">{dots}</span>
          </div>
          {progress !== null && (
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
          <div className="medical-badge">
            <span className="badge-icon">⚕️</span>
            <span className="badge-text">CareTrack</span>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'inline') {
    return (
      <div className="loading-inline">
        <div className="spinner-small"></div>
        <span className="loading-inline-text">{message}{dots}</span>
      </div>
    );
  }

  if (type === 'skeleton') {
    return (
      <div className="loading-skeleton">
        <div className="skeleton-header"></div>
        <div className="skeleton-content">
          <div className="skeleton-line"></div>
          <div className="skeleton-line"></div>
          <div className="skeleton-line"></div>
        </div>
        <div className="skeleton-footer"></div>
      </div>
    );
  }

  return null;
};

// Page Transition Loading Component
export const PageTransition = () => {
  return (
    <div className="page-transition">
      <div className="transition-logo">
        <span className="logo-pulse">🏥</span>
      </div>
    </div>
  );
};

// Button Loading Spinner
export const ButtonSpinner = () => {
  return <span className="button-spinner"></span>;
};

// Card Skeleton Loader
export const CardSkeleton = () => {
  return (
    <div className="card-skeleton">
      <div className="skeleton-avatar"></div>
      <div className="skeleton-details">
        <div className="skeleton-title"></div>
        <div className="skeleton-meta"></div>
        <div className="skeleton-stats">
          <div className="skeleton-stat"></div>
          <div className="skeleton-stat"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;