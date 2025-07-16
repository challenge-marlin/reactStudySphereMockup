import React from 'react';
import './InstructorHeader.css';

const InstructorHeader = ({ user, onLogout }) => {
  return (
    <header className="instructor-header">
      <div className="header-container">
        <div className="logo">
          <h1>Study Sphere</h1>
          <span className="role-badge instructor">指導員</span>
        </div>
        <div className="user-info">
          <span className="user-name">{user?.name}</span>
          <span className="location-info">{user?.locationName}</span>
          <button onClick={onLogout} className="logout-button">
            ログアウト
          </button>
        </div>
      </div>
    </header>
  );
};

export default InstructorHeader; 