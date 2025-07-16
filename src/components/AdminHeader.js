import React from 'react';
import './AdminHeader.css';

const AdminHeader = ({ user, onLogout }) => {
  return (
    <header className="admin-header">
      <div className="admin-header-container">
        <div className="logo">
          <h1>Study Sphere</h1>
          <span className="role-badge admin">管理者</span>
        </div>
        <div className="user-info">
          <span className="user-name">{user.name}</span>
          <button className="logout-button" onClick={onLogout}>
            ログアウト
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader; 