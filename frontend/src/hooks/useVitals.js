import { useState, useEffect } from 'react';

export const useVitals = () => {
  const [vitals, setVitals] = useState({ hr: 72, spo2: 98, status: 'Stable' });

  useEffect(() => {
    const interval = setInterval(() => {
      const hr = Math.floor(Math.random() * (105 - 65) + 65);
      const spo2 = Math.floor(Math.random() * (100 - 90) + 90);
      
      let status = 'Stable';
      if (hr > 100 || spo2 < 93) status = 'Critical';
      else if (hr > 90 || spo2 < 95) status = 'Warning';

      setVitals({ hr, spo2, status });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return vitals;
};