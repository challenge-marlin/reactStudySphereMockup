import React from 'react';
import './CourseCard.css';

const CourseCard = ({ course }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case '初級':
        return 'green';
      case '中級':
        return 'orange';
      case '上級':
        return 'red';
      default:
        return 'gray';
    }
  };

  return (
    <div className="course-card">
      <div className="course-card-header">
        <h3>{course.title}</h3>
        <span className={`difficulty-badge ${getDifficultyColor(course.difficulty)}`}>
          {course.difficulty}
        </span>
      </div>
      
      <p className="course-description">{course.description}</p>
      
      <div className="course-meta">
        <div className="course-info">
          <span>👨‍🏫 {course.instructor}</span>
          <span>⏱️ {course.duration}</span>
          <span>📚 {course.lessons} レッスン</span>
        </div>
      </div>

      {course.enrolled ? (
        <div className="enrolled-section">
          <div className="progress-info">
            <span>進捗: {course.progress}%</span>
            <div className="mini-progress-bar">
              <div 
                className="mini-progress-fill" 
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
          </div>
          <button className="continue-course-button">続きを学習</button>
        </div>
      ) : (
        <div className="enroll-section">
          <button className="enroll-button">コースに参加</button>
        </div>
      )}
    </div>
  );
};

export default CourseCard; 