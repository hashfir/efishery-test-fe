import React from 'react';
import './loader.css';

function LoaderComponent() {
  return (
    <div className="overlay">
      <div className="overlay__inner" />
      <div className="loader" />
    </div>
  );
}

export default LoaderComponent;
