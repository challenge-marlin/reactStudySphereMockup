import React, { useState } from 'react';
import './CurriculumPathManagement.css';

const CurriculumPathManagement = () => {
  // カリキュラムパスのサンプルデータ
  const [curriculumPaths, setCurriculumPaths] = useState([
    {
      id: 'path001',
      name: 'デジタルマーケティングコース',
      description: 'SNS運用からLP制作まで、デジタルマーケティングの実践スキルを習得',
      targetAudience: 'マーケティング職志望者',
      duration: '12ヶ月',
      totalCourses: 4,
      courses: [
        {
          courseId: 'course002', // ITリテラシー・AIの基本
          order: 1,
          isRequired: true,
          estimatedDuration: '3ヶ月'
        },
        {
          courseId: 'course003', // SNS運用の基礎・画像生成編集
          order: 2,
          isRequired: true,
          estimatedDuration: '6ヶ月'
        },
        {
          courseId: 'course004', // LP制作(HTML・CSS)
          order: 3,
          isRequired: true,
          estimatedDuration: '3ヶ月'
        },
        {
          courseId: 'course005', // SNS管理代行・LP制作案件対応
          order: 4,
          isRequired: true,
          estimatedDuration: '3ヶ月'
        }
      ],
      status: 'active',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-15'
    },
    {
      id: 'path002',
      name: 'オフィススキルアップコース',
      description: '基本的なオフィスソフトの操作から実務活用まで',
      targetAudience: '事務職志望者・社会人',
      duration: '3ヶ月',
      totalCourses: 1,
      courses: [
        {
          courseId: 'course001', // オフィスソフトの操作・文書作成
          order: 1,
          isRequired: true,
          estimatedDuration: '3ヶ月'
        }
      ],
      status: 'active',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-10'
    },
    {
      id: 'path003',
      name: 'Web制作フルコース',
      description: 'Web制作の基礎から実践まで、包括的なスキルを習得',
      targetAudience: 'Web制作職志望者',
      duration: '9ヶ月',
      totalCourses: 3,
      courses: [
        {
          courseId: 'course002', // ITリテラシー・AIの基本
          order: 1,
          isRequired: true,
          estimatedDuration: '3ヶ月'
        },
        {
          courseId: 'course004', // LP制作(HTML・CSS)
          order: 2,
          isRequired: true,
          estimatedDuration: '3ヶ月'
        },
        {
          courseId: 'course005', // SNS管理代行・LP制作案件対応
          order: 3,
          isRequired: true,
          estimatedDuration: '3ヶ月'
        }
      ],
      status: 'draft',
      createdAt: '2024-01-05',
      updatedAt: '2024-01-12'
    }
  ]);

  // 利用可能なコースデータ（実際はpropsで渡される）
  const availableCourses = [
    { id: 'course001', title: 'オフィスソフトの操作・文書作成', category: '選択科目' },
    { id: 'course002', title: 'ITリテラシー・AIの基本', category: '必修科目' },
    { id: 'course003', title: 'SNS運用の基礎・画像生成編集', category: '必修科目' },
    { id: 'course004', title: 'LP制作(HTML・CSS)', category: '必修科目' },
    { id: 'course005', title: 'SNS管理代行・LP制作案件対応', category: '必修科目' }
  ];

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPath, setSelectedPath] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // コース名を取得
  const getCourseName = (courseId) => {
    const course = availableCourses.find(c => c.id === courseId);
    return course ? course.title : courseId;
  };

  // フィルタリング機能
  const getFilteredPaths = () => {
    let filtered = curriculumPaths;

    if (searchTerm) {
      filtered = filtered.filter(path =>
        path.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        path.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        path.targetAudience.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(path => path.status === statusFilter);
    }

    return filtered;
  };

  // パス編集処理
  const handleEditPath = (path) => {
    setSelectedPath(path);
    setShowEditModal(true);
  };

  // パス削除処理
  const handleDeletePath = (pathId) => {
    if (window.confirm('このカリキュラムパスを削除してもよろしいですか？\n※削除すると元に戻せません。')) {
      setCurriculumPaths(curriculumPaths.filter(path => path.id !== pathId));
      alert('カリキュラムパスが削除されました。');
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

  return (
    <div className="curriculum-path-management">
      <div className="path-header">
        <h2>🎯 カリキュラムパス管理</h2>
        <p>複数のカリキュラムパスを作成・管理し、受講者の学習経路を最適化できます。</p>
      </div>

      {/* フィルターセクション */}
      <div className="filters-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="パス名、説明、対象者で検索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filters-row">
          <div className="filter-group">
            <label>ステータス:</label>
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">全てのステータス</option>
              <option value="active">公開中</option>
              <option value="inactive">非公開</option>
              <option value="draft">下書き</option>
            </select>
          </div>

          <button 
            className="clear-filters"
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('all');
            }}
          >
            フィルタークリア
          </button>
        </div>

        <div className="results-summary">
          表示中: {getFilteredPaths().length}パス / 全{curriculumPaths.length}パス
        </div>
      </div>

      {/* パス統計サマリー */}
      <div className="path-stats">
        <div className="stat-card">
          <h3>総パス数</h3>
          <p className="stat-number">{curriculumPaths.length}</p>
          <small>全カテゴリ</small>
        </div>
        <div className="stat-card">
          <h3>公開中パス</h3>
          <p className="stat-number">{curriculumPaths.filter(p => p.status === 'active').length}</p>
          <small>アクティブ</small>
        </div>
        <div className="stat-card">
          <h3>平均コース数</h3>
          <p className="stat-number">
            {Math.round(curriculumPaths.reduce((sum, p) => sum + p.totalCourses, 0) / curriculumPaths.length)}
          </p>
          <small>パスあたり</small>
        </div>
        <div className="stat-card">
          <h3>最長期間</h3>
          <p className="stat-number">
            {Math.max(...curriculumPaths.map(p => parseInt(p.duration)))}
          </p>
          <small>ヶ月</small>
        </div>
      </div>

      {/* パス一覧テーブル */}
      <div className="paths-table-container">
        <table className="paths-table">
          <thead>
            <tr>
              <th>パス名</th>
              <th>説明</th>
              <th>対象者</th>
              <th>期間</th>
              <th>コース数</th>
              <th>コース構成</th>
              <th>ステータス</th>
              <th>最終更新</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {getFilteredPaths().map(path => (
              <tr key={path.id} className={`path-row ${path.status}`}>
                <td className="path-title">
                  <div className="title-info">
                    <strong>{path.name}</strong>
                  </div>
                </td>
                <td className="path-description">
                  <div className="description-text">
                    {path.description.length > 100 
                      ? `${path.description.substring(0, 100)}...` 
                      : path.description
                    }
                  </div>
                </td>
                <td className="path-audience">
                  <span className="audience-badge">{path.targetAudience}</span>
                </td>
                <td className="path-duration">{path.duration}</td>
                <td className="path-courses">{path.totalCourses}コース</td>
                <td className="path-course-list">
                  <div className="course-sequence">
                    {path.courses.map((course, index) => (
                      <div key={course.courseId} className="course-item">
                        <span className="course-order">{course.order}</span>
                        <span className="course-name">{getCourseName(course.courseId)}</span>
                        {index < path.courses.length - 1 && <span className="arrow">→</span>}
                      </div>
                    ))}
                  </div>
                </td>
                <td className="path-status">
                  <span className={`status-badge ${path.status}`}>
                    {getStatusLabel(path.status)}
                  </span>
                </td>
                <td className="path-updated">{path.updatedAt}</td>
                <td className="path-actions">
                  <div className="action-buttons">
                    <button 
                      className="edit-btn"
                      onClick={() => handleEditPath(path)}
                      title="編集"
                    >
                      ✏️
                    </button>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDeletePath(path.id)}
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

        {getFilteredPaths().length === 0 && (
          <div className="no-results">
            <p>条件に合致するカリキュラムパスが見つかりません。</p>
          </div>
        )}
      </div>

      {/* パス追加ボタン */}
      <div className="add-path-section">
        <button 
          className="add-path-button"
          onClick={() => setShowAddModal(true)}
        >
          + 新しいカリキュラムパスを作成
        </button>
      </div>

      {/* パス編集モーダル */}
      {showEditModal && selectedPath && (
        <PathEditModal
          path={selectedPath}
          availableCourses={availableCourses}
          onUpdate={(updatedPath) => {
            setCurriculumPaths(curriculumPaths.map(path => 
              path.id === updatedPath.id ? updatedPath : path
            ));
            setShowEditModal(false);
            setSelectedPath(null);
          }}
          onClose={() => {
            setShowEditModal(false);
            setSelectedPath(null);
          }}
        />
      )}
    </div>
  );
};

// パス編集モーダルコンポーネント
const PathEditModal = ({ path, availableCourses, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({
    name: path.name,
    description: path.description,
    targetAudience: path.targetAudience,
    duration: path.duration,
    status: path.status,
    courses: [...path.courses]
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCourseOrderChange = (index, newOrder) => {
    const updatedCourses = [...formData.courses];
    updatedCourses[index].order = parseInt(newOrder);
    updatedCourses.sort((a, b) => a.order - b.order);
    
    setFormData(prev => ({
      ...prev,
      courses: updatedCourses
    }));
  };

  const handleAddCourse = () => {
    const newCourse = {
      courseId: '',
      order: formData.courses.length + 1,
      isRequired: true,
      estimatedDuration: '3ヶ月'
    };
    
    setFormData(prev => ({
      ...prev,
      courses: [...prev.courses, newCourse]
    }));
  };

  const handleRemoveCourse = (index) => {
    const updatedCourses = formData.courses.filter((_, i) => i !== index);
    // 順序を再調整
    updatedCourses.forEach((course, i) => {
      course.order = i + 1;
    });
    
    setFormData(prev => ({
      ...prev,
      courses: updatedCourses
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedPath = {
      ...path,
      ...formData,
      totalCourses: formData.courses.length,
      updatedAt: new Date().toISOString().split('T')[0]
    };
    onUpdate(updatedPath);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content path-edit-modal">
        <div className="modal-header">
          <h3>カリキュラムパス編集: {path.name}</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="path-form">
          <div className="form-row">
            <div className="form-group">
              <label>パス名 *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>対象者 *</label>
              <input
                type="text"
                name="targetAudience"
                value={formData.targetAudience}
                onChange={handleInputChange}
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
              <label>期間 *</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                placeholder="例: 12ヶ月"
                required
              />
            </div>
            <div className="form-group">
              <label>ステータス *</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                required
              >
                <option value="active">公開中</option>
                <option value="inactive">非公開</option>
                <option value="draft">下書き</option>
              </select>
            </div>
          </div>

          <div className="courses-section">
            <div className="section-header">
              <h4>コース構成</h4>
              <button type="button" onClick={handleAddCourse} className="add-course-btn">
                + コースを追加
              </button>
            </div>

            {formData.courses.map((course, index) => (
              <div key={index} className="course-config">
                <div className="course-config-row">
                  <div className="form-group">
                    <label>順序</label>
                    <input
                      type="number"
                      value={course.order}
                      onChange={(e) => handleCourseOrderChange(index, e.target.value)}
                      min="1"
                      className="order-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>コース</label>
                    <select
                      value={course.courseId}
                      onChange={(e) => {
                        const updatedCourses = [...formData.courses];
                        updatedCourses[index].courseId = e.target.value;
                        setFormData(prev => ({ ...prev, courses: updatedCourses }));
                      }}
                      required
                    >
                      <option value="">コースを選択</option>
                      {availableCourses.map(c => (
                        <option key={c.id} value={c.id}>
                          {c.title} ({c.category})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>期間</label>
                    <input
                      type="text"
                      value={course.estimatedDuration}
                      onChange={(e) => {
                        const updatedCourses = [...formData.courses];
                        updatedCourses[index].estimatedDuration = e.target.value;
                        setFormData(prev => ({ ...prev, courses: updatedCourses }));
                      }}
                      placeholder="例: 3ヶ月"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveCourse(index)}
                    className="remove-course-btn"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
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

export default CurriculumPathManagement; 