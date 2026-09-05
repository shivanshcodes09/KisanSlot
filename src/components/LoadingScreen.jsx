import React from 'react';
import '../styles/LoadingScreen.css';

export default function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="tractor-container">
        <div className="tractor">🚜</div>
        <div className="road"></div>
      </div>
      <h2 className="loading-text">KisanSlot</h2>
      <p className="loading-subtitle">Bringing dignity to the Annadata...</p>
    </div>
  );
}
