import React, { useState } from 'react';
import './CourseManagement.css';

const CourseManagement = () => {
  const [courses, setCourses] = useState([
    {
      id: 'course001',
      title: 'オフィスソフトの操作・文書作成',
      category: '選択科目',
      description: 'Word、Excel、PowerPointの基本操作を学び、実務で使える文書作成スキルを習得',
      duration: '3ヶ月',
      difficulty: 'beginner',
      totalLessons: 6,
      enrolledStudents: 12,
      completionRate: 85,
      status: 'active',
      createdDate: '2023-06-01',
      lastUpdated: '2024-01-10',
      tags: ['Word', 'Excel', 'PowerPoint', '文書作成', '選択科目'],
      isElective: true, // 選択科目フラグ
      prerequisites: [], // 前提コースなし
      order: 0 // 受講順序（選択科目は0）
    },
    {
      id: 'course002',
      title: 'ITリテラシー・AIの基本',
      category: '必修科目',
      description: 'ITの基礎知識とAIの基本概念を学び、デジタル社会で活躍するための土台を構築',
      duration: '3ヶ月',
      difficulty: 'beginner',
      totalLessons: 6,
      enrolledStudents: 15,
      completionRate: 78,
      status: 'active',
      createdDate: '2023-08-01',
      lastUpdated: '2024-01-12',
      tags: ['IT基礎', 'AI', 'Windows11', 'インターネット', '必修科目'],
      isElective: false,
      prerequisites: [],
      order: 1
    },
    {
      id: 'course003',
      title: 'SNS運用の基礎・画像生成編集',
      category: '必修科目',
      description: 'SNSマーケティングの基礎と画像編集技術を学び、効果的なコンテンツ作成スキルを習得',
      duration: '6ヶ月',
      difficulty: 'intermediate',
      totalLessons: 12,
      enrolledStudents: 8,
      completionRate: 65,
      status: 'active',
      createdDate: '2023-09-01',
      lastUpdated: '2024-01-08',
      tags: ['SNS', 'マーケティング', 'Canva', 'Recraft', 'AI画像生成'],
      isElective: false,
      prerequisites: ['course002'], // ITリテラシーが前提
      order: 2
    },
    {
      id: 'course004',
      title: 'LP制作(HTML・CSS)',
      category: '必修科目',
      description: 'HTML・CSSを使ったランディングページ制作技術を学び、Web制作の実践スキルを習得',
      duration: '3ヶ月',
      difficulty: 'intermediate',
      totalLessons: 12,
      enrolledStudents: 6,
      completionRate: 72,
      status: 'active',
      createdDate: '2023-10-01',
      lastUpdated: '2024-01-05',
      tags: ['HTML', 'CSS', 'LP制作', 'レスポンシブ', 'Web制作'],
      isElective: false,
      prerequisites: ['course003'], // SNS運用が前提
      order: 3
    },
    {
      id: 'course005',
      title: 'SNS管理代行・LP制作案件対応',
      category: '必修科目',
      description: '実際の案件を想定したSNS管理代行とLP制作の実践的なスキルを習得',
      duration: '3ヶ月',
      difficulty: 'advanced',
      totalLessons: 12,
      enrolledStudents: 4,
      completionRate: 45,
      status: 'active',
      createdDate: '2023-11-01',
      lastUpdated: '2024-01-03',
      tags: ['案件対応', 'プロジェクト管理', 'クライアント対応', '実践'],
      isElective: false,
      prerequisites: ['course004'], // LP制作が前提
      order: 4
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const [newCourse, setNewCourse] = useState({
    title: '',
    category: '',
    description: '',
    duration: '',
    difficulty: 'beginner',
    totalLessons: '',
    tags: '',
    isElective: false,
    prerequisites: [],
    order: 1
  });

  // カテゴリ選択肢
  const categories = [
    '選択科目',
    '必修科目'
  ];

  // 前提コースの選択肢を取得
  const getPrerequisiteOptions = (currentCourseId) => {
    return courses
      .filter(course => course.id !== currentCourseId && !course.isElective)
      .sort((a, b) => a.order - b.order);
  };

  // コース名を取得
  const getCourseName = (courseId) => {
    const course = courses.find(c => c.id === courseId);
    return course ? course.title : courseId;
  };



  // フィルタリング機能
  const getFilteredCourses = () => {
    let filtered = courses;

    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(course => course.category === categoryFilter);
    }

    if (difficultyFilter !== 'all') {
      filtered = filtered.filter(course => course.difficulty === difficultyFilter);
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(course => course.status === statusFilter);
    }

    return filtered;
  };

  // コース追加処理
  const handleAddCourse = (e) => {
    e.preventDefault();
    
    const courseData = {
      id: `course${String(courses.length + 1).padStart(3, '0')}`,
      ...newCourse,
      enrolledStudents: 0,
      completionRate: 0,
      status: 'draft',
      createdDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
      tags: newCourse.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };

    const updatedCourses = [...courses, courseData];
    setCourses(updatedCourses);
    
    // ローカルストレージにコースデータを保存
    localStorage.setItem('courses', JSON.stringify(updatedCourses));
    
    setNewCourse({
      title: '',
      category: '',
      description: '',
      duration: '',
      difficulty: 'beginner',
      totalLessons: '',
      tags: '',
      isElective: false,
      prerequisites: [],
      order: 1
    });
    setShowAddForm(false);
    alert('新しいコースが作成されました！');
  };

  // コース編集処理
  const handleEditCourse = (course) => {
    setSelectedCourse(course);
    setShowEditModal(true);
  };

  // レッスン管理画面への遷移
  const handleManageLessons = (courseId) => {
    // レッスン管理タブに遷移する処理
    // 実際の実装では、親コンポーネントから渡された関数を使用
    alert(`${courseId}のレッスン管理画面に遷移します。レッスン管理タブをご確認ください。`);
  };

  // コース削除処理
  const handleDeleteCourse = (courseId) => {
    if (window.confirm('このコースを削除してもよろしいですか？\n※削除すると元に戻せません。')) {
      const updatedCourses = courses.filter(course => course.id !== courseId);
      setCourses(updatedCourses);
      
      // ローカルストレージにコースデータを保存
      localStorage.setItem('courses', JSON.stringify(updatedCourses));
      
      alert('コースが削除されました。');
    }
  };

  // コースステータス切り替え
  const toggleCourseStatus = (courseId) => {
    const updatedCourses = courses.map(course => 
      course.id === courseId 
        ? { 
            ...course, 
            status: course.status === 'active' ? 'inactive' : 'active',
            lastUpdated: new Date().toISOString().split('T')[0]
          }
        : course
    );
    setCourses(updatedCourses);
    
    // ローカルストレージにコースデータを保存
    localStorage.setItem('courses', JSON.stringify(updatedCourses));
  };

  // 難易度表示用の関数
  const getDifficultyLabel = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return '初級';
      case 'intermediate': return '中級';
      case 'advanced': return '上級';
      default: return difficulty;
    }
  };

  // ステータス表示用の関数
  const getStatusLabel = (status) => {
    switch (status) {
      case 'active': return '公開中';
      case 'inactive': return '非公開';
      case 'draft': return '下書き';
      default: return status;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="course-management">
      <div className="management-header">
        <h2>コース管理</h2>
        <button 
          className="add-course-button"
          onClick={() => setShowAddForm(true)}
        >
          + 新しいコースを作成
        </button>
      </div>

      {/* フィルターセクション */}
      <div className="filters-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="コース名、説明、タグで検索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filters-row">
          <div className="filter-group">
            <label>カテゴリ:</label>
            <select 
              value={categoryFilter} 
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">全てのカテゴリ</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>難易度:</label>
            <select 
              value={difficultyFilter} 
              onChange={(e) => setDifficultyFilter(e.target.value)}
            >
              <option value="all">全ての難易度</option>
              <option value="beginner">初級</option>
              <option value="intermediate">中級</option>
              <option value="advanced">上級</option>
            </select>
          </div>

          <div className="filter-group">
            <label>ステータス:</label>
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">全て</option>
              <option value="active">公開中</option>
              <option value="inactive">非公開</option>
              <option value="draft">下書き</option>
            </select>
          </div>

          <button 
            className="clear-filters"
            onClick={() => {
              setSearchTerm('');
              setCategoryFilter('all');
              setDifficultyFilter('all');
              setStatusFilter('all');
            }}
          >
            フィルタークリア
          </button>
        </div>

        <div className="results-summary">
          表示中: {getFilteredCourses().length}コース / 全{courses.length}コース
        </div>
      </div>



      {/* コース統計サマリー */}
      <div className="course-stats">
        <div className="stat-card">
          <h3>総コース数</h3>
          <p className="stat-number">{courses.length}</p>
          <small>全カテゴリ</small>
        </div>
        <div className="stat-card">
          <h3>公開中コース</h3>
          <p className="stat-number">{courses.filter(c => c.status === 'active').length}</p>
          <small>アクティブ</small>
        </div>
        <div className="stat-card">
          <h3>必修科目</h3>
          <p className="stat-number">{courses.filter(c => !c.isElective).length}</p>
          <small>必須コース</small>
        </div>
        <div className="stat-card">
          <h3>選択科目</h3>
          <p className="stat-number">{courses.filter(c => c.isElective).length}</p>
          <small>選択コース</small>
        </div>
      </div>

      {/* コース一覧テーブル */}
      <div className="courses-table-container">
        <table className="courses-table">
          <thead>
            <tr>
              <th>コース名</th>
              <th>カテゴリ</th>
              <th>難易度</th>
              <th>期間</th>
              <th>レッスン数</th>
              <th>前提コース</th>
              <th>ステータス</th>
              <th>最終更新</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {getFilteredCourses().map(course => (
              <tr key={course.id} className={`course-row ${course.status}`}>
                <td className="course-title">
                  <div className="title-info">
                    <strong>{course.title}</strong>
                    <small>{course.description}</small>
                  </div>
                </td>
                <td className="course-category">
                  <span className="category-badge">{course.category}</span>
                </td>
                <td className="course-difficulty">
                  <span className={`difficulty-badge ${course.difficulty}`}>
                    {getDifficultyLabel(course.difficulty)}
                  </span>
                </td>
                <td className="course-duration">{course.duration}</td>
                <td className="course-lessons">{course.totalLessons}レッスン</td>
                <td className="course-prerequisites">
                  {course.prerequisites.length > 0 ? (
                    <div className="prerequisites-list">
                      {course.prerequisites.map((prerequisite, index) => (
                        <div key={prerequisite} className="prerequisite-item">
                          <span className="prerequisite-order">{index + 1}</span>
                          <span className="prerequisite-name">{getCourseName(prerequisite)}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className="no-prerequisites">なし</span>
                  )}
                </td>
                <td className="course-status">
                  <span className={`status-badge ${course.status}`}>
                    {getStatusLabel(course.status)}
                  </span>
                </td>
                <td className="course-updated">{course.lastUpdated}</td>
                <td className="course-actions">
                  <div className="action-buttons">
                    <button 
                      className="edit-btn"
                      onClick={() => handleEditCourse(course)}
                      title="編集"
                    >
                      ✏️
                    </button>
                    <button 
                      className="lessons-btn"
                      onClick={() => handleManageLessons(course.id)}
                      title="レッスン管理"
                    >
                      📖
                    </button>
                    <button 
                      className={`status-toggle ${course.status}`}
                      onClick={() => toggleCourseStatus(course.id)}
                      title={course.status === 'active' ? '非公開にする' : '公開する'}
                    >
                      {course.status === 'active' ? '🔒' : '🔓'}
                    </button>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDeleteCourse(course.id)}
                      title="削除"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {getFilteredCourses().length === 0 && (
          <div className="no-results">
            <p>条件に合致するコースが見つかりません。</p>
          </div>
        )}
      </div>

      {/* コース追加フォーム */}
      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>新しいコースを作成</h3>
              <button 
                className="close-btn"
                onClick={() => setShowAddForm(false)}
              >
                ×
              </button>
            </div>
            
            <form className="course-form" onSubmit={handleAddCourse}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="title">コース名 <span className="required">*</span></label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={newCourse.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="category">カテゴリ <span className="required">*</span></label>
                  <select
                    id="category"
                    name="category"
                    value={newCourse.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">選択してください</option>
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="duration">期間 <span className="required">*</span></label>
                  <input
                    type="text"
                    id="duration"
                    name="duration"
                    value={newCourse.duration}
                    onChange={handleInputChange}
                    placeholder="例: 3ヶ月"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="description">説明 <span className="required">*</span></label>
                <textarea
                  id="description"
                  name="description"
                  value={newCourse.description}
                  onChange={handleInputChange}
                  rows="3"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="difficulty">難易度 <span className="required">*</span></label>
                  <select
                    id="difficulty"
                    name="difficulty"
                    value={newCourse.difficulty}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="beginner">初級</option>
                    <option value="intermediate">中級</option>
                    <option value="advanced">上級</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="totalLessons">レッスン数 <span className="required">*</span></label>
                  <input
                    type="number"
                    id="totalLessons"
                    name="totalLessons"
                    value={newCourse.totalLessons}
                    onChange={handleInputChange}
                    min="1"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="tags">タグ（カンマ区切り）</label>
                  <input
                    type="text"
                    id="tags"
                    name="tags"
                    value={newCourse.tags}
                    onChange={handleInputChange}
                    placeholder="例: HTML, CSS, JavaScript"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="isElective">コース種別 <span className="required">*</span></label>
                <select
                  id="isElective"
                  name="isElective"
                  value={newCourse.isElective}
                  onChange={(e) => setNewCourse(prev => ({
                    ...prev,
                    isElective: e.target.value === 'true',
                    prerequisites: e.target.value === 'true' ? [] : prev.prerequisites,
                    order: e.target.value === 'true' ? 0 : prev.order
                  }))}
                  required
                >
                  <option value={false}>必修科目</option>
                  <option value={true}>選択科目</option>
                </select>
              </div>

              {!newCourse.isElective && (
                <div className="course-sequence-section">
                  <h4>📚 受講順序の設定</h4>
                  <p className="section-description">
                    このコースの受講順序と前提コースを視覚的に設定できます。
                  </p>
                  
                  <div className="sequence-builder">
                    <div className="available-courses">
                      <h5>利用可能なコース</h5>
                      <div className="course-list">
                        {getPrerequisiteOptions(newCourse.id).map(course => (
                          <div 
                            key={course.id}
                            className={`course-item ${newCourse.prerequisites.includes(course.id) ? 'selected' : ''}`}
                            onClick={() => {
                              const isSelected = newCourse.prerequisites.includes(course.id);
                              const updatedPrerequisites = isSelected
                                ? newCourse.prerequisites.filter(id => id !== course.id)
                                : [...newCourse.prerequisites, course.id];
                              
                              setNewCourse(prev => ({
                                ...prev,
                                prerequisites: updatedPrerequisites,
                                order: updatedPrerequisites.length + 1
                              }));
                            }}
                          >
                            <div className="course-info">
                              <span className="course-title">{course.title}</span>
                              <span className="course-category">{course.category}</span>
                            </div>
                            <div className="course-actions">
                              {newCourse.prerequisites.includes(course.id) ? (
                                <span className="selected-indicator">✓</span>
                              ) : (
                                <span className="add-indicator">+</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="sequence-display">
                      <h5>受講順序</h5>
                      <div className="sequence-list">
                        {newCourse.prerequisites.length === 0 ? (
                          <div className="no-prerequisites">
                            <p>前提コースが設定されていません</p>
                            <small>このコースは最初に受講できます</small>
                          </div>
                        ) : (
                          newCourse.prerequisites.map((courseId, index) => {
                            const course = getPrerequisiteOptions(newCourse.id).find(c => c.id === courseId);
                            return (
                              <div key={courseId} className="sequence-item">
                                <div className="sequence-order">{index + 1}</div>
                                <div className="sequence-course">
                                  <span className="course-title">{course?.title}</span>
                                  <span className="course-category">{course?.category}</span>
                                </div>
                                <button
                                  type="button"
                                  className="remove-sequence-btn"
                                  onClick={() => {
                                    const updatedPrerequisites = newCourse.prerequisites.filter(id => id !== courseId);
                                    setNewCourse(prev => ({
                                      ...prev,
                                      prerequisites: updatedPrerequisites,
                                      order: updatedPrerequisites.length + 1
                                    }));
                                  }}
                                >
                                  ×
                                </button>
                              </div>
                            );
                          })
                        )}
                      </div>
                      
                      <div className="current-course">
                        <div className="sequence-order current">{newCourse.prerequisites.length + 1}</div>
                        <div className="sequence-course current">
                          <span className="course-title">{newCourse.title || '新しいコース'}</span>
                          <span className="course-category">{newCourse.category || '未設定'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}



              <div className="form-actions">
                <button type="submit" className="submit-button">
                  コースを作成
                </button>
                <button 
                  type="button" 
                  className="cancel-button"
                  onClick={() => setShowAddForm(false)}
                >
                  キャンセル
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* コース編集モーダル */}
      {showEditModal && selectedCourse && (
        <CourseEditModal
          course={selectedCourse}
          courses={courses}
                  onUpdate={(updatedCourse) => {
          const updatedCourses = courses.map(course => 
            course.id === updatedCourse.id ? updatedCourse : course
          );
          setCourses(updatedCourses);
          
          // ローカルストレージにコースデータを保存
          localStorage.setItem('courses', JSON.stringify(updatedCourses));
          
          setShowEditModal(false);
          setSelectedCourse(null);
        }}
          onClose={() => {
            setShowEditModal(false);
            setSelectedCourse(null);
          }}
          onManageLessons={handleManageLessons}
        />
      )}
    </div>
  );
};

// コース編集モーダルコンポーネント
const CourseEditModal = ({ course, courses, onUpdate, onClose, onManageLessons }) => {
  const [formData, setFormData] = useState({
    title: course.title,
    category: course.category,
    description: course.description,
    duration: course.duration,
    difficulty: course.difficulty,
    totalLessons: course.totalLessons,
    tags: course.tags.join(', '),
    isElective: course.isElective,
    prerequisites: course.prerequisites,
    order: course.order
  });

  const categories = ['選択科目', '必修科目'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedCourse = {
      ...course,
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    onUpdate(updatedCourse);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>コース編集: {course.title}</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="course-form">
          <div className="form-row">
            <div className="form-group">
              <label>コース名 *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>カテゴリ *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>期間 *</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                placeholder="例: 3ヶ月"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>説明 *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="3"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>難易度 *</label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleInputChange}
                required
              >
                <option value="beginner">初級</option>
                <option value="intermediate">中級</option>
                <option value="advanced">上級</option>
              </select>
            </div>
            <div className="form-group">
              <label>レッスン数 *</label>
              <input
                type="number"
                name="totalLessons"
                value={formData.totalLessons}
                onChange={handleInputChange}
                min="1"
                required
              />
            </div>
            <div className="form-group">
              <label>タグ</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="カンマ区切りで入力"
              />
            </div>
          </div>



          <div className="form-group">
            <label>選択科目</label>
            <div className="checkbox-group">
              <input
                type="checkbox"
                name="isElective"
                checked={formData.isElective}
                onChange={(e) => setFormData(prev => ({ ...prev, isElective: e.target.checked }))}
              />
              <label>選択科目として設定</label>
            </div>
          </div>

          {!formData.isElective && (
            <div className="course-sequence-section">
              <h4>📚 受講順序の設定</h4>
              <p className="section-description">
                このコースの受講順序と前提コースを視覚的に設定できます。
              </p>
              
              <div className="sequence-builder">
                <div className="available-courses">
                  <h5>利用可能なコース</h5>
                  <div className="course-list">
                    {courses
                      .filter(c => c.id !== course.id && !c.isElective)
                      .sort((a, b) => a.order - b.order)
                      .map(c => (
                        <div 
                          key={c.id}
                          className={`course-item ${formData.prerequisites.includes(c.id) ? 'selected' : ''}`}
                          onClick={() => {
                            const isSelected = formData.prerequisites.includes(c.id);
                            const updatedPrerequisites = isSelected
                              ? formData.prerequisites.filter(id => id !== c.id)
                              : [...formData.prerequisites, c.id];
                            
                            setFormData(prev => ({
                              ...prev,
                              prerequisites: updatedPrerequisites,
                              order: updatedPrerequisites.length + 1
                            }));
                          }}
                        >
                          <div className="course-info">
                            <span className="course-title">{c.title}</span>
                            <span className="course-category">{c.category}</span>
                          </div>
                          <div className="course-actions">
                            {formData.prerequisites.includes(c.id) ? (
                              <span className="selected-indicator">✓</span>
                            ) : (
                              <span className="add-indicator">+</span>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="sequence-display">
                  <h5>受講順序</h5>
                  <div className="sequence-list">
                    {formData.prerequisites.length === 0 ? (
                      <div className="no-prerequisites">
                        <p>前提コースが設定されていません</p>
                        <small>このコースは最初に受講できます</small>
                      </div>
                    ) : (
                      formData.prerequisites.map((courseId, index) => {
                        const course = courses.find(c => c.id === courseId);
                        return (
                          <div key={courseId} className="sequence-item">
                            <div className="sequence-order">{index + 1}</div>
                            <div className="sequence-course">
                              <span className="course-title">{course?.title}</span>
                              <span className="course-category">{course?.category}</span>
                            </div>
                            <button
                              type="button"
                              className="remove-sequence-btn"
                              onClick={() => {
                                const updatedPrerequisites = formData.prerequisites.filter(id => id !== courseId);
                                setFormData(prev => ({
                                  ...prev,
                                  prerequisites: updatedPrerequisites,
                                  order: updatedPrerequisites.length + 1
                                }));
                              }}
                            >
                              ×
                            </button>
                          </div>
                        );
                      })
                    )}
                  </div>
                  
                  <div className="current-course">
                    <div className="sequence-order current">{formData.prerequisites.length + 1}</div>
                    <div className="sequence-course current">
                      <span className="course-title">{formData.title}</span>
                      <span className="course-category">{formData.category}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="lesson-management-notice">
            <div className="notice-content">
              <h4>📖 レッスン管理について</h4>
              <p>このコースのレッスン詳細は、別画面で管理します。</p>
              <p>レッスンの追加・編集・削除、PDF・動画ファイルのアップロード、動画の分割設定などが可能です。</p>
              <button 
                type="button" 
                className="manage-lessons-btn"
                onClick={() => onManageLessons(course.id)}
              >
                📖 レッスン管理画面を開く
              </button>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="cancel-btn">
              キャンセル
            </button>
            <button type="submit" className="save-btn">
              保存
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseManagement; 