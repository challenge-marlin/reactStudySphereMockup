import React, { useState, useEffect } from 'react';
import { logAdminAccountOperation } from '../utils/adminLogger';
import './AdminManagement.css';

const AdminManagement = () => {
  const [admins, setAdmins] = useState([]);
  const [operationLogs, setOperationLogs] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
    startDate: '',
    endDate: '',
    status: 'active'
  });

  // 初期データの読み込み
  useEffect(() => {
    const savedAdmins = localStorage.getItem('adminUsers');
    const savedLogs = localStorage.getItem('adminOperationLogs');
    
    if (savedAdmins) {
      setAdmins(JSON.parse(savedAdmins));
    } else {
      // デフォルトの管理者データ
      const defaultAdmins = [
        {
          id: 'admin001',
          name: '山田管理者',
          email: 'yamada@studysphere.com',
          password: 'admin123',
          startDate: '2024-01-01',
          endDate: '2025-12-31',
          status: 'active',
          createdAt: '2024-01-01T00:00:00Z'
        }
      ];
      setAdmins(defaultAdmins);
      localStorage.setItem('adminUsers', JSON.stringify(defaultAdmins));
    }

    if (savedLogs) {
      setOperationLogs(JSON.parse(savedLogs));
    } else {
      // デフォルトの操作ログ
      const defaultLogs = [
        {
          id: 1,
          adminId: 'admin001',
          adminName: '山田管理者',
          action: 'システムログイン',
          details: '管理者ダッシュボードにアクセス',
          timestamp: new Date().toISOString(),
          ipAddress: '192.168.1.100'
        }
      ];
      setOperationLogs(defaultLogs);
      localStorage.setItem('adminOperationLogs', JSON.stringify(defaultLogs));
    }
  }, []);

  // 操作ログを記録する関数
  const logOperation = (action, details) => {
    logAdminAccountOperation(action, { id: 'system', name: 'システム' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingAdmin) {
      // 編集モード
      const updatedAdmins = admins.map(admin => 
        admin.id === editingAdmin.id 
          ? { ...admin, ...formData, updatedAt: new Date().toISOString() }
          : admin
      );
      setAdmins(updatedAdmins);
      localStorage.setItem('adminUsers', JSON.stringify(updatedAdmins));
      logAdminAccountOperation('update', formData);
    } else {
      // 新規追加モード
      const newAdmin = {
        ...formData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      const updatedAdmins = [...admins, newAdmin];
      setAdmins(updatedAdmins);
      localStorage.setItem('adminUsers', JSON.stringify(updatedAdmins));
      logAdminAccountOperation('create', formData);
    }

    // フォームをリセット
    setFormData({
      id: '',
      name: '',
      email: '',
      password: '',
      startDate: '',
      endDate: '',
      status: 'active'
    });
    setShowAddForm(false);
    setEditingAdmin(null);
  };

  const handleEdit = (admin) => {
    setEditingAdmin(admin);
    setFormData({
      id: admin.id,
      name: admin.name,
      email: admin.email,
      password: admin.password,
      startDate: admin.startDate,
      endDate: admin.endDate,
      status: admin.status
    });
    setShowAddForm(true);
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingAdmin(null);
    setFormData({
      id: '',
      name: '',
      email: '',
      password: '',
      startDate: '',
      endDate: '',
      status: 'active'
    });
  };

  const getStatusBadge = (status, endDate) => {
    if (status === 'inactive') return <span className="status-badge inactive">無効</span>;
    if (new Date(endDate) < new Date()) return <span className="status-badge expired">期限切れ</span>;
    return <span className="status-badge active">有効</span>;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ja-JP');
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('ja-JP');
  };

  return (
    <div className="admin-management">
      <div className="admin-management-header">
        <h2>管理者管理</h2>
        <button 
          className="add-admin-button"
          onClick={() => setShowAddForm(true)}
        >
          ＋ 管理者追加
        </button>
      </div>

      {/* 管理者追加・編集フォーム */}
      {showAddForm && (
        <div className="admin-form-overlay">
          <div className="admin-form-container">
            <h3>{editingAdmin ? '管理者情報編集' : '管理者追加'}</h3>
            <form onSubmit={handleSubmit} className="admin-form">
              <div className="form-row">
                <div className="form-group">
                  <label>管理者ID *</label>
                  <input
                    type="text"
                    name="id"
                    value={formData.id}
                    onChange={handleInputChange}
                    required
                    placeholder="admin001"
                  />
                </div>
                <div className="form-group">
                  <label>氏名 *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="山田管理者"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>メールアドレス *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="yamada@studysphere.com"
                  />
                </div>
                <div className="form-group">
                  <label>パスワード *</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    placeholder="パスワード"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>利用開始日 *</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>利用終了日 *</label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>ステータス</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="active">有効</option>
                  <option value="inactive">無効</option>
                </select>
              </div>

              <div className="form-actions">
                <button type="button" onClick={handleCancel} className="cancel-button">
                  キャンセル
                </button>
                <button type="submit" className="submit-button">
                  {editingAdmin ? '更新' : '追加'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 管理者一覧 */}
      <div className="admin-list-section">
        <h3>管理者一覧</h3>
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>管理者ID</th>
                <th>氏名</th>
                <th>メールアドレス</th>
                <th>利用期間</th>
                <th>ステータス</th>
                <th>作成日</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {admins.map(admin => (
                <tr key={admin.id}>
                  <td>{admin.id}</td>
                  <td>{admin.name}</td>
                  <td>{admin.email}</td>
                  <td>
                    {formatDate(admin.startDate)} ～ {formatDate(admin.endDate)}
                  </td>
                  <td>{getStatusBadge(admin.status, admin.endDate)}</td>
                  <td>{formatDate(admin.createdAt)}</td>
                  <td>
                    <button 
                      className="edit-button"
                      onClick={() => handleEdit(admin)}
                    >
                      編集
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 操作ログ */}
      <div className="operation-logs-section">
        <h3>操作ログ</h3>
        <div className="logs-table-container">
          <table className="logs-table">
            <thead>
              <tr>
                <th>日時</th>
                <th>管理者</th>
                <th>操作</th>
                <th>詳細</th>
                <th>IPアドレス</th>
              </tr>
            </thead>
            <tbody>
              {operationLogs.slice(0, 50).map(log => (
                <tr key={log.id}>
                  <td>{formatDateTime(log.timestamp)}</td>
                  <td>{log.adminName}</td>
                  <td>{log.action}</td>
                  <td>{log.details}</td>
                  <td>{log.ipAddress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminManagement; 