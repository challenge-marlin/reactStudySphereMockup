import React, { useState } from 'react';

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
    
    const newInstructorData = {
      id: `instructor${Date.now()}`,
      ...newInstructor,
      facilityName: facilities.find(f => f.id === newInstructor.facilityId)?.name || '',
      locationName: getAvailableLocations().find(l => l.id === newInstructor.locationId)?.name || '',
      studentsCount: 0,
      coursesCount: 0,
      status: 'active',
      lastLogin: '-',
      joinDate: new Date().toISOString().split('T')[0],
      passwordResetRequired: false
    };
    
    setInstructors([...instructors, newInstructorData]);
    setNewInstructor({
      name: '',
      email: '',
      department: '',
      facilityId: '',
      locationId: '',
      password: ''
    });
    setShowAddForm(false);
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

  // ソート機能を追加
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortedInstructors = () => {
    const filtered = getFilteredInstructors();
    return [...filtered].sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];
      
      if (sortConfig.key === 'status') {
        aValue = getStatusLabel(aValue);
        bValue = getStatusLabel(bValue);
      }
      
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'active':
        return 'アクティブ';
      case 'inactive':
        return '非アクティブ';
      case 'password_reset_required':
        return 'パスワード変更要求';
      default:
        return status;
    }
  };

  const handleEditInstructor = (instructor) => {
    setSelectedInstructor(instructor);
    setNewInstructor({
      name: instructor.name,
      email: instructor.email,
      department: instructor.department,
      facilityId: instructor.facilityId,
      locationId: instructor.locationId,
      password: '' // 編集時はパスワードを空にする
    });
    setShowAddForm(true); // 編集モードでも追加フォームを表示
  };

  const handleResetPassword = (instructorId) => {
    const instructor = instructors.find(inst => inst.id === instructorId);
    if (instructor) {
      executePasswordReset('force_change');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8 pb-4 border-b-2 border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800">指導員管理</h2>
        <button 
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
          onClick={() => setShowAddForm(true)}
        >
          + 新しい指導員を追加
        </button>
      </div>

      {/* フィルターセクション */}
      <div className="bg-gray-50 rounded-xl p-6 mb-6 shadow-sm">
        <div className="mb-4">
          <input
            type="text"
            placeholder="指導員名、メール、学科で検索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-400 transition-colors duration-300"
          />
        </div>

        <div className="flex flex-wrap gap-6 items-end mb-4">
          <div className="flex flex-col min-w-[150px]">
            <label className="font-semibold text-gray-700 mb-2 text-sm">事業所:</label>
            <select 
              value={facilityFilter} 
              onChange={(e) => {
                setFacilityFilter(e.target.value);
                setLocationFilter('all'); // 事業所変更時は拠点フィルターをリセット
              }}
              className="px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-400 transition-colors duration-300"
            >
              <option value="all">全ての事業所</option>
              {facilities.map(facility => (
                <option key={facility.id} value={facility.id}>
                  {facility.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col min-w-[150px]">
            <label className="font-semibold text-gray-700 mb-2 text-sm">拠点:</label>
            <select 
              value={locationFilter} 
              onChange={(e) => setLocationFilter(e.target.value)}
              disabled={facilityFilter === 'all'}
              className="px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-400 transition-colors duration-300 disabled:bg-gray-100 disabled:text-gray-500"
            >
              <option value="all">全ての拠点</option>
              {getAvailableLocations().map(location => (
                <option key={location.id} value={location.id}>
                  {location.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col min-w-[150px]">
            <label className="font-semibold text-gray-700 mb-2 text-sm">ステータス:</label>
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-400 transition-colors duration-300"
            >
              <option value="all">全て</option>
              <option value="active">アクティブ</option>
              <option value="inactive">非アクティブ</option>
            </select>
          </div>

          <button 
            className="bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-300 hover:bg-gray-700"
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

        <div className="font-semibold text-gray-700 text-sm">
          表示中: {getFilteredInstructors().length}名 / 全{instructors.length}名
        </div>
      </div>

      {/* 指導員一覧テーブル */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-red-50">
              <tr>
                <th 
                  className="px-6 py-4 text-left text-sm font-semibold text-red-800 cursor-pointer hover:bg-red-100 transition-colors duration-200"
                  onClick={() => handleSort('name')}
                >
                  👤 指導員名
                  {sortConfig.key === 'name' && (
                    <span className="ml-1">
                      {sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}
                    </span>
                  )}
                </th>
                <th 
                  className="px-6 py-4 text-left text-sm font-semibold text-red-800 cursor-pointer hover:bg-red-100 transition-colors duration-200"
                  onClick={() => handleSort('email')}
                >
                  📧 メールアドレス
                  {sortConfig.key === 'email' && (
                    <span className="ml-1">
                      {sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}
                    </span>
                  )}
                </th>
                <th 
                  className="px-6 py-4 text-left text-sm font-semibold text-red-800 cursor-pointer hover:bg-red-100 transition-colors duration-200"
                  onClick={() => handleSort('department')}
                >
                  🎯 専門分野
                  {sortConfig.key === 'department' && (
                    <span className="ml-1">
                      {sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}
                    </span>
                  )}
                </th>
                <th 
                  className="px-6 py-4 text-left text-sm font-semibold text-red-800 cursor-pointer hover:bg-red-100 transition-colors duration-200"
                  onClick={() => handleSort('studentsCount')}
                >
                  👥 生徒数
                  {sortConfig.key === 'studentsCount' && (
                    <span className="ml-1">
                      {sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}
                    </span>
                  )}
                </th>
                <th 
                  className="px-6 py-4 text-left text-sm font-semibold text-red-800 cursor-pointer hover:bg-red-100 transition-colors duration-200"
                  onClick={() => handleSort('status')}
                >
                  📊 ステータス
                  {sortConfig.key === 'status' && (
                    <span className="ml-1">
                      {sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}
                    </span>
                  )}
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-red-800">📅 登録日</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-red-800">⚙️ 操作</th>
              </tr>
            </thead>
            <tbody>
              {getSortedInstructors().map(instructor => (
                <tr key={instructor.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-red-600 font-bold text-sm">
                          {instructor.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <strong className="text-gray-800">{instructor.name}</strong>
                        <div className="text-xs text-gray-500">ID: {instructor.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    📧 {instructor.email}
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {instructor.department}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {instructor.studentsCount}名
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      instructor.status === 'active' 
                        ? 'bg-green-100 text-green-800'
                        : instructor.status === 'inactive'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {getStatusLabel(instructor.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-sm">
                    📅 {instructor.joinDate}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button 
                        className="bg-blue-500 text-white px-3 py-1 rounded text-sm font-medium transition-colors duration-300 hover:bg-blue-600"
                        onClick={() => handleEditInstructor(instructor)}
                        title="編集"
                      >
                        ✏️ 編集
                      </button>
                      <button 
                        className="bg-orange-500 text-white px-3 py-1 rounded text-sm font-medium transition-colors duration-300 hover:bg-orange-600"
                        onClick={() => handlePasswordReset(instructor)}
                        title="パスワードリセット"
                      >
                        🔑 リセット
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {getSortedInstructors().length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">条件に合致する指導員が見つかりません。</p>
          </div>
        )}
      </div>

      {/* パスワードリセットモーダル */}
      {showPasswordResetModal && selectedInstructor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">パスワード管理 - {selectedInstructor.name}</h3>
              <button 
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold transition-colors duration-200"
                onClick={() => setShowPasswordResetModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">一時パスワード発行</h4>
                <p className="text-gray-600 text-sm mb-4">新しい一時パスワードを発行します。指導員は次回ログイン時に新しいパスワードを設定する必要があります。</p>
                <button 
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-300 hover:bg-blue-600"
                  onClick={() => executePasswordReset('temporary')}
                >
                  一時パスワードを発行
                </button>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">パスワード変更要求</h4>
                <p className="text-gray-600 text-sm mb-4">指導員に次回ログイン時のパスワード変更を要求します。現在のパスワードは無効になりません。</p>
                <button 
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-300 hover:bg-orange-600"
                  onClick={() => executePasswordReset('force_change')}
                >
                  パスワード変更を要求
                </button>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">現在の状況</h4>
              <p className="text-blue-700 text-sm">
                パスワードリセット要求: {selectedInstructor.passwordResetRequired ? 'あり' : 'なし'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 一時パスワードダイアログ */}
      {showTempPasswordDialog && selectedInstructor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-4">一時パスワード発行完了</h3>
              <p className="text-gray-600 mb-6">
                指導員 <strong>{selectedInstructor.name}</strong> の一時パスワードを発行しました。
              </p>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">一時パスワード:</label>
                <div className="relative">
                  <input
                    type="text"
                    value={generatedTempPassword}
                    readOnly
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-gray-50 font-mono text-lg text-center"
                  />
                  <button
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-2 rounded transition-colors duration-200"
                    onClick={() => navigator.clipboard.writeText(generatedTempPassword)}
                    title="コピー"
                  >
                    📋
                  </button>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <p className="text-yellow-800 text-sm">
                  <strong>注意:</strong> このパスワードは一度だけ表示されます。指導員に安全に伝達してください。
                </p>
              </div>

              <div className="flex gap-3 justify-center">
                <button
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-300 hover:bg-blue-600"
                  onClick={() => {
                    navigator.clipboard.writeText(generatedTempPassword);
                    alert('パスワードをクリップボードにコピーしました！');
                  }}
                >
                  コピーして閉じる
                </button>
                <button
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-300 hover:bg-gray-600"
                  onClick={() => {
                    setShowTempPasswordDialog(false);
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

      {/* 指導員追加フォームモーダル */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">新しい指導員を追加</h3>
              <button 
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold transition-colors duration-200"
                onClick={() => setShowAddForm(false)}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleAddInstructor} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">指導員名:</label>
                <input
                  type="text"
                  name="name"
                  value={newInstructor.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-400 transition-colors duration-300"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">メールアドレス:</label>
                <input
                  type="email"
                  name="email"
                  value={newInstructor.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-400 transition-colors duration-300"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">学科:</label>
                <input
                  type="text"
                  name="department"
                  value={newInstructor.department}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-400 transition-colors duration-300"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">事業所:</label>
                <select
                  name="facilityId"
                  value={newInstructor.facilityId}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-400 transition-colors duration-300"
                >
                  <option value="">事業所を選択</option>
                  {facilities.map(facility => (
                    <option key={facility.id} value={facility.id}>
                      {facility.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">拠点:</label>
                <select
                  name="locationId"
                  value={newInstructor.locationId}
                  onChange={handleInputChange}
                  required
                  disabled={!newInstructor.facilityId}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-400 transition-colors duration-300 disabled:bg-gray-100 disabled:text-gray-500"
                >
                  <option value="">拠点を選択</option>
                  {getAvailableLocations().map(location => (
                    <option key={location.id} value={location.id}>
                      {location.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">初期パスワード:</label>
                <input
                  type="password"
                  name="password"
                  value={newInstructor.password}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-400 transition-colors duration-300"
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-indigo-500 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300 hover:bg-indigo-600"
                >
                  追加
                </button>
                <button
                  type="button"
                  className="flex-1 bg-gray-500 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300 hover:bg-gray-600"
                  onClick={() => setShowAddForm(false)}
                >
                  キャンセル
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstructorManagement; 