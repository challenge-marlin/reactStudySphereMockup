import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomeSupportDailyRecordsPage.css';

const HomeSupportDailyRecordsPage = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [studentDailyInputs, setStudentDailyInputs] = useState({});
  const [instructorRecords, setInstructorRecords] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [studentPhotos, setStudentPhotos] = useState({});
  const [photoLoading, setPhotoLoading] = useState({});

  // 生徒データを取得
  useEffect(() => {
    const fetchStudents = () => {
      const mockStudents = [
        { 
          id: 'student001', 
          name: '末吉　元気', 
          email: 'sueyoshi@example.com', 
          class: 'ITリテラシー・AIの基本',
          instructorId: 'instructor001',
          instructorName: '佐藤指導員',
          locationId: 'location001',
          locationName: '東京本校',
          progress: 75,
          lastLogin: '2024-01-15',
          status: 'active',
          loginToken: 'f9Ul-7OlL-OPZE',
          joinDate: '2024-01-01',
          canStudyAtHome: true,
          tags: ['佐藤指導員', 'ITリテラシー・AIの基本', '東京本校', '中級者', '必修科目', '初級コース']
        },
        { 
          id: 'student003', 
          name: '田中花子', 
          email: 'tanaka.h@example.com', 
          class: 'SNS運用の基礎・画像生成編集',
          instructorId: 'instructor001',
          instructorName: '佐藤指導員',
          locationId: 'location001',
          locationName: '東京本校',
          progress: 60,
          lastLogin: '2024-01-14',
          status: 'active',
          loginToken: 'aBc3-Def6-GhI9',
          joinDate: '2024-01-02',
          canStudyAtHome: true,
          tags: ['佐藤指導員', 'SNS運用の基礎・画像生成編集', '東京本校', '中級者', '必修科目', '中級コース']
        },
        { 
          id: 'student005', 
          name: '山田一郎', 
          email: 'yamada.i@example.com', 
          class: 'LP制作(HTML・CSS)',
          instructorId: 'instructor004',
          instructorName: '山田指導員',
          locationId: 'location003',
          locationName: '新宿サテライト',
          progress: 90,
          lastLogin: '2024-01-15',
          status: 'active',
          loginToken: 'mNp2-Qrs5-Tuv8',
          joinDate: '2024-01-01',
          canStudyAtHome: true,
          tags: ['山田指導員', 'LP制作(HTML・CSS)', '新宿サテライト', '上級者', '必修科目', '中級コース']
        },
        { 
          id: 'student006', 
          name: '佐藤美咲', 
          email: 'sato.m@example.com', 
          class: 'SNS管理代行・LP制作案件対応',
          instructorId: 'instructor003',
          instructorName: '鈴木指導員',
          locationId: 'location002',
          locationName: '大阪支校',
          progress: 80,
          lastLogin: '2024-01-14',
          status: 'active',
          loginToken: 'jKl3-Mno6-Pqr9',
          joinDate: '2024-01-02',
          canStudyAtHome: true,
          tags: ['鈴木指導員', 'SNS管理代行・LP制作案件対応', '大阪支校', '上級者', '必修科目', '上級コース']
        },
        { 
          id: 'student008', 
          name: '伊藤麻衣', 
          email: 'ito.m@example.com', 
          class: 'SNS管理代行・LP制作案件対応',
          instructorId: 'instructor002',
          instructorName: '田中指導員',
          locationId: 'location001',
          locationName: '東京本校',
          progress: 95,
          lastLogin: '2024-01-15',
          status: 'active',
          loginToken: 'bCd5-Efg8-Hij1',
          joinDate: '2023-12-15',
          canStudyAtHome: true,
          tags: ['田中指導員', 'SNS管理代行・LP制作案件対応', '東京本校', '上級者', '優秀', '必修科目', '上級コース']
        }
      ];

      // 現在の指導員の拠点内の在宅学習可能な生徒のみをフィルタリング
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      const filteredStudents = mockStudents.filter(student => 
        student.canStudyAtHome && 
        (currentUser.role === 'admin' || 
         student.instructorId === currentUser.id || 
         student.locationId === currentUser.locationId)
      );

      setStudents(filteredStudents);
      setFilteredStudents(filteredStudents);

      // 利用可能なタグを抽出
      const allTags = new Set();
      filteredStudents.forEach(student => {
        if (student.tags) {
          student.tags.forEach(tag => allTags.add(tag));
        }
      });
      setAvailableTags(Array.from(allTags).sort());
    };

    fetchStudents();
  }, []);

  // 選択された日付のデータを初期化
  useEffect(() => {
    const initialDailyInputs = {};
    const initialInstructorRecords = {};

    students.forEach(student => {
      // 生徒の事前入力データ（朝の時点での入力）
      initialDailyInputs[student.id] = {
        date: selectedDate,
        temperature: '36.2',
        healthCondition: 'good', // good, normal, bad
        healthNotes: '体調は良好です。',
        plannedWork: `${student.class}の学習を進めます。`,
        actualWork: '学習を継続し、新しい内容について理解を深めました。',
        thoughts: '学習が順調に進んでいます。',
        nextGoal: '次回はより高度な内容に挑戦したいと思います。'
      };

      // 指導員の記録データ
      initialInstructorRecords[student.id] = {
        date: selectedDate,
        startTime: '10:00',
        endTime: '16:00',
        supportMethod: '電話',
        workContent: '',
        supportContent: '',
        healthStatus: ''
      };
    });

    setStudentDailyInputs(initialDailyInputs);
    setInstructorRecords(initialInstructorRecords);
  }, [students, selectedDate]);

  // AIアシスト機能
  const generateAIAssist = (field, studentId) => {
    const student = students.find(s => s.id === studentId);
    const dailyInput = studentDailyInputs[studentId] || {};
    
    if (!student || !dailyInput.healthCondition) {
      return 'データが準備できていません。';
    }
    
    let suggestion = '';
    
    switch (field) {
      case 'workContent':
        suggestion = `・${dailyInput.actualWork || '作業内容を確認'}\n・${student.class}の学習を継続\n・作業効率の向上を図る`;
        break;
      case 'supportContent':
        suggestion = `・9:00　利用者から作業開始の連絡。体調確認（体温${dailyInput.temperature || '--'}℃）\n・12:00　午前中の作業進捗を確認。${dailyInput.actualWork || '作業内容を確認'}\n・15:00　作業終了の確認。次回目標：${dailyInput.nextGoal || '目標を設定'}`;
        break;
      case 'healthStatus':
        const healthText = dailyInput.healthCondition === 'good' ? '良好' : 
                          dailyInput.healthCondition === 'normal' ? '普通' : '悪い';
        suggestion = `・体温${dailyInput.temperature || '--'}℃、体調は${healthText}\n・${dailyInput.healthNotes || '体調備考なし'}\n・適度な休憩を取るよう助言`;
        break;
      default:
        suggestion = 'AIアシストの提案を生成中...';
    }
    
    return suggestion;
  };

  // 記録を保存
  const saveRecord = (studentId) => {
    const record = instructorRecords[studentId] || {};
    const student = students.find(s => s.id === studentId);
    
    if (!student) {
      alert('生徒情報が見つかりません。');
      return;
    }
    
    if (!record.workContent || !record.supportContent || !record.healthStatus) {
      alert('必須項目を入力してください。');
      return;
    }
    
    alert(`${student.name}の記録を保存しました。`);
    // 実際の実装ではAPIに保存
  };

  // 記録フィールドを更新
  const updateRecord = (studentId, field, value) => {
    setInstructorRecords(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId] || {},
        [field]: value
      }
    }));
  };

  // 生徒名でフィルタリング
  const filterStudents = (searchTerm) => {
    setSearchTerm(searchTerm);
    applyFilters(searchTerm, selectedTags);
  };

  // タグフィルタリング
  const handleTagToggle = (tag) => {
    const newSelectedTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    
    setSelectedTags(newSelectedTags);
    applyFilters(searchTerm, newSelectedTags);
  };

  // フィルターを適用
  const applyFilters = (search, tags) => {
    let filtered = students;

    // テキスト検索
    if (search) {
      filtered = filtered.filter(student => 
        student.name.toLowerCase().includes(search.toLowerCase()) ||
        student.class.toLowerCase().includes(search.toLowerCase())
      );
    }

    // タグフィルター
    if (tags.length > 0) {
      filtered = filtered.filter(student => 
        tags.every(tag => student.tags && student.tags.includes(tag))
      );
    }

    setFilteredStudents(filtered);
  };

  // 日付を変更
  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  // S3から写真を取得する処理
  const fetchStudentPhotos = async (studentId, date) => {
    setPhotoLoading(prev => ({ ...prev, [studentId]: true }));
    
    try {
      // モックデータ - 実際の実装ではS3から取得
      const mockPhotos = [
        {
          id: 'photo1',
          url: 'https://via.placeholder.com/400x300/007bff/ffffff?text=作業写真1',
          timestamp: `${date}T09:00:00`,
          description: '作業開始時の様子'
        },
        {
          id: 'photo2',
          url: 'https://via.placeholder.com/400x300/28a745/ffffff?text=作業写真2',
          timestamp: `${date}T09:30:00`,
          description: '作業中の様子'
        },
        {
          id: 'photo3',
          url: 'https://via.placeholder.com/400x300/ffc107/ffffff?text=作業写真3',
          timestamp: `${date}T10:00:00`,
          description: '作業進捗確認'
        },
        {
          id: 'photo4',
          url: 'https://via.placeholder.com/400x300/dc3545/ffffff?text=作業写真4',
          timestamp: `${date}T10:30:00`,
          description: '休憩時間'
        }
      ];

      // 実際の実装では以下のようなAPIコールを行う
      // const response = await fetch(`/api/photos/${studentId}?date=${date}`);
      // const photos = await response.json();
      
      setStudentPhotos(prev => ({
        ...prev,
        [studentId]: mockPhotos
      }));
    } catch (error) {
      console.error('写真の取得に失敗しました:', error);
      setStudentPhotos(prev => ({
        ...prev,
        [studentId]: []
      }));
    } finally {
      setPhotoLoading(prev => ({ ...prev, [studentId]: false }));
    }
  };

  // 日付変更時に写真を再取得
  useEffect(() => {
    students.forEach(student => {
      fetchStudentPhotos(student.id, selectedDate);
    });
  }, [selectedDate, students]);

  return (
    <div className="home-support-daily-records">
      <div className="page-header">
        <div className="header-content">
          <h1>📝 日々の就労支援記録管理</h1>
          <p>在宅学習者の日々の記録を管理し、AIアシスト機能で効率的に入力できます。</p>
        </div>
        <button 
          className="back-btn"
          onClick={() => navigate('/instructor/dashboard')}
        >
          ← ダッシュボードに戻る
        </button>
      </div>

      <div className="search-filters">
        <div className="filter-group">
          <label>日付選択</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => handleDateChange(e.target.value)}
            className="date-input"
          />
        </div>
        <div className="filter-group">
          <label>生徒・コース検索</label>
          <input
            type="text"
            placeholder="生徒名またはコース名で検索..."
            value={searchTerm}
            onChange={(e) => filterStudents(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-group">
          <label>クイック日付</label>
          <div className="quick-dates">
            <button onClick={() => handleDateChange(new Date().toISOString().split('T')[0])}>
              今日
            </button>
            <button onClick={() => {
              const yesterday = new Date();
              yesterday.setDate(yesterday.getDate() - 1);
              handleDateChange(yesterday.toISOString().split('T')[0]);
            }}>
              昨日
            </button>
            <button onClick={() => {
              const lastWeek = new Date();
              lastWeek.setDate(lastWeek.getDate() - 7);
              handleDateChange(lastWeek.toISOString().split('T')[0]);
            }}>
              1週間前
            </button>
          </div>
        </div>
        <div className="filter-group tag-filter-group">
          <label>タグフィルター</label>
          <div className="tag-filters">
            {availableTags.map(tag => (
              <button
                key={tag}
                className={`tag-filter-btn ${selectedTags.includes(tag) ? 'active' : ''}`}
                onClick={() => handleTagToggle(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
          {selectedTags.length > 0 && (
            <div className="selected-tags">
              <span>選択中: </span>
              {selectedTags.map(tag => (
                <span key={tag} className="selected-tag">
                  {tag}
                  <button onClick={() => handleTagToggle(tag)}>×</button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="records-container">
        {filteredStudents.length === 0 ? (
          <div className="no-results">
            <p>該当する生徒が見つかりません。</p>
          </div>
        ) : (
          filteredStudents.map(student => {
            const dailyInput = studentDailyInputs[student.id] || {};
            const record = instructorRecords[student.id] || {};
            
            // データが初期化されていない場合はスキップ
            if (!dailyInput.healthCondition) {
              return null;
            }
            
            return (
              <div key={student.id} className="student-record-card">
                <div className="student-header">
                  <div className="student-info">
                    <h4>{student.name}</h4>
                    <span className="course">{student.class}</span>
                    <div className="student-tags">
                      {student.tags?.map((tag, index) => (
                        <span key={index} className="tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="student-status">
                    <span className={`health-badge ${dailyInput.healthCondition}`}>
                      {dailyInput.healthCondition === 'good' ? '良好' : 
                       dailyInput.healthCondition === 'normal' ? '普通' : '悪い'}
                    </span>
                    <span className="temperature">{dailyInput.temperature}℃</span>
                  </div>
                </div>

                {/* 写真セクション */}
                <div className="photo-section">
                  <h5>📸 作業内容写真（30分ごと）</h5>
                  <div className="photo-container">
                    {photoLoading[student.id] ? (
                      <div className="photo-loading">
                        <div className="loading-spinner"></div>
                        <span>写真を読み込み中...</span>
                      </div>
                    ) : studentPhotos[student.id] && studentPhotos[student.id].length > 0 ? (
                      <div className="photo-gallery">
                        {studentPhotos[student.id].map((photo) => (
                          <div key={photo.id} className="photo-item">
                            <img 
                              src={photo.url} 
                              alt={photo.description}
                              className="student-photo"
                            />
                            <div className="photo-info">
                              <span className="photo-time">
                                {new Date(photo.timestamp).toLocaleTimeString('ja-JP', {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </span>
                              <span className="photo-description">{photo.description}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="no-photos">
                        <span className="no-photos-icon">📷</span>
                        <span className="no-photos-text">この日の写真はありません</span>
                        <span className="no-photos-subtext">専用アプリから30分ごとに自動取得されます</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="student-input-summary">
                  <div className="input-section">
                    <h5>利用者入力（開始時）</h5>
                    <div className="input-grid">
                      <div className="input-item">
                        <label>体調備考:</label>
                        <span>{dailyInput.healthNotes}</span>
                      </div>
                      <div className="input-item">
                        <label>本日の作業内容:</label>
                        <span>{dailyInput.plannedWork}</span>
                      </div>
                    </div>
                  </div>
                  <div className="input-section">
                    <h5>利用者入力（終了時）</h5>
                    <div className="input-grid">
                      <div className="input-item">
                        <label>作業実績:</label>
                        <span>{dailyInput.actualWork}</span>
                      </div>
                      <div className="input-item">
                        <label>感想・次回目標:</label>
                        <span>{dailyInput.thoughts} / {dailyInput.nextGoal}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="instructor-record-form">
                  <h5>指導員記録</h5>
                  <div className="form-row">
                    <div className="form-group">
                      <label>開始時間</label>
                      <input
                        type="time"
                        value={record.startTime}
                        onChange={(e) => updateRecord(student.id, 'startTime', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>終了時間</label>
                      <input
                        type="time"
                        value={record.endTime}
                        onChange={(e) => updateRecord(student.id, 'endTime', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>支援方法</label>
                      <select
                        value={record.supportMethod}
                        onChange={(e) => updateRecord(student.id, 'supportMethod', e.target.value)}
                      >
                        <option value="電話">電話</option>
                        <option value="訪問">訪問</option>
                        <option value="その他">その他</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label>
                      作業・訓練内容
                      <button 
                        className="ai-assist-btn"
                        onClick={() => updateRecord(student.id, 'workContent', generateAIAssist('workContent', student.id))}
                        title="AIアシスト"
                      >
                        🤖 AI
                      </button>
                    </label>
                    <textarea
                      value={record.workContent}
                      onChange={(e) => updateRecord(student.id, 'workContent', e.target.value)}
                      placeholder="実施した作業や訓練の内容を記載してください"
                      rows="3"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>
                      支援内容（1日2回以上）
                      <button 
                        className="ai-assist-btn"
                        onClick={() => updateRecord(student.id, 'supportContent', generateAIAssist('supportContent', student.id))}
                        title="AIアシスト"
                      >
                        🤖 AI
                      </button>
                    </label>
                    <textarea
                      value={record.supportContent}
                      onChange={(e) => updateRecord(student.id, 'supportContent', e.target.value)}
                      placeholder="具体的な支援内容を時間順に記載してください"
                      rows="4"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>
                      対象者の心身の状況及びそれに対する助言の内容
                      <button 
                        className="ai-assist-btn"
                        onClick={() => updateRecord(student.id, 'healthStatus', generateAIAssist('healthStatus', student.id))}
                        title="AIアシスト"
                      >
                        🤖 AI
                      </button>
                    </label>
                    <textarea
                      value={record.healthStatus}
                      onChange={(e) => updateRecord(student.id, 'healthStatus', e.target.value)}
                      placeholder="体調や精神状態、それに対する助言を記載してください"
                      rows="3"
                    />
                  </div>
                  
                  <div className="record-actions">
                    <button 
                      className="pdf-btn"
                      onClick={() => alert('PDF出力機能（モックアップ）')}
                      title="PDF出力"
                    >
                      📄 PDF出力
                    </button>
                    <button 
                      className="save-btn"
                      onClick={() => saveRecord(student.id)}
                    >
                      💾 {student.name}の記録を保存
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default HomeSupportDailyRecordsPage; 