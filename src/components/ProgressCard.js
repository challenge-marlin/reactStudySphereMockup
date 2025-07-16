import React from 'react';
import './ProgressCard.css';

const ProgressCard = ({ title, progress, totalLessons, completedLessons }) => {
  return (
    <div className="progress-card">
      <div className="progress-card-header">
        <h4>{title}</h4>
        <span className="progress-percentage">{progress}%</span>
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="progress-details">
        <span>{completedLessons} / {totalLessons} レッスン完了</span>
      </div>
      <button className="continue-button">続きを学習</button>
    </div>
  );
};

export default ProgressCard; 