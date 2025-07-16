import React, { useState } from 'react';
import './InstructorManagement.css';

const InstructorManagement = () => {
  const [instructors, setInstructors] = useState([
    { 
      id: 'instructor001', 
      name: '佐藤指導員', 
      email: 'sato@example.com', 
      department: 'IT基礎・AI学科',
      facilityId: 'facility001',
      facilityName: 'スタディスフィア東京校',
      locationId: 'location001',
      locationName: '東京本校',
      studentsCount: 8,
      coursesCount: 3,
      status: 'active',
      lastLogin: '2024-01-15',
      joinDate: '2023-04-01',
      passwordResetRequired: false
    },
    { 
      id: 'instructor002', 
      name: '田中指導員', 
      email: 'tanaka@example.com', 
      department: 'SNS運用・デザイン学科',
      facilityId: 'facility001',
      facilityName: 'スタディスフィア東京校',
      locationId: 'location001',
      locationName: '東京本校',
      studentsCount: 6,
      coursesCount: 2,
      status: 'active',
      lastLogin: '2024-01-14',
      joinDate: '2023-06-15',
      passwordResetRequired: false
    },
    { 
      id: 'instructor003', 
      name: '鈴木指導員', 
      email: 'suzuki@example.com', 
      department: 'LP制作・案件対応学科',
      facilityId: 'facility002',
      facilityName: 'スタディスフィア大阪校',
      locationId: 'location002',
      locationName: '大阪支校',
      studentsCount: 12,
      coursesCount: 4,
      status: 'active',
      lastLogin: '2024-01-13',
      joinDate: '2023-08-01',
      passwordResetRequired: false
    },
    { 
      id: 'instructor004', 
      name: '山田指導員', 
      email: 'yamada@example.com', 
      department: 'オフィスソフト・文書作成学科',
      facilityId: 'facility001',
      facilityName: 'スタディスフィア東京校',
      locationId: 'location003',
      locationName: '新宿サテライト',
      studentsCount: 5,
      coursesCount: 1,
      status: 'active',
      lastLogin: '2024-01-12',
      joinDate: '2023-10-01',
      passwordResetRequired: true
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [showPasswordResetModal, setShowPasswordResetModal] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [showTempPasswordDialog, setShowTempPasswordDialog] = useState(false);
  const [generatedTempPassword, setGeneratedTempPassword] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [facilityFilter, setFacilityFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const [newInstructor, setNewInstructor] = useState({
    name: '',
    email: '',
    department: '',
    facilityId: '',
    locationId: '',
    password: ''
  });

  // モック拠点データ
  const facilities = [
    {
      id: 'facility001',
      name: 'スタディスフィア東京校',
      locations: [
        { id: 'location001', name: '東京本校' },
        { id: 'location003', name: '新宿サテライト' }
      ]
    },
    {
      id: 'facility002',
      name: 'スタディスフィア大阪校',
      locations: [
        { id: 'location002', name: '大阪支校' }
      ]
    }
  ];

  // フィルタリング機能
  const getFilteredInstructors = () => {
    let filtered = instructors;

    // 検索フィルター
    if (searchTerm) {
      filtered = filtered.filter(instructor =>
        instructor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        instructor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        instructor.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 事業所フィルター
    if (facilityFilter !== 'all') {
      filtered = filtered.filter(instructor => instructor.facilityId === facilityFilter);
    }

    // 拠点フィルター
    if (locationFilter !== 'all') {
      filtered = filtered.filter(instructor => instructor.locationId === locationFilter);
    }

    // ステータスフィルター
    if (statusFilter !== 'all') {
      filtered = filtered.filter(instructor => instructor.status === statusFilter);
    }

    return filtered;
  };

  // 拠点選択肢を事業所フィルターに応じて変更
  const getAvailableLocations = () => {
    if (facilityFilter === 'all') {
      return facilities.flatMap(facility => 
        facility.locations.map(location => ({
          ...location,
          facilityName: facility.name
        }))
      );
    }
    
    const selectedFacility = facilities.find(f => f.id === facilityFilter);
    return selectedFacility ? selectedFacility.locations : [];
  };

  // パスワードリセット機能
  const handlePasswordReset = (instructor) => {
    setSelectedInstructor(instructor);
    setShowPasswordResetModal(true);
  };

  const executePasswordReset = (resetType) => {
    if (!selectedInstructor) return;
    
    if (resetType === 'temporary') {
      const tempPassword = generateTempPassword();
      setGeneratedTempPassword(tempPassword);
      setShowTempPasswordDialog(true);
      
      // パスワードリセット必須フラグを設定
      setInstructors(instructors.map(inst => 
        inst.id === selectedInstructor.id 
          ? { ...inst, passwordResetRequired: true }
          : inst
      ));
      
      // 一時パスワードダイアログの場合は、selectedInstructorを保持
      setShowPasswordResetModal(false);
      // setSelectedInstructor(null); // 一時パスワードダイアログで使用するため、ここではnullにしない
    } else if (resetType === 'force_change') {
      alert(`パスワード変更を要求しました：\n\n指導員: ${selectedInstructor.name}\n\n次回ログイン時に新しいパスワードの設定が必要になります。`);
      
      // パスワードリセット必須フラグを設定
      setInstructors(instructors.map(inst => 
        inst.id === selectedInstructor.id 
          ? { ...inst, passwordResetRequired: true }
          : inst
      ));
      
      setShowPasswordResetModal(false);
      setSelectedInstructor(null);
    }
  };

  const generateTempPassword = () => {
    const chars = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleAddInstructor = (e) => {
    e.preventDefault();
    const instructorId = `teacher${String(instructors.length + 1).padStart(3, '0')}`;
    
    const selectedFacility = facilities.find(f => f.id === newInstructor.facilityId);
    const selectedLocation = selectedFacility?.locations.find(l => l.id === newInstructor.locationId);
    
    const instructor = {
      id: instructorId,
      ...newInstructor,
      facilityName: selectedFacility?.name || '',
      locationName: selectedLocation?.name || '',
      studentsCount: 0,
      coursesCount: 0,
      status: 'active',
      lastLogin: new Date().toISOString().split('T')[0]
    };
    
    setInstructors([...instructors, instructor]);
    setNewInstructor({ name: '', email: '', department: '', facilityId: '', locationId: '', password: '' });
    setShowAddForm(false);
    
          alert(`指導員が追加されました！\nログイン情報:\nID: ${instructorId}\nパスワード: ${newInstructor.password}\n所属: ${selectedFacility?.name} - ${selectedLocation?.name}`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInstructor(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleInstructorStatus = (instructorId) => {
    setInstructors(instructors.map(instructor => 
      instructor.id === instructorId 
        ? { ...instructor, status: instructor.status === 'active' ? 'inactive' : 'active' }
        : instructor
    ));
  };

  return (
    <div className="instructor-management">
      <div className="management-header">
        <h2>指導員管理</h2>
        <button 
          className="add-instructor-button"
          onClick={() => setShowAddForm(true)}
        >
          + 新しい指導員を追加
        </button>
      </div>

      {/* フィルターセクション */}
      <div className="filters-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="指導員名、メール、学科で検索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filters-row">
          <div className="filter-group">
            <label>事業所:</label>
            <select 
              value={facilityFilter} 
              onChange={(e) => {
                setFacilityFilter(e.target.value);
                setLocationFilter('all'); // 事業所変更時は拠点フィルターをリセット
              }}
            >
              <option value="all">全ての事業所</option>
              {facilities.map(facility => (
                <option key={facility.id} value={facility.id}>
                  {facility.name}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>拠点:</label>
            <select 
              value={locationFilter} 
              onChange={(e) => setLocationFilter(e.target.value)}
              disabled={facilityFilter === 'all'}
            >
              <option value="all">全ての拠点</option>
              {getAvailableLocations().map(location => (
                <option key={location.id} value={location.id}>
                  {location.name}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>ステータス:</label>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">全て</option>
              <option value="active">アクティブ</option>
              <option value="inactive">非アクティブ</option>
            </select>
          </div>

          <button 
            className="clear-filters"
            onClick={() => {
              setSearchTerm('');
              setFacilityFilter('all');
              setLocationFilter('all');
              setStatusFilter('all');
            }}
          >
            フィルタークリア
          </button>
        </div>

        <div className="results-summary">
          表示中: {getFilteredInstructors().length}名 / 全{instructors.length}名
        </div>
      </div>

      {/* 指導員一覧テーブル */}
      <div className="instructors-table-container">
        <table className="instructors-table">
          <thead>
            <tr>
              <th>指導員名</th>
              <th>メールアドレス</th>
              <th>学科</th>
              <th>事業所・拠点</th>
              <th>生徒数</th>
              <th>ステータス</th>
              <th>最終ログイン</th>
              <th>パスワード</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {getFilteredInstructors().map(instructor => (
              <tr key={instructor.id} className={`instructor-row ${instructor.status}`}>
                <td className="instructor-name">
                  <div className="name-info">
                    <strong>{instructor.name}</strong>
                    <small>ID: {instructor.id}</small>
                  </div>
                </td>
                <td className="instructor-email">{instructor.email}</td>
                <td className="instructor-department">{instructor.department}</td>
                <td className="instructor-location">
                  <div className="location-info">
                    <div className="facility-name">{instructor.facilityName}</div>
                    <div className="location-name">{instructor.locationName}</div>
                  </div>
                </td>
                <td className="instructor-students">
                  <span className="student-count">{instructor.studentsCount}名</span>
                </td>
                <td className="instructor-status">
                  <span className={`status-badge ${instructor.status}`}>
                    {instructor.status === 'active' ? 'アクティブ' : '非アクティブ'}
                  </span>
                  {instructor.passwordResetRequired && (
                    <span className="password-reset-required">パスワード変更要求中</span>
                  )}
                </td>
                <td className="instructor-last-login">{instructor.lastLogin}</td>
                <td className="password-actions">
                  <button 
                    className="password-reset-btn"
                    onClick={() => handlePasswordReset(instructor)}
                  >
                    🔑 パスワード管理
                  </button>
                </td>
                <td className="instructor-actions">
                  <button 
                    className={`status-toggle ${instructor.status}`}
                    onClick={() => toggleInstructorStatus(instructor.id)}
                  >
                    {instructor.status === 'active' ? '無効化' : '有効化'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {getFilteredInstructors().length === 0 && (
          <div className="no-results">
            <p>条件に合致する指導員が見つかりません。</p>
          </div>
        )}
      </div>

      {/* パスワードリセットモーダル */}
      {showPasswordResetModal && selectedInstructor && (
        <div className="modal-overlay">
          <div className="password-reset-modal">
            <div className="modal-header">
              <h3>パスワード管理 - {selectedInstructor.name}</h3>
              <button 
                className="close-button"
                onClick={() => setShowPasswordResetModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className="password-options">
              <div className="option-card">
                <h4>一時パスワード発行</h4>
                <p>新しい一時パスワードを発行します。指導員は次回ログイン時に新しいパスワードを設定する必要があります。</p>
                <button 
                  className="temp-password-btn"
                  onClick={() => executePasswordReset('temporary')}
                >
                  一時パスワードを発行
                </button>
              </div>

              <div className="option-card">
                <h4>パスワード変更要求</h4>
                <p>指導員に次回ログイン時のパスワード変更を要求します。現在のパスワードは無効になりません。</p>
                <button 
                  className="force-change-btn"
                  onClick={() => executePasswordReset('force_change')}
                >
                  パスワード変更を要求
                </button>
              </div>
            </div>

            <div className="current-status">
              <h4>現在の状況</h4>
              <p><strong>ステータス:</strong> {selectedInstructor.status === 'active' ? 'アクティブ' : '非アクティブ'}</p>
              <p><strong>最終ログイン:</strong> {selectedInstructor.lastLogin}</p>
              <p><strong>パスワード変更要求:</strong> {selectedInstructor.passwordResetRequired ? 'あり' : 'なし'}</p>
            </div>
          </div>
        </div>
      )}

      {showAddForm && (
        <div className="modal-overlay">
          <div className="add-teacher-modal">
            <div className="modal-header">
              <h3>新しい指導員を追加</h3>
              <button 
                className="close-button"
                onClick={() => setShowAddForm(false)}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleAddInstructor} className="add-teacher-form">
              <div className="form-group">
                <label htmlFor="name">名前</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newInstructor.name}
                  onChange={handleInputChange}
                  required
                  placeholder="指導員の名前を入力"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">メールアドレス</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={newInstructor.email}
                  onChange={handleInputChange}
                  required
                  placeholder="メールアドレスを入力"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="department">学科</label>
                <select
                  id="department"
                  name="department"
                  value={newInstructor.department}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">学科を選択</option>
                  <option value="IT基礎・AI学科">IT基礎・AI学科</option>
                  <option value="SNS運用・デザイン学科">SNS運用・デザイン学科</option>
                  <option value="LP制作・案件対応学科">LP制作・案件対応学科</option>
                  <option value="オフィスソフト・文書作成学科">オフィスソフト・文書作成学科</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="facilityId">事業所</label>
                <select
                  id="facilityId"
                  name="facilityId"
                  value={newInstructor.facilityId}
                  onChange={(e) => {
                    setNewInstructor(prev => ({
                      ...prev,
                      facilityId: e.target.value,
                      locationId: '' // 事業所変更時は拠点をリセット
                    }));
                  }}
                  required
                >
                  <option value="">事業所を選択</option>
                  {facilities.map(facility => (
                    <option key={facility.id} value={facility.id}>
                      {facility.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="locationId">拠点</label>
                <select
                  id="locationId"
                  name="locationId"
                  value={newInstructor.locationId}
                  onChange={handleInputChange}
                  required
                  disabled={!newInstructor.facilityId}
                >
                  <option value="">拠点を選択</option>
                  {getAvailableLocations().map(location => (
                    <option key={location.id} value={location.id}>
                      {location.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="password">初期パスワード</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={newInstructor.password}
                  onChange={handleInputChange}
                  required
                  placeholder="初期パスワードを設定"
                />
              </div>
              
              <div className="form-actions">
                <button type="button" onClick={() => setShowAddForm(false)}>
                  キャンセル
                </button>
                <button type="submit" className="submit-button">
                  追加
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

             {showTempPasswordDialog && generatedTempPassword && selectedInstructor && (
         <div className="modal-overlay">
           <div className="temp-password-dialog">
             <div className="modal-header">
               <h3>一時パスワードをコピー</h3>
               <button 
                 className="close-button"
                 onClick={() => {
                   setShowTempPasswordDialog(false);
                   setGeneratedTempPassword('');
                   setSelectedInstructor(null);
                 }}
               >
                 ×
               </button>
             </div>
             <div className="temp-password-content">
               <p>指導員: <strong>{selectedInstructor.name}</strong></p>
               <div className="password-display">
                 <label>一時パスワード:</label>
                 <div className="password-box">
                   <input 
                     type="text" 
                     value={generatedTempPassword} 
                     readOnly 
                     className="password-input"
                     onClick={(e) => e.target.select()}
                   />
                   <button 
                     className="copy-icon-btn"
                     onClick={() => {
                       navigator.clipboard.writeText(generatedTempPassword).then(() => {
                         alert('一時パスワードをクリップボードにコピーしました！');
                       }).catch(err => {
                         console.error('クリップボードへのコピーに失敗しました:', err);
                         alert('クリップボードへのコピーに失敗しました。');
                       });
                     }}
                     title="クリップボードにコピー"
                   >
                     📋
                   </button>
                 </div>
               </div>
               <p className="password-notice">このパスワードで初回ログイン後、新しいパスワードの設定が必要です。</p>
               <div className="dialog-actions">
                 <button 
                   className="copy-button"
                   onClick={() => {
                     navigator.clipboard.writeText(generatedTempPassword).then(() => {
                       alert('一時パスワードをクリップボードにコピーしました！');
                     }).catch(err => {
                       console.error('クリップボードへのコピーに失敗しました:', err);
                       alert('クリップボードへのコピーに失敗しました。');
                     });
                     setShowTempPasswordDialog(false);
                     setGeneratedTempPassword('');
                     setSelectedInstructor(null);
                   }}
                 >
                   コピーして閉じる
                 </button>
                 <button 
                   className="close-only-button"
                   onClick={() => {
                     setShowTempPasswordDialog(false);
                     setGeneratedTempPassword('');
                     setSelectedInstructor(null);
                   }}
                 >
                   閉じる
                 </button>
               </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstructorManagement; 