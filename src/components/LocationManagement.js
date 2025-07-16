import React, { useState } from 'react';
import './LocationManagement.css';

const LocationManagement = () => {
  // デフォルトの事業所タイプ
  const [facilityTypes, setFacilityTypes] = useState([
    '就労移行支援事業所',
    '就労継続支援A型事業所',
    '就労継続支援B型事業所',
    '学習塾'
  ]);

  // モック事業所・拠点データ
  const [facilities, setFacilities] = useState([
    {
      id: 'facility001',
      name: 'スタディスフィア東京校',
      type: '就労移行支援事業所',
      address: '東京都渋谷区神南1-2-3',
      phone: '03-1234-5678',
      contacts: [
        { name: '田中太郎', email: 'tanaka@example.com' },
        { name: '佐藤花子', email: 'sato@example.com' },
        { name: '鈴木一郎', email: 'suzuki@example.com' }
      ],
      locations: [
        {
          id: 'location001',
          name: '東京本校',
          address: '東京都渋谷区神南1-2-3',
          teacherCount: 3,
          studentCount: 18,
          maxStudents: 25
        },
        {
          id: 'location003',
          name: '新宿サテライト',
          address: '東京都新宿区西新宿2-3-4',
          teacherCount: 2,
          studentCount: 12,
          maxStudents: 20
        },
        {
          id: 'location004',
          name: '池袋教室',
          address: '東京都豊島区池袋1-1-1',
          teacherCount: 1,
          studentCount: 8,
          maxStudents: 15
        }
      ]
    },
    {
      id: 'facility002',
      name: 'スタディスフィア大阪校',
      type: '就労移行支援事業所',
      address: '大阪府大阪市北区梅田3-4-5',
      phone: '06-5678-9012',
      contacts: [
        { name: '山田次郎', email: 'yamada@example.com' },
        { name: '高橋美咲', email: 'takahashi@example.com' }
      ],
      locations: [
        {
          id: 'location002',
          name: '大阪支校',
          address: '大阪府大阪市北区梅田3-4-5',
          teacherCount: 2,
          studentCount: 15,
          maxStudents: 30
        },
        {
          id: 'location005',
          name: '難波教室',
          address: '大阪府大阪市中央区難波5-6-7',
          teacherCount: 1,
          studentCount: 10,
          maxStudents: 20
        }
      ]
    },
    {
      id: 'facility003',
      name: 'スタディスフィア名古屋校',
      type: '就労継続支援A型事業所',
      address: '愛知県名古屋市中区栄1-1-1',
      phone: '052-1234-5678',
      contacts: [
        { name: '伊藤健太', email: 'ito@example.com' },
        { name: '渡辺真理', email: 'watanabe@example.com' }
      ],
      locations: [
        {
          id: 'location006',
          name: '名古屋本校',
          address: '愛知県名古屋市中区栄1-1-1',
          teacherCount: 2,
          studentCount: 14,
          maxStudents: 25
        }
      ]
    },
    {
      id: 'facility004',
      name: 'スタディスフィア福岡校',
      type: '就労継続支援B型事業所',
      address: '福岡県福岡市博多区博多駅前2-2-2',
      phone: '092-1234-5678',
      contacts: [
        { name: '中村雅子', email: 'nakamura@example.com' }
      ],
      locations: [
        {
          id: 'location007',
          name: '福岡本校',
          address: '福岡県福岡市博多区博多駅前2-2-2',
          teacherCount: 1,
          studentCount: 6,
          maxStudents: 15
        },
        {
          id: 'location008',
          name: '天神教室',
          address: '福岡県福岡市中央区天神3-3-3',
          teacherCount: 1,
          studentCount: 4,
          maxStudents: 12
        }
      ]
    },
    {
      id: 'facility005',
      name: 'スタディスフィア札幌校',
      type: '学習塾',
      address: '北海道札幌市中央区南1条西5-5-5',
      phone: '011-1234-5678',
      contacts: [
        { name: '佐々木隆', email: 'sasaki@example.com' },
        { name: '小林恵子', email: 'kobayashi@example.com' },
        { name: '加藤正義', email: 'kato@example.com' }
      ],
      locations: [
        {
          id: 'location009',
          name: '札幌本校',
          address: '北海道札幌市中央区南1条西5-5-5',
          teacherCount: 2,
          studentCount: 20,
          maxStudents: 30
        }
      ]
    },
    {
      id: 'facility006',
      name: 'スタディスフィア仙台校',
      type: '就労移行支援事業所',
      address: '宮城県仙台市青葉区一番町4-4-4',
      phone: '022-1234-5678',
      contacts: [
        { name: '斎藤和也', email: 'saito@example.com' }
      ],
      locations: [
        {
          id: 'location010',
          name: '仙台本校',
          address: '宮城県仙台市青葉区一番町4-4-4',
          teacherCount: 1,
          studentCount: 9,
          maxStudents: 18
        }
      ]
    }
  ]);

  // ソート・フィルタ状態
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const [newFacility, setNewFacility] = useState({
    name: '',
    type: '就労移行支援事業所',
    address: '',
    phone: '',
    contacts: [{ name: '', email: '' }]
  });

  const [newLocation, setNewLocation] = useState({
    facilityId: '',
    name: '',
    address: ''
  });

  const [showFacilityForm, setShowFacilityForm] = useState(false);
  const [showLocationForm, setShowLocationForm] = useState(false);
  const [showTypeManagement, setShowTypeManagement] = useState(false);
  const [newFacilityType, setNewFacilityType] = useState('');
  const [editingLocation, setEditingLocation] = useState(null);
  const [editValues, setEditValues] = useState({});

  // 拠点詳細表示
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showLocationDetail, setShowLocationDetail] = useState(false);

  // 事業所詳細・編集画面の状態
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [showFacilityDetail, setShowFacilityDetail] = useState(false);
  const [isEditingFacility, setIsEditingFacility] = useState(false);
  const [editingFacilityData, setEditingFacilityData] = useState({});

  // ソート機能
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // フィルタ・ソート済みデータ
  const getFilteredAndSortedFacilities = () => {
    let filtered = facilities.filter(facility => {
      const matchesSearch = facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           facility.address.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || facility.type === filterType;
      return matchesSearch && matchesType;
    });

    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortConfig.key) {
        case 'name':
          aValue = a.name;
          bValue = b.name;
          break;
        case 'type':
          aValue = a.type;
          bValue = b.type;
          break;
        case 'locationCount':
          aValue = a.locations.length;
          bValue = b.locations.length;
          break;
        case 'totalStudents':
          aValue = a.locations.reduce((sum, loc) => sum + loc.studentCount, 0);
          bValue = b.locations.reduce((sum, loc) => sum + loc.studentCount, 0);
          break;
        case 'totalTeachers':
          aValue = a.locations.reduce((sum, loc) => sum + loc.teacherCount, 0);
          bValue = b.locations.reduce((sum, loc) => sum + loc.teacherCount, 0);
          break;
        default:
          aValue = a[sortConfig.key];
          bValue = b[sortConfig.key];
      }

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  };

  // 拠点詳細を表示
  const handleViewLocationDetail = (location) => {
    setSelectedLocation(location);
    setShowLocationDetail(true);
  };

  // モック生徒データ（拠点別）
  const getStudentsByLocation = (locationId) => {
    const allStudents = [
      { id: 'student001', name: '末吉 元気', email: 'sueyoshi@example.com', course: 'ITリテラシー・AIの基本', instructor: '佐藤指導員', progress: 75, status: 'active', locationId: 'location001' },
      { id: 'student002', name: '小渕 正明', email: 'obuchi@example.com', course: 'ITリテラシー・AIの基本', instructor: '田中指導員', progress: 25, status: 'active', locationId: 'location001' },
      { id: 'student003', name: '田中 花子', email: 'tanaka.h@example.com', course: 'SNS運用の基礎・画像生成編集', instructor: '佐藤指導員', progress: 60, status: 'active', locationId: 'location001' },
      { id: 'student004', name: '佐藤 太郎', email: 'sato.t@example.com', course: 'LP制作(HTML・CSS)', instructor: '田中指導員', progress: 80, status: 'active', locationId: 'location002' },
      { id: 'student005', name: '山田 美咲', email: 'yamada.m@example.com', course: 'SNS管理代行・LP制作案件対応', instructor: '鈴木指導員', progress: 45, status: 'active', locationId: 'location003' },
      { id: 'student006', name: '高橋 健太', email: 'takahashi.k@example.com', course: 'SNS運用の基礎・画像生成編集', instructor: '佐藤指導員', progress: 15, status: 'inactive', locationId: 'location001' }
    ];

    return allStudents.filter(student => student.locationId === locationId);
  };

  // 事業所タイプ管理
  const handleAddFacilityType = () => {
    if (newFacilityType.trim() && !facilityTypes.includes(newFacilityType.trim())) {
      setFacilityTypes([...facilityTypes, newFacilityType.trim()]);
      setNewFacilityType('');
    }
  };

  const handleRemoveFacilityType = (typeToRemove) => {
    if (facilityTypes.length > 1) { // 最低1つは残す
      setFacilityTypes(facilityTypes.filter(type => type !== typeToRemove));
    }
  };

  // 担当者管理
  const addContactField = () => {
    setNewFacility({
      ...newFacility,
      contacts: [...newFacility.contacts, { name: '', email: '' }]
    });
  };

  const removeContactField = (index) => {
    if (newFacility.contacts.length > 1) {
      const updatedContacts = newFacility.contacts.filter((_, i) => i !== index);
      setNewFacility({
        ...newFacility,
        contacts: updatedContacts
      });
    }
  };

  const updateContact = (index, field, value) => {
    const updatedContacts = newFacility.contacts.map((contact, i) => 
      i === index ? { ...contact, [field]: value } : contact
    );
    setNewFacility({
      ...newFacility,
      contacts: updatedContacts
    });
  };

  const handleAddFacility = () => {
    if (newFacility.name && newFacility.address && 
        newFacility.contacts.some(contact => contact.name && contact.email)) {
      
      // 空の担当者情報を除外
      const validContacts = newFacility.contacts.filter(contact => 
        contact.name.trim() && contact.email.trim()
      );

      const facility = {
        id: `facility${Date.now()}`,
        ...newFacility,
        contacts: validContacts,
        locations: []
      };
      
      setFacilities([...facilities, facility]);
      setNewFacility({ 
        name: '', 
        type: '就労移行支援事業所', 
        address: '', 
        phone: '', 
        contacts: [{ name: '', email: '' }] 
      });
      setShowFacilityForm(false);
    }
  };

  const handleAddLocation = () => {
    if (newLocation.facilityId && newLocation.name && newLocation.address) {
      setFacilities(facilities.map(facility => {
        if (facility.id === newLocation.facilityId) {
          const location = {
            id: `location${Date.now()}`,
            name: newLocation.name,
            address: newLocation.address,
            teacherCount: 0,
            studentCount: 0,
            maxStudents: 20
          };
          return {
            ...facility,
            locations: [...facility.locations, location]
          };
        }
        return facility;
      }));
      setNewLocation({ facilityId: '', name: '', address: '' });
      setShowLocationForm(false);
    }
  };

  const handleEditLocation = (facilityId, locationId) => {
    const facility = facilities.find(f => f.id === facilityId);
    const location = facility.locations.find(l => l.id === locationId);
    setEditingLocation(locationId);
    setEditValues({
      maxStudents: location.maxStudents,
      name: location.name,
      address: location.address
    });
  };

  const handleSaveLocation = (facilityId, locationId) => {
    setFacilities(facilities.map(facility => {
      if (facility.id === facilityId) {
        return {
          ...facility,
          locations: facility.locations.map(location => {
            if (location.id === locationId) {
              return {
                ...location,
                ...editValues,
                maxStudents: parseInt(editValues.maxStudents) || 20
              };
            }
            return location;
          })
        };
      }
      return facility;
    }));
    setEditingLocation(null);
    setEditValues({});
  };

  const handleCancelEdit = () => {
    setEditingLocation(null);
    setEditValues({});
  };

  // 事業所詳細表示
  const handleViewFacilityDetail = (facility) => {
    setSelectedFacility(facility);
    setEditingFacilityData({
      name: facility.name,
      type: facility.type,
      address: facility.address,
      phone: facility.phone,
      contacts: [...facility.contacts]
    });
    setShowFacilityDetail(true);
    setIsEditingFacility(true);
  };

  // 事業所編集
  const handleEditFacility = (facilityId) => {
    const facility = facilities.find(f => f.id === facilityId);
    if (facility) {
      handleViewFacilityDetail(facility);
    }
  };

  // 事業所データの保存
  const handleSaveFacility = () => {
    if (editingFacilityData.name && editingFacilityData.address) {
      setFacilities(facilities.map(facility => {
        if (facility.id === selectedFacility.id) {
          return {
            ...facility,
            ...editingFacilityData,
            contacts: editingFacilityData.contacts.filter(contact => 
              contact.name.trim() && contact.email.trim()
            )
          };
        }
        return facility;
      }));
      setShowFacilityDetail(false);
      setIsEditingFacility(false);
      setSelectedFacility(null);
      setEditingFacilityData({});
    }
  };

  // 事業所編集のキャンセル
  const handleCancelFacilityEdit = () => {
    setShowFacilityDetail(false);
    setIsEditingFacility(false);
    setSelectedFacility(null);
    setEditingFacilityData({});
  };

  // 担当者フィールドの追加
  const addContactFieldToEdit = () => {
    setEditingFacilityData({
      ...editingFacilityData,
      contacts: [...editingFacilityData.contacts, { name: '', email: '' }]
    });
  };

  // 担当者フィールドの削除
  const removeContactFieldFromEdit = (index) => {
    if (editingFacilityData.contacts.length > 1) {
      const updatedContacts = editingFacilityData.contacts.filter((_, i) => i !== index);
      setEditingFacilityData({
        ...editingFacilityData,
        contacts: updatedContacts
      });
    }
  };

  // 編集中の担当者情報更新
  const updateContactInEdit = (index, field, value) => {
    const updatedContacts = editingFacilityData.contacts.map((contact, i) => 
      i === index ? { ...contact, [field]: value } : contact
    );
    setEditingFacilityData({
      ...editingFacilityData,
      contacts: updatedContacts
    });
  };

  // 拠点削除
  const handleDeleteLocation = (locationId) => {
    // TODO: 拠点削除機能を実装
    console.log('拠点を削除:', locationId);
  };

  const totalLocations = facilities.reduce((sum, facility) => sum + facility.locations.length, 0);
  const totalTeachers = facilities.reduce((sum, facility) => 
    sum + facility.locations.reduce((locSum, location) => locSum + location.teacherCount, 0), 0);
  const totalStudents = facilities.reduce((sum, facility) => 
    sum + facility.locations.reduce((locSum, location) => locSum + location.studentCount, 0), 0);
  const totalMaxStudents = facilities.reduce((sum, facility) => 
    sum + facility.locations.reduce((locSum, location) => locSum + (location.maxStudents || 20), 0), 0);

  const filteredFacilities = getFilteredAndSortedFacilities();

  return (
    <div className="location-management">
      <div className="location-header">
        <h2>拠点・事業所管理</h2>
        <div className="stats-summary">
          <div className="stat-card">
            <h3>事業所数</h3>
            <p>{facilities.length}</p>
          </div>
          <div className="stat-card">
            <h3>拠点数</h3>
            <p>{totalLocations}</p>
          </div>
          <div className="stat-card">
            <h3>総指導員数</h3>
            <p>{totalTeachers}</p>
          </div>
          <div className="stat-card">
            <h3>総生徒数</h3>
            <p>{totalStudents} / {totalMaxStudents}</p>
            <small>使用率: {Math.round((totalStudents/totalMaxStudents)*100)}%</small>
          </div>
        </div>
      </div>

      <div className="management-actions">
        <button 
          className="add-button"
          onClick={() => setShowFacilityForm(true)}
        >
          + 事業所を追加
        </button>
        <button 
          className="add-button"
          onClick={() => setShowLocationForm(true)}
        >
          + 拠点を追加
        </button>
        <button 
          className="manage-types-button"
          onClick={() => setShowTypeManagement(true)}
        >
          📝 事業所タイプ管理
        </button>
      </div>

      {/* 検索・フィルタセクション */}
      <div className="search-filter-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="事業所名または住所で検索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-box">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="filter-select"
          >
            <option value="all">すべての事業所タイプ</option>
            {facilityTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 事業所リスト（テーブル形式） */}
      <div className="facilities-table-container">
        <table className="facilities-table">
          <thead>
            <tr>
              <th 
                className="sortable-header"
                onClick={() => handleSort('name')}
              >
                事業所名
                {sortConfig.key === 'name' && (
                  <span className="sort-indicator">
                    {sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}
                  </span>
                )}
              </th>
              <th 
                className="sortable-header"
                onClick={() => handleSort('type')}
              >
                事業所タイプ
                {sortConfig.key === 'type' && (
                  <span className="sort-indicator">
                    {sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}
                  </span>
                )}
              </th>
              <th>住所</th>
              <th>電話番号</th>
              <th>担当者</th>
              <th 
                className="sortable-header"
                onClick={() => handleSort('locationCount')}
              >
                拠点数
                {sortConfig.key === 'locationCount' && (
                  <span className="sort-indicator">
                    {sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}
                  </span>
                )}
              </th>
              <th 
                className="sortable-header"
                onClick={() => handleSort('totalTeachers')}
              >
                総指導員数
                {sortConfig.key === 'totalTeachers' && (
                  <span className="sort-indicator">
                    {sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}
                  </span>
                )}
              </th>
              <th 
                className="sortable-header"
                onClick={() => handleSort('totalStudents')}
              >
                総生徒数
                {sortConfig.key === 'totalStudents' && (
                  <span className="sort-indicator">
                    {sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}
                  </span>
                )}
              </th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {filteredFacilities.map(facility => {
              const totalFacilityTeachers = facility.locations.reduce((sum, loc) => sum + loc.teacherCount, 0);
              const totalFacilityStudents = facility.locations.reduce((sum, loc) => sum + loc.studentCount, 0);
              const totalFacilityMaxStudents = facility.locations.reduce((sum, loc) => sum + (loc.maxStudents || 20), 0);
              
              return (
                <tr key={facility.id} className="facility-row">
                  <td className="facility-name">
                    <strong>{facility.name}</strong>
                  </td>
                  <td className="facility-type">
                    <span className="type-badge">{facility.type}</span>
                  </td>
                  <td className="facility-address">
                    📍 {facility.address}
                  </td>
                  <td className="facility-phone">
                    📞 {facility.phone}
                  </td>
                  <td className="facility-contacts">
                    <div className="contacts-list">
                      {facility.contacts && facility.contacts.length > 0 ? (
                        facility.contacts.map((contact, index) => (
                          <div key={index} className="contact-item">
                            <span className="contact-name">{contact.name}</span>
                            <span className="contact-email">📧 {contact.email}</span>
                          </div>
                        ))
                      ) : (
                        <span className="no-contacts">担当者なし</span>
                      )}
                    </div>
                  </td>
                  <td className="facility-location-count">
                    <span className="location-count-badge">
                      {facility.locations.length}拠点
                    </span>
                  </td>
                  <td className="facility-teacher-count">
                    {totalFacilityTeachers}人
                  </td>
                  <td className="facility-student-count">
                    <div className="student-count-info">
                      <span className={`student-count ${totalFacilityStudents > totalFacilityMaxStudents ? 'over-capacity' : ''}`}>
                        {totalFacilityStudents}/{totalFacilityMaxStudents}
                      </span>
                      <small className="capacity-rate">
                        {Math.round((totalFacilityStudents / totalFacilityMaxStudents) * 100)}%
                      </small>
                    </div>
                  </td>
                  <td className="facility-actions">
                    <div className="action-buttons">
                      <button 
                        className="view-detail-btn"
                        onClick={() => handleViewFacilityDetail(facility)}
                        title="事業所詳細・編集"
                      >
                        👁️ 詳細
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        
        {filteredFacilities.length === 0 && (
          <div className="no-results">
            <p>検索条件に一致する事業所が見つかりませんでした。</p>
          </div>
        )}
      </div>

      {/* 事業所タイプ管理モーダル */}
      {showTypeManagement && (
        <div className="form-modal">
          <div className="form-content type-management">
            <h3>事業所タイプ管理</h3>
            
            <div className="current-types">
              <h4>現在の事業所タイプ</h4>
              <div className="types-list">
                {facilityTypes.map(type => (
                  <div key={type} className="type-item">
                    <span>{type}</span>
                    <button 
                      className="remove-type-btn"
                      onClick={() => handleRemoveFacilityType(type)}
                      disabled={facilityTypes.length <= 1}
                    >
                      削除
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="add-type-section">
              <h4>新しい事業所タイプを追加</h4>
              <div className="add-type-form">
                <input
                  type="text"
                  placeholder="新しい事業所タイプ名"
                  value={newFacilityType}
                  onChange={(e) => setNewFacilityType(e.target.value)}
                />
                <button onClick={handleAddFacilityType}>追加</button>
              </div>
            </div>

            <div className="form-actions">
              <button onClick={() => setShowTypeManagement(false)}>閉じる</button>
            </div>
          </div>
        </div>
      )}

      {showFacilityForm && (
        <div className="form-modal">
          <div className="form-content facility-form">
            <h3>新しい事業所を追加</h3>
            
            <input
              type="text"
              placeholder="事業所名"
              value={newFacility.name}
              onChange={(e) => setNewFacility({...newFacility, name: e.target.value})}
            />
            
            <select
              value={newFacility.type}
              onChange={(e) => setNewFacility({...newFacility, type: e.target.value})}
            >
              {facilityTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            
            <input
              type="text"
              placeholder="住所"
              value={newFacility.address}
              onChange={(e) => setNewFacility({...newFacility, address: e.target.value})}
            />
            
            <input
              type="text"
              placeholder="電話番号"
              value={newFacility.phone}
              onChange={(e) => setNewFacility({...newFacility, phone: e.target.value})}
            />

            {/* 担当者情報 */}
            <div className="contacts-section">
              <div className="contacts-header">
                <h4>担当者情報</h4>
                <button 
                  type="button"
                  className="add-contact-btn"
                  onClick={addContactField}
                >
                  + 担当者を追加
                </button>
              </div>
              
              {newFacility.contacts.map((contact, index) => (
                <div key={index} className="contact-item">
                  <div className="contact-inputs">
                    <input
                      type="text"
                      placeholder="担当者名"
                      value={contact.name}
                      onChange={(e) => updateContact(index, 'name', e.target.value)}
                    />
                    <input
                      type="email"
                      placeholder="メールアドレス"
                      value={contact.email}
                      onChange={(e) => updateContact(index, 'email', e.target.value)}
                    />
                    {newFacility.contacts.length > 1 && (
                      <button 
                        type="button"
                        className="remove-contact-btn"
                        onClick={() => removeContactField(index)}
                      >
                        削除
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="form-actions">
              <button onClick={handleAddFacility}>追加</button>
              <button onClick={() => setShowFacilityForm(false)}>キャンセル</button>
            </div>
          </div>
        </div>
      )}

      {showLocationForm && (
        <div className="form-modal">
          <div className="form-content">
            <h3>新しい拠点を追加</h3>
            <select
              value={newLocation.facilityId}
              onChange={(e) => setNewLocation({...newLocation, facilityId: e.target.value})}
            >
              <option value="">事業所を選択</option>
              {facilities.map(facility => (
                <option key={facility.id} value={facility.id}>
                  {facility.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="拠点名"
              value={newLocation.name}
              onChange={(e) => setNewLocation({...newLocation, name: e.target.value})}
            />
            <input
              type="text"
              placeholder="住所"
              value={newLocation.address}
              onChange={(e) => setNewLocation({...newLocation, address: e.target.value})}
            />
            <div className="form-actions">
              <button onClick={handleAddLocation}>追加</button>
              <button onClick={() => setShowLocationForm(false)}>キャンセル</button>
            </div>
          </div>
        </div>
      )}

      {/* 事業所詳細・編集モーダル */}
      {showFacilityDetail && selectedFacility && (
        <div className="modal-overlay">
          <div className="facility-detail-modal">
            <div className="modal-header">
              <h3>{isEditingFacility ? '事業所編集' : '事業所詳細'} - {selectedFacility.name}</h3>
              <button 
                className="close-button"
                onClick={handleCancelFacilityEdit}
              >
                ×
              </button>
            </div>
            
            <div className="detail-content">
              {isEditingFacility ? (
                // 編集フォーム
                <div className="edit-form">
                  <div className="form-section">
                    <h4>基本情報</h4>
                    <div className="form-row">
                      <div className="form-group">
                        <label>事業所名 *</label>
                        <input
                          type="text"
                          value={editingFacilityData.name || ''}
                          onChange={(e) => setEditingFacilityData({
                            ...editingFacilityData,
                            name: e.target.value
                          })}
                          placeholder="事業所名"
                        />
                      </div>
                      <div className="form-group">
                        <label>事業所タイプ *</label>
                        <select
                          value={editingFacilityData.type || ''}
                          onChange={(e) => setEditingFacilityData({
                            ...editingFacilityData,
                            type: e.target.value
                          })}
                        >
                          {facilityTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>住所 *</label>
                        <input
                          type="text"
                          value={editingFacilityData.address || ''}
                          onChange={(e) => setEditingFacilityData({
                            ...editingFacilityData,
                            address: e.target.value
                          })}
                          placeholder="住所"
                        />
                      </div>
                      <div className="form-group">
                        <label>電話番号</label>
                        <input
                          type="text"
                          value={editingFacilityData.phone || ''}
                          onChange={(e) => setEditingFacilityData({
                            ...editingFacilityData,
                            phone: e.target.value
                          })}
                          placeholder="電話番号"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-section">
                    <div className="section-header">
                      <h4>担当者情報</h4>
                      <button 
                        type="button"
                        className="add-contact-btn"
                        onClick={addContactFieldToEdit}
                      >
                        + 担当者を追加
                      </button>
                    </div>
                    
                    {editingFacilityData.contacts && editingFacilityData.contacts.map((contact, index) => (
                      <div key={index} className="contact-edit-item">
                        <div className="contact-inputs">
                          <input
                            type="text"
                            placeholder="担当者名"
                            value={contact.name || ''}
                            onChange={(e) => updateContactInEdit(index, 'name', e.target.value)}
                          />
                          <input
                            type="email"
                            placeholder="メールアドレス"
                            value={contact.email || ''}
                            onChange={(e) => updateContactInEdit(index, 'email', e.target.value)}
                          />
                          {editingFacilityData.contacts.length > 1 && (
                            <button 
                              type="button"
                              className="remove-contact-btn"
                              onClick={() => removeContactFieldFromEdit(index)}
                            >
                              削除
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="form-section">
                    <h4>拠点情報</h4>
                    <div className="locations-summary">
                      <p>拠点数: {selectedFacility.locations.length}拠点</p>
                      <div className="locations-list">
                        {selectedFacility.locations.map(location => (
                          <div key={location.id} className="location-summary-item">
                            <span className="location-name">{location.name}</span>
                            <span className="location-stats">
                              👨‍🏫 {location.teacherCount}人 / 👥 {location.studentCount}/{location.maxStudents}人
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="form-actions">
                    <button 
                      className="save-btn"
                      onClick={handleSaveFacility}
                    >
                      保存
                    </button>
                    <button 
                      className="cancel-btn"
                      onClick={handleCancelFacilityEdit}
                    >
                      キャンセル
                    </button>
                  </div>
                </div>
              ) : (
                // 詳細表示（現在は編集モードのみ）
                <div className="detail-view">
                  <p>詳細表示モードは現在実装中です。</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 拠点詳細モーダル */}
      {showLocationDetail && selectedLocation && (
        <div className="modal-overlay">
          <div className="location-detail-modal">
            <div className="modal-header">
              <h3>{selectedLocation.name} - 詳細情報</h3>
              <button 
                className="close-button"
                onClick={() => {
                  setShowLocationDetail(false);
                  setSelectedLocation(null);
                }}
              >
                ×
              </button>
            </div>
            
            <div className="detail-content">
              {/* 拠点基本情報 */}
              <div className="detail-section">
                <h4>📍 基本情報</h4>
                <div className="info-grid">
                  <div className="info-item">
                    <label>拠点名:</label>
                    <span>{selectedLocation.name}</span>
                  </div>
                  <div className="info-item">
                    <label>事業所:</label>
                    <span>{selectedLocation.facilityName}</span>
                  </div>
                  <div className="info-item">
                    <label>住所:</label>
                    <span>{selectedLocation.address}</span>
                  </div>
                  <div className="info-item">
                    <label>電話番号:</label>
                    <span>{selectedLocation.phone}</span>
                  </div>
                  <div className="info-item">
                    <label>最大生徒数:</label>
                    <span>{selectedLocation.maxStudents}名</span>
                  </div>
                  <div className="info-item">
                    <label>現在の生徒数:</label>
                    <span>{getStudentsByLocation(selectedLocation.id).length}名</span>
                  </div>
                </div>
              </div>

              {/* 生徒一覧 */}
              <div className="detail-section">
                <h4>👥 生徒一覧 ({getStudentsByLocation(selectedLocation.id).length}名)</h4>
                {getStudentsByLocation(selectedLocation.id).length > 0 ? (
                  <div className="students-table-container">
                    <table className="students-table">
                      <thead>
                        <tr>
                          <th>生徒名</th>
                          <th>メールアドレス</th>
                          <th>コース</th>
                          <th>担当指導員</th>
                          <th>進捗</th>
                          <th>ステータス</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getStudentsByLocation(selectedLocation.id).map(student => (
                          <tr key={student.id} className={`student-row ${student.status}`}>
                            <td className="student-name">{student.name}</td>
                            <td className="student-email">{student.email}</td>
                            <td className="student-course">{student.course}</td>
                            <td className="student-instructor">{student.instructor}</td>
                            <td className="student-progress">
                              <div className="progress-info">
                                <span>{student.progress}%</span>
                                <div className="progress-bar">
                                  <div 
                                    className="progress-fill"
                                    style={{ width: `${student.progress}%` }}
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="student-status">
                              <span className={`status-badge ${student.status}`}>
                                {student.status === 'active' ? 'アクティブ' : '非アクティブ'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="no-students">
                    <p>この拠点には現在生徒が登録されていません。</p>
                  </div>
                )}
              </div>

              {/* 統計情報 */}
              <div className="detail-section">
                <h4>📊 統計情報</h4>
                <div className="stats-row">
                  <div className="stat-item">
                    <span className="stat-label">稼働率:</span>
                    <span className="stat-value">
                      {Math.round((getStudentsByLocation(selectedLocation.id).length / selectedLocation.maxStudents) * 100)}%
                    </span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">アクティブ生徒:</span>
                    <span className="stat-value">
                      {getStudentsByLocation(selectedLocation.id).filter(s => s.status === 'active').length}名
                    </span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">平均進捗:</span>
                    <span className="stat-value">
                      {getStudentsByLocation(selectedLocation.id).length > 0 
                        ? Math.round(getStudentsByLocation(selectedLocation.id).reduce((sum, s) => sum + s.progress, 0) / getStudentsByLocation(selectedLocation.id).length)
                        : 0}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationManagement; 