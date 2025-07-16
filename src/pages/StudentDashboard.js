import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import LessonList from './LessonList';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (!user) {
      navigate('/');
      return;
    }
    
    const userData = JSON.parse(user);
    if (userData.role !== 'student') {
      navigate('/');
      return;
    }
    
    setCurrentUser(userData);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="student-dashboard">
      <div className="student-header">
        <div className="student-header-container">
          <div className="logo">
            <h1>Study Sphere</h1>
            <span className="role-badge student">生徒</span>
          </div>
          <div className="class-info">
            <span className="instructor-name">担当: {currentUser.instructorName || currentUser.teacherName}</span>
          </div>
          <div className="user-info">
            <span className="user-name">{currentUser.name}さん</span>
            <button className="logout-button" onClick={handleLogout}>
              ログアウト
            </button>
          </div>
        </div>
      </div>

      <nav className="student-nav">
        <div className="nav-container">
          <button 
            className={`nav-button ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            📊 ダッシュボード
          </button>
          <button 
            className={`nav-button ${activeTab === 'lessons' ? 'active' : ''}`}
            onClick={() => setActiveTab('lessons')}
          >
            📚 レッスン一覧
          </button>
          <button 
            className="nav-button learning-button"
            onClick={() => navigate('/student/learning')}
          >
            🎓 学習画面
          </button>
          <button 
            className="nav-button enhanced-learning-button"
            onClick={() => navigate('/student/enhanced-learning')}
          >
            🚀 改善版学習画面
          </button>
          <button 
            className="nav-button advanced-learning-button"
            onClick={() => navigate('/student/advanced-learning')}
          >
            ⭐ 高度な学習画面
          </button>
        </div>
      </nav>

      <main className="student-main">
        {activeTab === 'dashboard' && (
          <div className="student-content">
            <Dashboard />
          </div>
        )}
        {activeTab === 'lessons' && (
          <div className="student-content">
            <LessonList />
          </div>
        )}
      </main>
    </div>
  );
};

export default StudentDashboard; 