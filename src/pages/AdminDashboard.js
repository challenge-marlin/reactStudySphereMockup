import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../components/AdminHeader';
import SystemOverview from '../components/SystemOverview';
import LocationManagement from '../components/LocationManagement';
import InstructorManagement from '../components/InstructorManagement';
import CourseManagement from '../components/CourseManagement';
import LessonManagement from '../components/LessonManagement';
import CurriculumPathManagement from '../components/CurriculumPathManagement';
import AdminManagement from '../components/AdminManagement';
import { logAdminAccountOperation } from '../utils/adminLogger';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (!user) {
      navigate('/');
      return;
    }
    
    const userData = JSON.parse(user);
    if (userData.role !== 'admin') {
      navigate('/');
      return;
    }
    
    setCurrentUser(userData);
  }, [navigate]);

  const handleLogout = () => {
    // ログアウト時の操作ログを記録
    if (currentUser) {
      logAdminAccountOperation('logout', currentUser);
    }
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="admin-dashboard">
      <AdminHeader user={currentUser} onLogout={handleLogout} />
      
      <div className="admin-content">
        <aside className="admin-sidebar">
          <nav className="admin-nav">
            <button 
              className={`nav-button ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              📊 システム概要
            </button>
            <button 
              className={`nav-button ${activeTab === 'locations' ? 'active' : ''}`}
              onClick={() => setActiveTab('locations')}
            >
              🏢 拠点・事業所管理
            </button>
            <button 
              className={`nav-button ${activeTab === 'instructors' ? 'active' : ''}`}
              onClick={() => setActiveTab('instructors')}
            >
              👨‍🏫 指導員管理
            </button>
            <button 
              className={`nav-button ${activeTab === 'courses' ? 'active' : ''}`}
              onClick={() => setActiveTab('courses')}
            >
              📚 コース管理
            </button>
            <button 
              className={`nav-button ${activeTab === 'lessons' ? 'active' : ''}`}
              onClick={() => setActiveTab('lessons')}
            >
              📖 レッスン管理
            </button>
            <button 
              className={`nav-button ${activeTab === 'paths' ? 'active' : ''}`}
              onClick={() => setActiveTab('paths')}
            >
              🎯 カリキュラムパス管理
            </button>
            <button 
              className={`nav-button ${activeTab === 'admins' ? 'active' : ''}`}
              onClick={() => setActiveTab('admins')}
            >
              👥 管理者管理
            </button>
          </nav>
        </aside>

        <main className="admin-main">
          {activeTab === 'overview' && <SystemOverview />}
          {activeTab === 'locations' && <LocationManagement />}
          {activeTab === 'instructors' && <InstructorManagement />}
          {activeTab === 'courses' && <CourseManagement />}
          {activeTab === 'lessons' && <LessonManagement />}
          {activeTab === 'paths' && <CurriculumPathManagement />}
          {activeTab === 'admins' && <AdminManagement />}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard; 