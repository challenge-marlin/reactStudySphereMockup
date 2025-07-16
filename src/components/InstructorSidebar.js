import React from 'react';
import { useNavigate } from 'react-router-dom';
import './InstructorSidebar.css';

const InstructorSidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="instructor-sidebar">
      <div className="sidebar-title">指導員メニュー</div>
      <ul className="sidebar-nav">
        <li onClick={() => navigate('/instructor/dashboard')}>🏠 ダッシュボード</li>
        <li onClick={() => navigate('/instructor/daily-records')}>📝 日々の記録管理</li>
        <li onClick={() => navigate('/instructor/evaluations')}>📊 達成度評価管理</li>
      </ul>
    </div>
  );
};

export default InstructorSidebar; 