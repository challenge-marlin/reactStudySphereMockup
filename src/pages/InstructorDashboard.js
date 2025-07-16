import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InstructorHeader from '../components/InstructorHeader';
import ClassOverview from '../components/ClassOverview';
import StudentManagement from '../components/StudentManagement';
import LocationManagementForInstructor from '../components/LocationManagementForInstructor';
import HomeSupportEvaluationsPage from './HomeSupportEvaluationsPage';
import './InstructorDashboard.css';

const InstructorDashboard = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [showPasswordChangeForm, setShowPasswordChangeForm] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordErrors, setPasswordErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (!user) {
      navigate('/');
      return;
    }
    
    const userData = JSON.parse(user);
    if (userData.role !== 'instructor' && userData.role !== 'teacher') {
      navigate('/');
      return;
    }
    
    setCurrentUser(userData);
    
    // パスワード変更要求があるかチェック
    if (userData.passwordResetRequired) {
      setActiveTab('settings');
      setShowPasswordChangeForm(true);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) errors.push('8文字以上で入力してください');
    if (!/[A-Z]/.test(password)) errors.push('大文字を含めてください');
    if (!/[a-z]/.test(password)) errors.push('小文字を含めてください');
    if (!/[0-9]/.test(password)) errors.push('数字を含めてください');
    return errors;
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setPasswordErrors({});

    // バリデーション
    const errors = {};
    
    if (!passwordForm.currentPassword) {
      errors.currentPassword = '現在のパスワードを入力してください';
    }
    
    if (!passwordForm.newPassword) {
      errors.newPassword = '新しいパスワードを入力してください';
    } else {
      const passwordValidation = validatePassword(passwordForm.newPassword);
      if (passwordValidation.length > 0) {
        errors.newPassword = passwordValidation.join(', ');
      }
    }
    
    if (!passwordForm.confirmPassword) {
      errors.confirmPassword = 'パスワードの確認を入力してください';
    } else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      errors.confirmPassword = 'パスワードが一致しません';
    }

    if (Object.keys(errors).length > 0) {
      setPasswordErrors(errors);
      return;
    }

    // モック認証 - 実際の実装では API を呼び出します
    if (passwordForm.currentPassword !== 'instructor123' && passwordForm.currentPassword !== 'teacher123') {
      setPasswordErrors({ currentPassword: '現在のパスワードが間違っています' });
      return;
    }

    // パスワード変更成功
    alert('パスワードが正常に変更されました。\n次回ログイン時から新しいパスワードをご利用ください。');
    
    // パスワード変更要求フラグをクリア
    const updatedUser = { ...currentUser, passwordResetRequired: false };
    setCurrentUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    // フォームをリセット
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setShowPasswordChangeForm(false);
  };

  const handlePasswordFormChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }));
    
    // エラーをクリア
    if (passwordErrors[name]) {
      setPasswordErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="instructor-dashboard">
      <InstructorHeader user={currentUser} onLogout={handleLogout} />
      
      <div className="instructor-content">
        <aside className="instructor-sidebar">
          <nav className="instructor-nav">
            <button 
              className={`nav-button ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              📊 クラス概要
            </button>
            <button 
              className={`nav-button ${activeTab === 'students' ? 'active' : ''}`}
              onClick={() => setActiveTab('students')}
            >
              👥 生徒管理
            </button>
            <button 
              className={`nav-button ${activeTab === 'location' ? 'active' : ''}`}
              onClick={() => setActiveTab('location')}
            >
              🏢 拠点管理
            </button>
            <button 
              className={`nav-button ${activeTab === 'home-support' ? 'active' : ''}`}
              onClick={() => setActiveTab('home-support')}
            >
              🏠 在宅支援
            </button>
            <button 
              className={`nav-button ${activeTab === 'learning-preview' ? 'active' : ''}`}
              onClick={() => setActiveTab('learning-preview')}
            >
              🎓 学習画面プレビュー
            </button>
            <button 
              className={`nav-button ${activeTab === 'settings' ? 'active' : ''} ${currentUser.passwordResetRequired ? 'alert' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              ⚙️ 設定
              {currentUser.passwordResetRequired && <span className="alert-badge">!</span>}
            </button>
          </nav>
        </aside>

        <main className="instructor-main">
          {activeTab === 'overview' && <ClassOverview instructorId={currentUser.id} />}
          {activeTab === 'students' && <StudentManagement instructorId={currentUser.id} />}
          {activeTab === 'location' && <LocationManagementForInstructor currentUser={currentUser} />}
          {activeTab === 'home-support' && <HomeSupportEvaluationsPage />}
          {activeTab === 'learning-preview' && (
            <div className="tab-content">
              <h2>🎓 学習画面プレビュー</h2>
              <p>生徒が実際に見る学習画面のプレビューです。</p>
              <div className="preview-info">
                <p>📝 <strong>実装予定:</strong></p>
                <ul>
                  <li>生徒ダッシュボードのプレビュー</li>
                  <li>コース一覧・学習画面の確認</li>
                  <li>進捗管理・課題提出画面の確認</li>
                  <li>生徒の視点での操作確認</li>
                </ul>
                <p>生徒画面のモックアップが完成次第、ここに統合予定です。</p>
              </div>
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div className="settings-tab">
              <div className="settings-header">
                <h2>個人設定</h2>
                <p>アカウント情報とセキュリティ設定を管理できます。</p>
              </div>

              <div className="settings-sections">
                {/* アカウント情報 */}
                <div className="settings-section">
                  <h3>🏷️ アカウント情報</h3>
                  <div className="account-info">
                    <div className="info-row">
                      <label>指導員ID:</label>
                      <span>{currentUser.id}</span>
                    </div>
                    <div className="info-row">
                      <label>名前:</label>
                      <span>{currentUser.name}</span>
                    </div>
                    <div className="info-row">
                      <label>メールアドレス:</label>
                      <span>{currentUser.email}</span>
                    </div>
                    <div className="info-row">
                      <label>最終ログイン:</label>
                      <span>{new Date().toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {/* パスワード変更セクション */}
                <div className="settings-section">
                  <div className="section-header">
                    <h3>🔐 パスワード変更</h3>
                    {currentUser.passwordResetRequired && (
                      <div className="password-alert">
                        <span className="alert-icon">⚠️</span>
                        パスワードの変更が必要です
                      </div>
                    )}
                  </div>
                  
                  {!showPasswordChangeForm ? (
                    <div className="password-change-intro">
                      <p>セキュリティ向上のため、定期的なパスワード変更をお勧めします。</p>
                      <button 
                        className="change-password-btn"
                        onClick={() => setShowPasswordChangeForm(true)}
                      >
                        パスワードを変更する
                      </button>
                    </div>
                  ) : (
                    <form className="password-change-form" onSubmit={handlePasswordChange}>
                      <div className="form-group">
                        <label htmlFor="currentPassword">現在のパスワード <span className="required">*</span></label>
                        <input
                          type="password"
                          id="currentPassword"
                          name="currentPassword"
                          value={passwordForm.currentPassword}
                          onChange={handlePasswordFormChange}
                          className={passwordErrors.currentPassword ? 'error' : ''}
                        />
                        {passwordErrors.currentPassword && (
                          <span className="error-message">{passwordErrors.currentPassword}</span>
                        )}
                      </div>

                      <div className="form-group">
                        <label htmlFor="newPassword">新しいパスワード <span className="required">*</span></label>
                        <input
                          type="password"
                          id="newPassword"
                          name="newPassword"
                          value={passwordForm.newPassword}
                          onChange={handlePasswordFormChange}
                          className={passwordErrors.newPassword ? 'error' : ''}
                        />
                        {passwordErrors.newPassword && (
                          <span className="error-message">{passwordErrors.newPassword}</span>
                        )}
                        <div className="password-requirements">
                          <small>
                            パスワード要件: 8文字以上、大文字・小文字・数字を含む
                          </small>
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="confirmPassword">新しいパスワード（確認） <span className="required">*</span></label>
                        <input
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          value={passwordForm.confirmPassword}
                          onChange={handlePasswordFormChange}
                          className={passwordErrors.confirmPassword ? 'error' : ''}
                        />
                        {passwordErrors.confirmPassword && (
                          <span className="error-message">{passwordErrors.confirmPassword}</span>
                        )}
                      </div>

                      <div className="form-actions">
                        <button type="submit" className="submit-password-btn">
                          パスワードを変更
                        </button>
                        <button 
                          type="button" 
                          className="cancel-password-btn"
                          onClick={() => {
                            setShowPasswordChangeForm(false);
                            setPasswordForm({
                              currentPassword: '',
                              newPassword: '',
                              confirmPassword: ''
                            });
                            setPasswordErrors({});
                          }}
                        >
                          キャンセル
                        </button>
                      </div>
                    </form>
                  )}
                </div>

                {/* セキュリティ情報 */}
                <div className="settings-section">
                  <h3>🛡️ セキュリティ情報</h3>
                  <div className="security-tips">
                    <h4>パスワードセキュリティのヒント:</h4>
                    <ul>
                      <li>定期的にパスワードを変更してください</li>
                      <li>他のサービスと同じパスワードを使用しないでください</li>
                      <li>パスワードを他人と共有しないでください</li>
                      <li>セッション終了時は必ずログアウトしてください</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default InstructorDashboard; 