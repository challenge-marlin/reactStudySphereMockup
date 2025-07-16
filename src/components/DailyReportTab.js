import React, { useState, useEffect } from 'react';
import './DailyReportTab.css';

const DailyReportTab = ({ student, reports = [], onSave, onEdit, onDelete, onDownloadPDF }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingReport, setEditingReport] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredReports, setFilteredReports] = useState([]);
  const [studentPhotos, setStudentPhotos] = useState([]);
  const [photoLoading, setPhotoLoading] = useState(false);
  const [instructorRecord, setInstructorRecord] = useState({
    startTime: '10:00',
    endTime: '16:00',
    supportMethod: '電話',
    workContent: '',
    supportContent: '',
    healthStatus: ''
  });

  // 日次報告書の初期データ構造（HomeSupportDailyRecordsPageの本人入力部分を基に作成）
  const initialDailyReport = {
    date: selectedDate,
    temperature: '36.2',
    healthCondition: 'good', // good, normal, bad
    healthNotes: '体調は良好です。',
    plannedWork: student ? `${student.class}の学習を進めます。` : '',
    actualWork: '学習を継続し、新しい内容について理解を深めました。',
    thoughts: '学習が順調に進んでいます。',
    nextGoal: '次回はより高度な内容に挑戦したいと思います。'
  };

  // 写真を取得する処理
  const fetchStudentPhotos = async (date) => {
    setPhotoLoading(true);
    
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
      // const response = await fetch(`/api/photos/${student.id}?date=${date}`);
      // const photos = await response.json();
      
      setStudentPhotos(mockPhotos);
    } catch (error) {
      console.error('写真の取得に失敗しました:', error);
      setStudentPhotos([]);
    } finally {
      setPhotoLoading(false);
    }
  };

  // 日付変更時に写真を再取得
  useEffect(() => {
    if (student) {
      fetchStudentPhotos(selectedDate);
    }
  }, [selectedDate, student]);

  // 検索とフィルタリング
  useEffect(() => {
    let filtered = reports || [];
    
    if (searchTerm) {
      filtered = filtered.filter(report => 
        report.date.includes(searchTerm) ||
        (report.actualWork && report.actualWork.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (report.thoughts && report.thoughts.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (report.plannedWork && report.plannedWork.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    setFilteredReports(filtered);
  }, [reports, searchTerm]);

  // 日付変更時の処理
  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    const existingReport = (reports || []).find(r => r.date === newDate);
    
    if (existingReport) {
      setEditingReport(existingReport);
      setIsEditing(true);
    } else {
      setEditingReport({ ...initialDailyReport, date: newDate });
      setIsEditing(false);
    }
  };

  // 新規作成
  const handleCreateNew = () => {
    setEditingReport({ ...initialDailyReport, date: selectedDate });
    setIsEditing(true);
  };

  // 編集開始
  const handleStartEdit = (report) => {
    setEditingReport(report);
    setIsEditing(true);
  };

  // 保存
  const handleSave = () => {
    if (!editingReport) return;
    
    if (!editingReport.actualWork || !editingReport.thoughts) {
      alert('必須項目（作業実績、感想・次回目標）を入力してください。');
      return;
    }
    
    onSave(editingReport);
    setIsEditing(false);
    setEditingReport(null);
  };

  // キャンセル
  const handleCancel = () => {
    setIsEditing(false);
    setEditingReport(null);
  };

  // 削除
  const handleDelete = (reportId) => {
    if (window.confirm('この日次報告書を削除しますか？')) {
      onDelete(reportId);
    }
  };

  // AIアシスト機能
  const generateAIAssist = (field) => {
    const dailyInput = editingReport || initialDailyReport;
    
    if (!dailyInput.healthCondition) {
      return 'データが準備できていません。';
    }
    
    let suggestion = '';
    
    switch (field) {
      case 'workContent':
        suggestion = `・${dailyInput.actualWork || '作業内容を確認'}\n・${student?.class || 'コース'}の学習を継続\n・作業効率の向上を図る`;
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

  // 指導員記録を更新
  const updateInstructorRecord = (field, value) => {
    setInstructorRecord(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // 指導員記録を保存
  const saveInstructorRecord = () => {
    if (!instructorRecord.workContent || !instructorRecord.supportContent || !instructorRecord.healthStatus) {
      alert('必須項目を入力してください。');
      return;
    }
    
    alert('指導員記録を保存しました。');
    // 実際の実装ではAPIに保存
  };

  // 現在の日付の報告書を取得
  const currentReport = (reports || []).find(r => r.date === selectedDate);

  return (
    <div className="daily-report-tab">
      <div className="hs-tab-header">
        <h3>📝 日次報告書管理</h3>
        <div className="header-actions">
          <input
            type="text"
            placeholder="日付または内容で検索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button 
            className="hs-create-btn"
            onClick={handleCreateNew}
          >
            ➕ 新規作成
          </button>
        </div>
      </div>

      <div className="daily-report-content">
        {/* 生徒基本情報 */}
        {student && (
          <div className="student-info-card">
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
                <span className={`health-badge ${currentReport?.healthCondition || 'good'}`}>
                  {currentReport?.healthCondition === 'good' ? '良好' : 
                   currentReport?.healthCondition === 'normal' ? '普通' : '悪い'}
                </span>
                <span className="temperature">{currentReport?.temperature || '36.2'}℃</span>
              </div>
            </div>
          </div>
        )}

        {/* 日付選択とクイックアクセス */}
        <div className="date-selection">
          <div className="date-input-group">
            <label>日付選択:</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => handleDateChange(e.target.value)}
              className="date-input"
            />
          </div>
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

        {/* 写真セクション */}
        <div className="photo-section">
          <h5>📸 作業内容写真（30分ごと）</h5>
          <div className="photo-container">
            {photoLoading ? (
              <div className="photo-loading">
                <div className="loading-spinner"></div>
                <span>写真を読み込み中...</span>
              </div>
            ) : studentPhotos.length > 0 ? (
              <div className="photo-gallery">
                {studentPhotos.map((photo) => (
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

        {/* 編集フォームまたは表示 */}
        <div className="report-form-section">
          {isEditing ? (
            <div className="edit-form">
              <h4>{selectedDate} の日次報告書</h4>
              
              <div className="form-grid">
                <div className="form-group">
                  <label>体温</label>
                  <input
                    type="text"
                    value={editingReport.temperature}
                    onChange={(e) => setEditingReport(prev => ({ ...prev, temperature: e.target.value }))}
                    placeholder="例: 36.2"
                  />
                </div>
                
                <div className="form-group">
                  <label>体調</label>
                  <select
                    value={editingReport.healthCondition}
                    onChange={(e) => setEditingReport(prev => ({ ...prev, healthCondition: e.target.value }))}
                  >
                    <option value="good">良好</option>
                    <option value="normal">普通</option>
                    <option value="bad">悪い</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>体調備考</label>
                <textarea
                  value={editingReport.healthNotes}
                  onChange={(e) => setEditingReport(prev => ({ ...prev, healthNotes: e.target.value }))}
                  placeholder="体調についての詳細を記載してください"
                  rows="2"
                />
              </div>

              <div className="form-group">
                <label>本日の作業内容（予定）</label>
                <textarea
                  value={editingReport.plannedWork}
                  onChange={(e) => setEditingReport(prev => ({ ...prev, plannedWork: e.target.value }))}
                  placeholder="今日予定している作業内容を記載してください"
                  rows="2"
                />
              </div>

              <div className="form-group">
                <label>作業実績 *</label>
                <textarea
                  value={editingReport.actualWork}
                  onChange={(e) => setEditingReport(prev => ({ ...prev, actualWork: e.target.value }))}
                  placeholder="実際に行った作業内容を記載してください"
                  rows="3"
                  required
                />
              </div>

              <div className="form-group">
                <label>感想・次回目標 *</label>
                <textarea
                  value={editingReport.thoughts}
                  onChange={(e) => setEditingReport(prev => ({ ...prev, thoughts: e.target.value }))}
                  placeholder="今日の感想と次回の目標を記載してください"
                  rows="3"
                  required
                />
              </div>

              <div className="form-group">
                <label>次回の目標</label>
                <textarea
                  value={editingReport.nextGoal}
                  onChange={(e) => setEditingReport(prev => ({ ...prev, nextGoal: e.target.value }))}
                  placeholder="次回の具体的な目標を記載してください"
                  rows="2"
                />
              </div>

              <div className="form-actions">
                <button className="save-btn" onClick={handleSave}>
                  💾 保存
                </button>
                <button className="cancel-btn" onClick={handleCancel}>
                  キャンセル
                </button>
              </div>
            </div>
          ) : (
            <div className="report-display">
              {currentReport ? (
                <div className="report-card">
                  <div className="report-header">
                    <h4>{currentReport.date} の日次報告書</h4>
                    <div className="report-actions">
                      <button 
                        className="edit-btn"
                        onClick={() => handleStartEdit(currentReport)}
                      >
                        ✏️ 編集
                      </button>
                      <button 
                        className="delete-btn"
                        onClick={() => handleDelete(currentReport.id || currentReport.date)}
                      >
                        🗑️ 削除
                      </button>
                      <button 
                        className="pdf-btn"
                        onClick={() => onDownloadPDF && onDownloadPDF(currentReport)}
                        title="PDFでダウンロード"
                      >
                        📄 PDF
                      </button>
                    </div>
                  </div>
                  
                  <div className="report-content">
                    <div className="report-section">
                      <label>体温:</label>
                      <span>{currentReport.temperature}℃</span>
                    </div>
                    <div className="report-section">
                      <label>体調:</label>
                      <span className={`health-badge ${currentReport.healthCondition}`}>
                        {currentReport.healthCondition === 'good' ? '良好' : 
                         currentReport.healthCondition === 'normal' ? '普通' : '悪い'}
                      </span>
                    </div>
                    {currentReport.healthNotes && (
                      <div className="report-section">
                        <label>体調備考:</label>
                        <span>{currentReport.healthNotes}</span>
                      </div>
                    )}
                    <div className="report-section">
                      <label>本日の作業内容（予定）:</label>
                      <span>{currentReport.plannedWork}</span>
                    </div>
                    <div className="report-section">
                      <label>作業実績:</label>
                      <span>{currentReport.actualWork}</span>
                    </div>
                    <div className="report-section">
                      <label>感想・次回目標:</label>
                      <span>{currentReport.thoughts}</span>
                    </div>
                    {currentReport.nextGoal && (
                      <div className="report-section">
                        <label>次回の目標:</label>
                        <span>{currentReport.nextGoal}</span>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="no-report">
                  <p>{selectedDate} の日次報告書はまだ作成されていません。</p>
                  <button 
                    className="create-btn"
                    onClick={handleCreateNew}
                  >
                    📝 新規作成
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 指導員記録セクション */}
        <div className="instructor-record-form">
          <h5>指導員記録</h5>
          <div className="form-row">
            <div className="form-group">
              <label>開始時間</label>
              <input
                type="time"
                value={instructorRecord.startTime}
                onChange={(e) => updateInstructorRecord('startTime', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>終了時間</label>
              <input
                type="time"
                value={instructorRecord.endTime}
                onChange={(e) => updateInstructorRecord('endTime', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>支援方法</label>
              <select
                value={instructorRecord.supportMethod}
                onChange={(e) => updateInstructorRecord('supportMethod', e.target.value)}
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
                onClick={() => updateInstructorRecord('workContent', generateAIAssist('workContent'))}
                title="AIアシスト"
              >
                🤖 AI
              </button>
            </label>
            <textarea
              value={instructorRecord.workContent}
              onChange={(e) => updateInstructorRecord('workContent', e.target.value)}
              placeholder="実施した作業や訓練の内容を記載してください"
              rows="3"
            />
          </div>
          
          <div className="form-group">
            <label>
              支援内容（1日2回以上）
              <button 
                className="ai-assist-btn"
                onClick={() => updateInstructorRecord('supportContent', generateAIAssist('supportContent'))}
                title="AIアシスト"
              >
                🤖 AI
              </button>
            </label>
            <textarea
              value={instructorRecord.supportContent}
              onChange={(e) => updateInstructorRecord('supportContent', e.target.value)}
              placeholder="具体的な支援内容を時間順に記載してください"
              rows="4"
            />
          </div>
          
          <div className="form-group">
            <label>
              対象者の心身の状況及びそれに対する助言の内容
              <button 
                className="ai-assist-btn"
                onClick={() => updateInstructorRecord('healthStatus', generateAIAssist('healthStatus'))}
                title="AIアシスト"
              >
                🤖 AI
              </button>
            </label>
            <textarea
              value={instructorRecord.healthStatus}
              onChange={(e) => updateInstructorRecord('healthStatus', e.target.value)}
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
              onClick={saveInstructorRecord}
            >
              💾 指導員記録を保存
            </button>
          </div>
        </div>

        {/* 過去の報告書一覧 */}
        <div className="past-reports">
          <h4>📚 過去の報告書一覧</h4>
          <div className="reports-list">
            {filteredReports.length === 0 ? (
              <div className="no-reports">
                <p>過去の報告書が見つかりません。</p>
              </div>
            ) : (
              filteredReports.map((report, index) => (
                <div key={report.id || `report-${index}`} className="past-report-item">
                  <div className="report-date">{report.date}</div>
                  <div className="report-summary">
                    <span className="health-indicator">
                      {report.healthCondition === 'good' ? '🟢' : 
                       report.healthCondition === 'normal' ? '🟡' : '🔴'}
                    </span>
                    <span className="work-summary">
                      {report.actualWork && report.actualWork.length > 50 
                        ? report.actualWork.substring(0, 50) + '...' 
                        : report.actualWork || '作業内容なし'}
                    </span>
                  </div>
                  <div className="report-actions">
                    <button 
                      className="view-btn"
                      onClick={() => handleDateChange(report.date)}
                    >
                      表示
                    </button>
                    <button 
                      className="edit-btn"
                      onClick={() => handleStartEdit(report)}
                    >
                      編集
                    </button>
                    <button 
                      className="pdf-btn"
                      onClick={() => onDownloadPDF && onDownloadPDF(report)}
                      title="PDFでダウンロード"
                    >
                      📄
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyReportTab; 