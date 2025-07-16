import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <h1>Study Sphere</h1>
          </Link>
        </div>
        <nav className="nav">
          <ul className="nav-list">
            <li>
              <Link 
                to="/" 
                className={location.pathname === '/' ? 'active' : ''}
              >
                ダッシュボード
              </Link>
            </li>
            <li>
              <Link 
                to="/courses" 
                className={location.pathname === '/courses' ? 'active' : ''}
              >
                コース一覧
              </Link>
            </li>
          </ul>
        </nav>
        <div className="user-info">
          <span className="user-name">田中太郎さん</span>
          <div className="user-avatar">
            <span>田</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 