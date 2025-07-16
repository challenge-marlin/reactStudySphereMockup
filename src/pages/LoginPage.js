import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logAdminAccountOperation } from '../utils/adminLogger';
import './LoginPage.css';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ id: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // モックユーザーデータ
  const users = {
    admin: { 
      id: 'admin001', 
      password: 'admin123', 
      role: 'admin', 
      name: '山田管理者' 
    },
        instructor1: {
      id: 'instructor001',
      password: 'instructor123',
      role: 'instructor', 
      name: '佐藤指導員',
      locationId: 'location001',
      locationName: '東京本校',
      facilityId: 'facility001',
      facilityName: 'スタディスフィア東京校'
    },
        instructor2: {
      id: 'instructor002',
      password: 'instructor456',
      role: 'instructor', 
      name: '田中指導員',
      locationId: 'location001',
      locationName: '東京本校',
      facilityId: 'facility001',
      facilityName: 'スタディスフィア東京校'
    },
        instructor3: {
      id: 'instructor003',
      password: 'instructor789',
      role: 'instructor', 
      name: '鈴木指導員',
      locationId: 'location002',
      locationName: '大阪支校',
      facilityId: 'facility001',
      facilityName: 'スタディスフィア大阪校'
    },
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // エラーをクリア
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // 管理者アカウントの確認
    const savedAdmins = localStorage.getItem('adminUsers');
    let adminUsers = [];
    if (savedAdmins) {
      adminUsers = JSON.parse(savedAdmins);
    }

    // 管理者アカウントの認証
    const adminUser = adminUsers.find(
      admin => admin.id === credentials.id && 
               admin.password === credentials.password &&
               admin.status === 'active' &&
               new Date(admin.endDate) >= new Date()
    );

    // 通常のユーザー認証
    const user = Object.values(users).find(
      u => u.id === credentials.id && u.password === credentials.password
    );

    setTimeout(() => {
      if (adminUser) {
        // 管理者アカウントでログイン
        const adminData = {
          id: adminUser.id,
          name: adminUser.name,
          email: adminUser.email,
          role: 'admin'
        };
        localStorage.setItem('currentUser', JSON.stringify(adminData));
        
        // 操作ログを記録
        logAdminAccountOperation('login', adminUser);
        
        navigate('/admin/dashboard');
      } else if (user) {
        // 通常のユーザーでログイン
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // ロールに応じてリダイレクト
        if (user.role === 'admin') {
          navigate('/admin/dashboard');
        } else if (user.role === 'instructor') {
          navigate('/instructor/dashboard');
        }
      } else {
        setError('ユーザーIDまたはパスワードが正しくありません。');
      }
      setIsLoading(false);
    }, 1000); // ローディング体験のため
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>Study Sphere</h1>
          <h2>ログイン</h2>
          <p>管理者・指導員用ログインページ</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="id">ユーザーID</label>
            <input
              type="text"
              id="id"
              name="id"
              value={credentials.id}
              onChange={handleInputChange}
              required
              placeholder="ユーザーIDを入力"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">パスワード</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              required
              placeholder="パスワードを入力"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? 'ログイン中...' : 'ログイン'}
          </button>
        </form>

        <div className="demo-info">
          <h3>デモ用アカウント</h3>
          <div className="demo-accounts">
            <div className="demo-account">
              <h4>管理者</h4>
              <p>ID: admin001</p>
              <p>パスワード: admin123</p>
            </div>
            <div className="demo-account">
              <h4>指導員</h4>
                              <p>ID: instructor001</p>
                <p>パスワード: instructor123</p>
            </div>
          </div>
        </div>

        <div className="student-info">
          <h3>生徒用ログイン</h3>
          <p>生徒は指導員から送られたログインURLでアクセスします</p>
          <div className="student-urls">
            <p><strong>サンプルURL:</strong></p>
            {['token123', 'token456'].map(token => {
              const url = `${window.location.origin}${process.env.PUBLIC_URL}/#/student/login/${token}`;
              return (
                <a key={token} href={`#/student/login/${token}`} className="student-url">
                  {url}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 