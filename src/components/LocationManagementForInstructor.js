import React, { useState } from 'react';
import './LocationManagementForInstructor.css';

const LocationManagementForInstructor = ({ currentUser }) => {
  const [locationInfo, setLocationInfo] = useState({
    id: currentUser.locationId,
    name: currentUser.locationName,
    facilityName: currentUser.facilityName,
    maxStudents: 30,
    currentStudents: 8,
    address: '東京都渋谷区○○1-2-3',
    phone: '03-1234-5678',
    manager: currentUser.name
  });

  const [instructors, setInstructors] = useState([
    {
      id: 'teacher001',
              name: '佐藤指導員',
      email: 'sato@example.com',
      department: 'プログラミング学科',
      studentsCount: 4,
      status: 'active',
      joinDate: '2023-04-01'
    },
    {
      id: 'teacher002',
              name: '田中指導員',
      email: 'tanaka@example.com',
      department: 'Web開発学科',
      studentsCount: 4,
      status: 'active',
      joinDate: '2023-06-15'
    }
  ]);

  const [showAddTeacherForm, setShowAddTeacherForm] = useState(false);
  const [showEditLocationForm, setShowEditLocationForm] = useState(false);
  const [newTeacher, setNewTeacher] = useState({
    name: '',
    email: '',
    department: '',
    password: ''
  });

  const [editLocation, setEditLocation] = useState({
    name: locationInfo.name,
    maxStudents: locationInfo.maxStudents,
    address: locationInfo.address,
    phone: locationInfo.phone
  });

  // 学習可能状況の判定
  const isOverCapacity = locationInfo.currentStudents > locationInfo.maxStudents;
  const capacityPercentage = (locationInfo.currentStudents / locationInfo.maxStudents) * 100;

  const handleAddTeacher = (e) => {
    e.preventDefault();
    const teacherId = `teacher${String(instructors.length + 1).padStart(3, '0')}`;
    const teacher = {
      id: teacherId,
      ...newTeacher,
      studentsCount: 0,
      status: 'active',
      joinDate: new Date().toISOString().split('T')[0]
    };
    
    setInstructors([...instructors, teacher]);
    setNewTeacher({ name: '', email: '', department: '', password: '' });
    setShowAddTeacherForm(false);
    
          alert(`指導員が追加されました！\nログイン情報:\nID: ${teacherId}\nパスワード: ${newTeacher.password}`);
  };

  const handleLocationUpdate = (e) => {
    e.preventDefault();
    setLocationInfo({
      ...locationInfo,
      ...editLocation,
      maxStudents: parseInt(editLocation.maxStudents)
    });
    setShowEditLocationForm(false);
    alert('拠点情報が更新されました。');
  };

  const toggleTeacherStatus = (teacherId) => {
    setInstructors(instructors.map(teacher => 
      teacher.id === teacherId 
        ? { ...teacher, status: teacher.status === 'active' ? 'inactive' : 'active' }
        : teacher
    ));
  };

  const contactManagement = () => {
    alert(`運営に連絡しました。\n\n内容:\n拠点: ${locationInfo.name}\n現在の生徒数: ${locationInfo.currentStudents}名\n最大受入数: ${locationInfo.maxStudents}名\n\n至急、生徒数の調整をお願いします。`);
  };

  return (
    <div className="location-management-teacher">
      <div className="location-header">
        <h2>拠点管理 - {locationInfo.name}</h2>
        <p className="facility-info">{locationInfo.facilityName}</p>
      </div>

      {/* 容量警告 */}
      {isOverCapacity && (
        <div className="capacity-alert danger">
          <h3>⚠️ 生徒数超過警告</h3>
          <p>現在の生徒数（{locationInfo.currentStudents}名）が最大受入数（{locationInfo.maxStudents}名）を超過しています。</p>
          <p>学習システムが正常に動作しない可能性があります。</p>
          <button className="contact-management-btn" onClick={contactManagement}>
            🚨 運営に連絡
          </button>
        </div>
      )}

      {/* 容量近接警告 */}
      {!isOverCapacity && capacityPercentage >= 80 && (
        <div className="capacity-alert warning">
          <h3>⚠️ 容量警告</h3>
          <p>生徒数が最大受入数の{Math.round(capacityPercentage)}%に達しています。</p>
          <p>新規生徒の受入れを調整してください。</p>
        </div>
      )}

      <div className="location-stats">
        <div className="stat-card">
          <h3>現在の生徒数</h3>
          <p className={`stat-number ${isOverCapacity ? 'danger' : ''}`}>
            {locationInfo.currentStudents}名
          </p>
          <small>最大 {locationInfo.maxStudents}名</small>
        </div>
        <div className="stat-card">
                      <h3>指導員数</h3>
          <p className="stat-number">{instructors.filter(t => t.status === 'active').length}名</p>
          <small>アクティブ</small>
        </div>
        <div className="stat-card">
          <h3>容量使用率</h3>
          <p className={`stat-number ${capacityPercentage >= 100 ? 'danger' : capacityPercentage >= 80 ? 'warning' : ''}`}>
            {Math.round(capacityPercentage)}%
          </p>
          <div className="capacity-bar">
            <div 
              className={`capacity-fill ${capacityPercentage >= 100 ? 'danger' : capacityPercentage >= 80 ? 'warning' : ''}`}
              style={{ width: `${Math.min(capacityPercentage, 100)}%` }}
            />
          </div>
        </div>
        <div className="stat-card">
          <h3>拠点責任者</h3>
          <p className="stat-text">{locationInfo.manager}</p>
        </div>
      </div>

      <div className="management-sections">
        <div className="section">
          <div className="section-header">
            <h3>拠点情報</h3>
            <button 
              className="edit-btn"
              onClick={() => {
                setEditLocation({
                  name: locationInfo.name,
                  maxStudents: locationInfo.maxStudents,
                  address: locationInfo.address,
                  phone: locationInfo.phone
                });
                setShowEditLocationForm(true);
              }}
            >
              編集
            </button>
          </div>
          <div className="location-details">
            <p><strong>拠点名:</strong> {locationInfo.name}</p>
            <p><strong>住所:</strong> {locationInfo.address}</p>
            <p><strong>電話:</strong> {locationInfo.phone}</p>
            <p><strong>最大生徒数:</strong> {locationInfo.maxStudents}名</p>
          </div>
        </div>

        <div className="section">
          <div className="section-header">
            <h3>拠点内指導員一覧</h3>
            <button 
              className="add-btn"
              onClick={() => setShowAddTeacherForm(true)}
            >
              + 指導員を追加
            </button>
          </div>
          <div className="teachers-list">
            {instructors.map(teacher => (
              <div key={teacher.id} className="teacher-item">
                <div className="teacher-info">
                  <h4>{teacher.name}</h4>
                  <p>{teacher.department}</p>
                  <p>担当生徒: {teacher.studentsCount}名</p>
                  <p>入職日: {teacher.joinDate}</p>
                </div>
                <div className="teacher-actions">
                  <span className={`status ${teacher.status}`}>
                    {teacher.status === 'active' ? 'アクティブ' : '非アクティブ'}
                  </span>
                  <button 
                    className={`status-toggle ${teacher.status}`}
                    onClick={() => toggleTeacherStatus(teacher.id)}
                  >
                    {teacher.status === 'active' ? '無効化' : '有効化'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 拠点編集モーダル */}
      {showEditLocationForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>拠点情報の編集</h3>
            <form onSubmit={handleLocationUpdate}>
              <div className="form-group">
                <label>拠点名</label>
                <input
                  type="text"
                  value={editLocation.name}
                  onChange={(e) => setEditLocation({...editLocation, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>最大生徒数</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={editLocation.maxStudents}
                  onChange={(e) => setEditLocation({...editLocation, maxStudents: e.target.value})}
                  required
                />
                <small>現在の生徒数: {locationInfo.currentStudents}名</small>
              </div>
              <div className="form-group">
                <label>住所</label>
                <input
                  type="text"
                  value={editLocation.address}
                  onChange={(e) => setEditLocation({...editLocation, address: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>電話番号</label>
                <input
                  type="text"
                  value={editLocation.phone}
                  onChange={(e) => setEditLocation({...editLocation, phone: e.target.value})}
                  required
                />
              </div>
              <div className="form-actions">
                <button type="button" onClick={() => setShowEditLocationForm(false)}>
                  キャンセル
                </button>
                <button type="submit">更新</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 先生追加モーダル */}
      {showAddTeacherForm && (
        <div className="modal-overlay">
          <div className="modal-content">
                          <h3>新しい指導員を追加</h3>
            <form onSubmit={handleAddTeacher}>
              <div className="form-group">
                <label>名前</label>
                <input
                  type="text"
                  value={newTeacher.name}
                  onChange={(e) => setNewTeacher({...newTeacher, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>メールアドレス</label>
                <input
                  type="email"
                  value={newTeacher.email}
                  onChange={(e) => setNewTeacher({...newTeacher, email: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>学科</label>
                <select
                  value={newTeacher.department}
                  onChange={(e) => setNewTeacher({...newTeacher, department: e.target.value})}
                  required
                >
                  <option value="">学科を選択</option>
                  <option value="プログラミング学科">プログラミング学科</option>
                  <option value="Web開発学科">Web開発学科</option>
                  <option value="データサイエンス学科">データサイエンス学科</option>
                  <option value="デザイン学科">デザイン学科</option>
                </select>
              </div>
              <div className="form-group">
                <label>初期パスワード</label>
                <input
                  type="password"
                  value={newTeacher.password}
                  onChange={(e) => setNewTeacher({...newTeacher, password: e.target.value})}
                  required
                />
              </div>
              <div className="form-actions">
                <button type="button" onClick={() => setShowAddTeacherForm(false)}>
                  キャンセル
                </button>
                <button type="submit">追加</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationManagementForInstructor; 