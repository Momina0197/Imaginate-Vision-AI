import React from "react";
import './ImageGenerator.css';

const LoadingError = ({ loading }) => {
  return (
    <div className="loading-error">
      {loading && <div className="loading">Generating image, please wait...</div>}
    </div>
  );
};

export default LoadingError;


