import React from 'react';
import '../styles/components.css';

/**
 * A simple loading spinner.
 */
const LoadingSpinner = () => {
  return (
    <div className="spinner-overlay">
      <div className="loading-spinner"></div>
    </div>
  );
};

export default LoadingSpinner;