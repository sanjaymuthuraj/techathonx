// src/hooks/useRouteLoader.js
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useRouteLoader = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [location]);

  return loading;
};