// components/VitalForm.jsx - Improved version
import { useState } from 'react';
import AlertCard from './AlertCard';
import './VitalForm.css';

export default function VitalForm() {
  const [vitals, setVitals] = useState({
    temp: '',
    systolic: '',
    diastolic: '',
    sugar: '',
    heartRate: '',
    oxygenLevel: ''
  });

  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const validateVitals = () => {
    const newErrors = {};
    
    if (vitals.temp && (vitals.temp < 95 || vitals.temp > 108)) {
      newErrors.temp = 'Temperature must be between 95°F and 108°F';
    }
    
    if (vitals.systolic && (vitals.systolic < 70 || vitals.systolic > 220)) {
      newErrors.systolic = 'Systolic must be between 70 and 220';
    }
    
    if (vitals.diastolic && (vitals.diastolic < 40 || vitals.diastolic > 130)) {
      newErrors.diastolic = 'Diastolic must be between 40 and 130';
    }
    
    if (vitals.sugar && (vitals.sugar < 40 || vitals.sugar > 600)) {
      newErrors.sugar = 'Sugar level must be between 40 and 600 mg/dL';
    }
    
    if (vitals.heartRate && (vitals.heartRate < 30 || vitals.heartRate > 220)) {
      newErrors.heartRate = 'Heart rate must be between 30 and 220 BPM';
    }
    
    if (vitals.oxygenLevel && (vitals.oxygenLevel < 50 || vitals.oxygenLevel > 100)) {
      newErrors.oxygenLevel = 'Oxygen level must be between 50% and 100%';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setVitals({ ...vitals, [name]: value });
      // Clear error for this field
      if (errors[name]) {
        setErrors({ ...errors, [name]: null });
      }
    }
  };

  const calculateStatus = () => {
    if (!validateVitals()) {
      return;
    }

    let score = 100;
    let alerts = [];
    let recommendations = [];

    // Temperature assessment
    if (vitals.temp > 100.4) {
      alerts.push('Fever');
      score -= vitals.temp > 103 ? 30 : 20;
      recommendations.push('Rest and stay hydrated. Take fever medication if needed.');
    }

    // Blood pressure assessment
    if (vitals.systolic && vitals.diastolic) {
      if (vitals.systolic > 140 || vitals.diastolic > 90) {
        alerts.push('High Blood Pressure');
        score -= 25;
        recommendations.push('Monitor BP regularly. Reduce salt intake.');
      } else if (vitals.systolic < 90 || vitals.diastolic < 60) {
        alerts.push('Low Blood Pressure');
        score -= 15;
        recommendations.push('Stay hydrated. Consult doctor if feeling dizzy.');
      }
    }

    // Blood sugar assessment
    if (vitals.sugar) {
      if (vitals.sugar > 180) {
        alerts.push('High Blood Sugar');
        score -= 20;
        recommendations.push('Monitor sugar intake. Take medication as prescribed.');
      } else if (vitals.sugar < 70) {
        alerts.push('Low Blood Sugar');
        score -= 20;
        recommendations.push('Consume fast-acting carbohydrates immediately.');
      }
    }

    // Heart rate assessment
    if (vitals.heartRate) {
      if (vitals.heartRate > 100) {
        alerts.push('Tachycardia');
        score -= 15;
        recommendations.push('Rest and avoid caffeine. Consult if persistent.');
      } else if (vitals.heartRate < 60) {
        alerts.push('Bradycardia');
        score -= 10;
        recommendations.push('Monitor regularly. Consult if experiencing symptoms.');
      }
    }

    // Oxygen level assessment
    if (vitals.oxygenLevel) {
      if (vitals.oxygenLevel < 95) {
        alerts.push('Low Oxygen Level');
        score -= vitals.oxygenLevel < 90 ? 40 : 25;
        recommendations.push('Deep breathing exercises. Seek immediate help if below 90%.');
      }
    }

    // Determine overall alert level
    let alertLevel = 'Stable';
    if (score < 60) {
      alertLevel = 'Critical';
    } else if (score < 80) {
      alertLevel = 'Moderate';
    } else if (score < 90) {
      alertLevel = 'Mild';
    }

    const alertMessage = alerts.length > 0 
      ? `${alertLevel}: ${alerts.join(', ')}`
      : `${alertLevel}: All vitals normal`;

    setStatus({ 
      alert: alertMessage, 
      score: Math.max(0, score),
      recommendations,
      timestamp: new Date().toLocaleString()
    });
  };

  return (
    <div className="vital-form-container">
      <center>
      <h3>📊 Enter Daily Vitals</h3>
      
      <div className="vitals-grid">
        <div className="input-group">
          <label>Temperature (°F)</label>
          <input
            name="temp"
            value={vitals.temp}
            onChange={handleChange}
            placeholder="98.6"
            className={errors.temp ? 'error' : ''}
          />
          {errors.temp && <span className="error-text">{errors.temp}</span>}
        </div>

        <div className="input-group">
          <label>Systolic BP (mmHg)</label>
          <input
            name="systolic"
            value={vitals.systolic}
            onChange={handleChange}
            placeholder="120"
            className={errors.systolic ? 'error' : ''}
          />
          {errors.systolic && <span className="error-text">{errors.systolic}</span>}
        </div>

        <div className="input-group">
          <label>Diastolic BP (mmHg)</label>
          <input
            name="diastolic"
            value={vitals.diastolic}
            onChange={handleChange}
            placeholder="80"
            className={errors.diastolic ? 'error' : ''}
          />
          {errors.diastolic && <span className="error-text">{errors.diastolic}</span>}
        </div>

        <div className="input-group">
          <label>Blood Sugar (mg/dL)</label>
          <input
            name="sugar"
            value={vitals.sugar}
            onChange={handleChange}
            placeholder="100"
            className={errors.sugar ? 'error' : ''}
          />
          {errors.sugar && <span className="error-text">{errors.sugar}</span>}
        </div>

        <div className="input-group">
          <label>Heart Rate (BPM)</label>
          <input
            name="heartRate"
            value={vitals.heartRate}
            onChange={handleChange}
            placeholder="72"
            className={errors.heartRate ? 'error' : ''}
          />
          {errors.heartRate && <span className="error-text">{errors.heartRate}</span>}
        </div>

        <div className="input-group">
          <label>Oxygen Level (%)</label>
          <input
            name="oxygenLevel"
            value={vitals.oxygenLevel}
            onChange={handleChange}
            placeholder="98"
            className={errors.oxygenLevel ? 'error' : ''}
          />
          {errors.oxygenLevel && <span className="error-text">{errors.oxygenLevel}</span>}
        </div>
      </div>

      <button 
        onClick={calculateStatus} 
        className="submit-btn"
        disabled={Object.keys(vitals).every(key => !vitals[key])}
      >
        Analyze Health Status
      </button>

      {status && <AlertCard status={status} />}
      </center>
    </div>
  );
}