import React, { useState } from 'react';

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
  const [editingFacilityData, setEditingFacilityData] = useState(null);
  const [selectedFacility, setSelectedFacility] = useState(null);

  // ソート機能
  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // フィルタリングとソート
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
        case 'totalTeachers':
          aValue = a.locations.reduce((sum, loc) => sum + loc.teacherCount, 0);
          bValue = b.locations.reduce((sum, loc) => sum + loc.teacherCount, 0);
          break;
        case 'totalStudents':
          aValue = a.locations.reduce((sum, loc) => sum + loc.studentCount, 0);
          bValue = b.locations.reduce((sum, loc) => sum + loc.studentCount, 0);
          break;
        default:
          aValue = a.name;
          bValue = b.name;
      }

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  };

  // 拠点詳細表示
  const handleViewLocationDetail = (location) => {
    // TODO: 拠点詳細モーダルを実装
    console.log('拠点詳細:', location);
  };

  // 拠点の生徒データを取得（モック）
  const getStudentsByLocation = (locationId) => {
    // モックデータ
    return [
      { id: 1, name: '田中花子', email: 'tanaka@example.com', course: 'ITリテラシー・AIの基本', instructor: '佐藤指導員', progress: 75, status: 'active' },
      { id: 2, name: '山田太郎', email: 'yamada@example.com', course: 'SNS運用の基礎・画像生成編集', instructor: '田中指導員', progress: 45, status: 'active' },
      { id: 3, name: '鈴木一郎', email: 'suzuki@example.com', course: 'LP制作(HTML・CSS)', instructor: '山田指導員', progress: 90, status: 'inactive' }
    ];
  };

  // 事業所タイプ管理
  const handleAddFacilityType = () => {
    if (newFacilityType.trim() && !facilityTypes.includes(newFacilityType.trim())) {
      setFacilityTypes([...facilityTypes, newFacilityType.trim()]);
      setNewFacilityType('');
    }
  };

  const handleRemoveFacilityType = (typeToRemove) => {
    setFacilityTypes(facilityTypes.filter(type => type !== typeToRemove));
  };

  // 連絡先フィールド管理
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
    const updatedContacts = [...newFacility.contacts];
    updatedContacts[index][field] = value;
    setNewFacility({
      ...newFacility,
      contacts: updatedContacts
    });
  };

  // 事業所追加
  const handleAddFacility = () => {
    const newFacilityData = {
      id: `facility${Date.now()}`,
      ...newFacility,
      locations: []
    };
    setFacilities([...facilities, newFacilityData]);
    setNewFacility({
      name: '',
      type: '就労移行支援事業所',
      address: '',
      phone: '',
      contacts: [{ name: '', email: '' }]
    });
    setShowFacilityForm(false);
  };

  // 拠点追加
  const handleAddLocation = () => {
    const facility = facilities.find(f => f.id === newLocation.facilityId);
    if (facility) {
      const newLocationData = {
        id: `location${Date.now()}`,
        name: newLocation.name,
        address: newLocation.address,
        teacherCount: 0,
        studentCount: 0,
        maxStudents: 20
      };
      
      const updatedFacilities = facilities.map(f => 
        f.id === newLocation.facilityId 
          ? { ...f, locations: [...f.locations, newLocationData] }
          : f
      );
      
      setFacilities(updatedFacilities);
      setNewLocation({ facilityId: '', name: '', address: '' });
      setShowLocationForm(false);
    }
  };

  // 拠点編集
  const handleEditLocation = (facilityId, locationId) => {
    const facility = facilities.find(f => f.id === facilityId);
    const location = facility?.locations.find(l => l.id === locationId);
    if (location) {
      setEditingLocation({ facilityId, locationId });
      setEditValues({
        name: location.name,
        address: location.address,
        teacherCount: location.teacherCount,
        studentCount: location.studentCount,
        maxStudents: location.maxStudents
      });
    }
  };

  const handleSaveLocation = (facilityId, locationId) => {
    const updatedFacilities = facilities.map(facility => {
      if (facility.id === facilityId) {
        return {
          ...facility,
          locations: facility.locations.map(location => 
            location.id === locationId 
              ? { ...location, ...editValues }
              : location
          )
        };
      }
      return facility;
    });
    
    setFacilities(updatedFacilities);
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
  };

  // 事業所編集
  const handleEditFacility = (facilityId) => {
    const facility = facilities.find(f => f.id === facilityId);
    if (facility) {
      setEditingFacilityData({ ...facility });
      setSelectedFacility(facility);
    }
  };

  const handleSaveFacility = () => {
    if (editingFacilityData) {
      setFacilities(prev => prev.map(f => 
        f.id === editingFacilityData.id ? editingFacilityData : f
      ));
      setEditingFacilityData(null);
      setSelectedFacility(null);
    }
  };

  const handleCancelFacilityEdit = () => {
    setEditingFacilityData(null);
    setSelectedFacility(null);
  };

  const addContactFieldToEdit = () => {
    if (editingFacilityData) {
      setEditingFacilityData({
        ...editingFacilityData,
        contacts: [...editingFacilityData.contacts, { name: '', email: '' }]
      });
    }
  };

  const removeContactFieldFromEdit = (index) => {
    if (editingFacilityData && editingFacilityData.contacts.length > 1) {
      const newContacts = editingFacilityData.contacts.filter((_, i) => i !== index);
      setEditingFacilityData({
        ...editingFacilityData,
        contacts: newContacts
      });
    }
  };

  const updateContactInEdit = (index, field, value) => {
    if (editingFacilityData) {
      const newContacts = [...editingFacilityData.contacts];
      newContacts[index] = { ...newContacts[index], [field]: value };
      setEditingFacilityData({
        ...editingFacilityData,
        contacts: newContacts
      });
    }
  };

  // 拠点削除
  const handleDeleteLocation = (locationId) => {
    if (window.confirm('この拠点を削除しますか？')) {
      setFacilities(prev => prev.map(facility => ({
        ...facility,
        locations: facility.locations.filter(location => location.id !== locationId)
      })));
    }
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
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-red-800 mb-6">拠点・事業所管理</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white border-2 border-red-200 rounded-xl p-6 text-center transition-all duration-300 hover:border-red-400 hover:shadow-lg">
            <h3 className="text-red-800 font-medium mb-2">事業所数</h3>
            <p className="text-3xl font-bold text-red-600">{facilities.length}</p>
          </div>
          <div className="bg-white border-2 border-red-200 rounded-xl p-6 text-center transition-all duration-300 hover:border-red-400 hover:shadow-lg">
            <h3 className="text-red-800 font-medium mb-2">拠点数</h3>
            <p className="text-3xl font-bold text-red-600">{totalLocations}</p>
          </div>
          <div className="bg-white border-2 border-red-200 rounded-xl p-6 text-center transition-all duration-300 hover:border-red-400 hover:shadow-lg">
            <h3 className="text-red-800 font-medium mb-2">総指導員数</h3>
            <p className="text-3xl font-bold text-red-600">{totalTeachers}</p>
          </div>
          <div className="bg-white border-2 border-red-200 rounded-xl p-6 text-center transition-all duration-300 hover:border-red-400 hover:shadow-lg">
            <h3 className="text-red-800 font-medium mb-2">総生徒数</h3>
            <p className="text-3xl font-bold text-red-600">{totalStudents} / {totalMaxStudents}</p>
            <small className="text-red-600">使用率: {Math.round((totalStudents/totalMaxStudents)*100)}%</small>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-8">
        <button 
          className="bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300 hover:bg-red-700"
          onClick={() => setShowFacilityForm(true)}
        >
          + 事業所を追加
        </button>
        <button 
          className="bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300 hover:bg-red-700"
          onClick={() => setShowLocationForm(true)}
        >
          + 拠点を追加
        </button>
        <button 
          className="bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300 hover:bg-gray-700"
          onClick={() => setShowTypeManagement(true)}
        >
          📝 事業所タイプ管理
        </button>
      </div>

      {/* 検索・フィルタセクション */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="事業所名または住所で検索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border-2 border-red-200 rounded-lg focus:outline-none focus:border-red-400 transition-colors duration-300"
          />
        </div>
        <div className="md:w-64">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full px-4 py-3 border-2 border-red-200 rounded-lg focus:outline-none focus:border-red-400 transition-colors duration-300"
          >
            <option value="all">すべての事業所タイプ</option>
            {facilityTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 事業所リスト（テーブル形式） */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-red-50">
              <tr>
                <th 
                  className="px-6 py-4 text-left text-sm font-semibold text-red-800 cursor-pointer hover:bg-red-100 transition-colors duration-200"
                  onClick={() => handleSort('name')}
                >
                  事業所名
                  {sortConfig.key === 'name' && (
                    <span className="ml-1">
                      {sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}
                    </span>
                  )}
                </th>
                <th 
                  className="px-6 py-4 text-left text-sm font-semibold text-red-800 cursor-pointer hover:bg-red-100 transition-colors duration-200"
                  onClick={() => handleSort('type')}
                >
                  事業所タイプ
                  {sortConfig.key === 'type' && (
                    <span className="ml-1">
                      {sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}
                    </span>
                  )}
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-red-800">住所</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-red-800">電話番号</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-red-800">担当者</th>
                <th 
                  className="px-6 py-4 text-left text-sm font-semibold text-red-800 cursor-pointer hover:bg-red-100 transition-colors duration-200"
                  onClick={() => handleSort('locationCount')}
                >
                  拠点数
                  {sortConfig.key === 'locationCount' && (
                    <span className="ml-1">
                      {sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}
                    </span>
                  )}
                </th>
                <th 
                  className="px-6 py-4 text-left text-sm font-semibold text-red-800 cursor-pointer hover:bg-red-100 transition-colors duration-200"
                  onClick={() => handleSort('totalTeachers')}
                >
                  総指導員数
                  {sortConfig.key === 'totalTeachers' && (
                    <span className="ml-1">
                      {sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}
                    </span>
                  )}
                </th>
                <th 
                  className="px-6 py-4 text-left text-sm font-semibold text-red-800 cursor-pointer hover:bg-red-100 transition-colors duration-200"
                  onClick={() => handleSort('totalStudents')}
                >
                  総生徒数
                  {sortConfig.key === 'totalStudents' && (
                    <span className="ml-1">
                      {sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}
                    </span>
                  )}
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-red-800">操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredFacilities.map(facility => {
                const totalFacilityTeachers = facility.locations.reduce((sum, loc) => sum + loc.teacherCount, 0);
                const totalFacilityStudents = facility.locations.reduce((sum, loc) => sum + loc.studentCount, 0);
                const totalFacilityMaxStudents = facility.locations.reduce((sum, loc) => sum + (loc.maxStudents || 20), 0);
                
                return (
                  <tr key={facility.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4">
                      <strong className="text-gray-800">{facility.name}</strong>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                        {facility.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      📍 {facility.address}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      📞 {facility.phone}
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        {facility.contacts && facility.contacts.length > 0 ? (
                          facility.contacts.map((contact, index) => (
                            <div key={index} className="text-sm">
                              <span className="font-medium text-gray-800">{contact.name}</span>
                              <span className="text-gray-600 ml-2">📧 {contact.email}</span>
                            </div>
                          ))
                        ) : (
                          <span className="text-gray-500 text-sm">担当者なし</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {facility.locations.length}拠点
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {totalFacilityTeachers}人
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <span className={`font-medium ${totalFacilityStudents > totalFacilityMaxStudents ? 'text-red-600' : 'text-gray-800'}`}>
                          {totalFacilityStudents}/{totalFacilityMaxStudents}
                        </span>
                        <div className="w-20 h-2 bg-gray-200 rounded-full mt-1 overflow-hidden">
                          <div 
                            className="h-full bg-green-500 transition-all duration-300"
                            style={{ width: `${Math.min((totalFacilityStudents / totalFacilityMaxStudents) * 100, 100)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button 
                          className="bg-blue-500 text-white px-3 py-1 rounded text-sm font-medium transition-colors duration-300 hover:bg-blue-600"
                          onClick={() => handleViewFacilityDetail(facility)}
                        >
                          詳細
                        </button>
                        <button 
                          className="bg-green-500 text-white px-3 py-1 rounded text-sm font-medium transition-colors duration-300 hover:bg-green-600"
                          onClick={() => handleEditFacility(facility.id)}
                        >
                          編集
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {filteredFacilities.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">検索条件に一致する事業所が見つかりませんでした。</p>
        </div>
      )}

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
      {editingLocation && (
        <div className="modal-overlay">
          <div className="facility-detail-modal">
            <div className="modal-header">
              <h3>{editingLocation.facilityId === editingLocation.locationId ? '事業所編集' : '拠点編集'} - {editingLocation.facilityName}</h3>
              <button 
                className="close-button"
                onClick={handleCancelEdit}
              >
                ×
              </button>
            </div>
            
            <div className="detail-content">
              {editingLocation.facilityId === editingLocation.locationId ? (
                // 事業所編集フォーム
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
                // 拠点編集フォーム
                <div className="edit-form">
                  <div className="form-section">
                    <h4>拠点基本情報</h4>
                    <div className="form-row">
                      <div className="form-group">
                        <label>拠点名 *</label>
                        <input
                          type="text"
                          value={editValues.name || ''}
                          onChange={(e) => setEditValues({ ...editValues, name: e.target.value })}
                          placeholder="拠点名"
                        />
                      </div>
                      <div className="form-group">
                        <label>住所 *</label>
                        <input
                          type="text"
                          value={editValues.address || ''}
                          onChange={(e) => setEditValues({ ...editValues, address: e.target.value })}
                          placeholder="住所"
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>最大生徒数 *</label>
                        <input
                          type="number"
                          value={editValues.maxStudents || ''}
                          onChange={(e) => setEditValues({ ...editValues, maxStudents: parseInt(e.target.value) || 0 })}
                          placeholder="最大生徒数"
                        />
                      </div>
                      <div className="form-group">
                        <label>現在の生徒数 *</label>
                        <input
                          type="number"
                          value={editValues.studentCount || ''}
                          onChange={(e) => setEditValues({ ...editValues, studentCount: parseInt(e.target.value) || 0 })}
                          placeholder="現在の生徒数"
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>現在の指導員数 *</label>
                        <input
                          type="number"
                          value={editValues.teacherCount || ''}
                          onChange={(e) => setEditValues({ ...editValues, teacherCount: parseInt(e.target.value) || 0 })}
                          placeholder="現在の指導員数"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-actions">
                    <button 
                      className="save-btn"
                      onClick={() => handleSaveLocation(editingLocation.facilityId, editingLocation.locationId)}
                    >
                      保存
                    </button>
                    <button 
                      className="cancel-btn"
                      onClick={handleCancelEdit}
                    >
                      キャンセル
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 拠点詳細モーダル */}
      {editingLocation && (
        <div className="modal-overlay">
          <div className="location-detail-modal">
            <div className="modal-header">
              <h3>{editingLocation.facilityName} - 詳細情報</h3>
              <button 
                className="close-button"
                onClick={() => {
                  setEditingLocation(null);
                  setEditValues({});
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
                    <span>{editingLocation.name}</span>
                  </div>
                  <div className="info-item">
                    <label>事業所:</label>
                    <span>{editingLocation.facilityName}</span>
                  </div>
                  <div className="info-item">
                    <label>住所:</label>
                    <span>{editingLocation.address}</span>
                  </div>
                  <div className="info-item">
                    <label>電話番号:</label>
                    <span>{editingLocation.phone}</span>
                  </div>
                  <div className="info-item">
                    <label>最大生徒数:</label>
                    <span>{editingLocation.maxStudents}名</span>
                  </div>
                  <div className="info-item">
                    <label>現在の生徒数:</label>
                    <span>{getStudentsByLocation(editingLocation.locationId).length}名</span>
                  </div>
                </div>
              </div>

              {/* 生徒一覧 */}
              <div className="detail-section">
                <h4>👥 生徒一覧 ({getStudentsByLocation(editingLocation.locationId).length}名)</h4>
                {getStudentsByLocation(editingLocation.locationId).length > 0 ? (
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
                        {getStudentsByLocation(editingLocation.locationId).map(student => (
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
                      {Math.round((getStudentsByLocation(editingLocation.locationId).length / editingLocation.maxStudents) * 100)}%
                    </span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">アクティブ生徒:</span>
                    <span className="stat-value">
                      {getStudentsByLocation(editingLocation.locationId).filter(s => s.status === 'active').length}名
                    </span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">平均進捗:</span>
                    <span className="stat-value">
                      {getStudentsByLocation(editingLocation.locationId).length > 0 
                        ? Math.round(getStudentsByLocation(editingLocation.locationId).reduce((sum, s) => sum + s.progress, 0) / getStudentsByLocation(editingLocation.locationId).length)
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