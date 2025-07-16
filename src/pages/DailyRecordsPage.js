import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DailyRecordsPage.css';

const DailyRecordsPage = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [records, setRecords] = useState([]);
  const [showRecordForm, setShowRecordForm] = useState(false);
  const [recordForm, setRecordForm] = useState({
    date: '',
    startTime: '',
    endTime: '',
    supportMethod: '',
    workContent: '',
    supportContent: '',
    healthStatus: ''
  });

  // 生徒データを取得
  useEffect(() => {
    const fetchStudent = () => {
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
          canStudyAtHome: true
        }
      ];

      const foundStudent = mockStudents.find(s => s.id === studentId);
      if (foundStudent) {
        setStudent(foundStudent);
      } else {
        alert('生徒が見つかりません。');
        navigate('/instructor/dashboard');
      }
    };

    fetchStudent();
  }, [studentId, navigate]);

  // 日々の記録データを取得
  useEffect(() => {
    const mockRecords = [
      {
        id: 'record001',
        date: '2024-01-15',
        startTime: '10:00',
        endTime: '16:00',
        supportMethod: '訪問',
        workContent: '・ビーズ等を使ったアクセサリー作り（前回終えられなかった分も含む）\n・上記終了後、細かい作業の訓練のためのプログラム（簡単な手芸作品の作成）を実施',
        supportContent: '・9:00　利用者から作業開始の電話あり。前回作成予定の個数が終わらなかったのは、集中力が続かなかったことが原因のようであり、30分ごとに少し休憩をはさむなどしてリフレッシュの時間を設けることを提案。今日は、前回の残り分を含め、30個の作成を目標とする。（母親へも報告）\n・12:00　利用者へ電話。午前中の作業進捗を確認。目標の半分（15個）を作成済み。13:00まで昼休みを取り、13:00から再開することを確認。',
        healthStatus: '・9:00　体温36.2℃、睡眠時間6時間と確認。体調も良好な様子。いつもどおりストレッチを行うことを助言。\n・16:00　いつも以上に作業を頑張ったせいか、軽い頭痛を感じるとのこと。ペースを考え、適宜休憩をとりながら、メリハリをつけて作業することを助言。',
        recorder: '山田 指導員'
      },
      {
        id: 'record002',
        date: '2024-01-14',
        startTime: '09:30',
        endTime: '15:30',
        supportMethod: '電話',
        workContent: '・ITリテラシー・AIの基本コースの学習\n・Windows 11の基本操作の復習',
        supportContent: '・9:30　利用者から学習開始の連絡。今日はWindows 11の基本操作を復習したいとのこと。\n・12:00　午前中の学習進捗を確認。基本操作は順調に進んでいる。\n・15:00　学習終了の確認。明日は新しい内容に進むことを提案。',
        healthStatus: '・体調は良好。集中力も保たれている。適度な休憩を取るよう助言。',
        recorder: '山田 指導員'
      }
    ];

    setRecords(mockRecords);
  }, []);

  // 新しい記録を追加
  const addRecord = (e) => {
    e.preventDefault();
    
    const newRecord = {
      id: `record${Date.now()}`,
      ...recordForm,
      recorder: '山田 指導員' // 実際は現在ログイン中の指導員名
    };

    setRecords([newRecord, ...records]);
    setRecordForm({
      date: '',
      startTime: '',
      endTime: '',
      supportMethod: '',
      workContent: '',
      supportContent: '',
      healthStatus: ''
    });
    setShowRecordForm(false);
  };

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <div className="daily-records-page">
      <div className="page-header">
        <button 
          className="back-button"
          onClick={() => navigate('/instructor/dashboard')}
        >
          ← 戻る
        </button>
        <div className="header-content">
          <h1>📝 日々の就労支援記録</h1>
          <div className="student-info">
            <h2>{student.name}</h2>
            <p>{student.class} | {student.instructorName} | {student.locationName}</p>
          </div>
        </div>
        <button 
          className="add-record-button"
          onClick={() => setShowRecordForm(true)}
        >
          ＋ 新規記録
        </button>
      </div>

      <div className="records-container">
        {records.length === 0 ? (
          <div className="no-records">
            <p>まだ記録がありません。</p>
            <button 
              className="add-record-button"
              onClick={() => setShowRecordForm(true)}
            >
              最初の記録を作成
            </button>
          </div>
        ) : (
          <div className="records-list">
            {records.map(record => (
              <div key={record.id} className="record-card">
                <div className="record-header">
                  <div className="record-date">
                    <span className="date">{record.date}</span>
                    <span className="time">{record.startTime} ～ {record.endTime}</span>
                  </div>
                  <div className="record-method">
                    <span className="method-badge">{record.supportMethod}</span>
                  </div>
                </div>
                
                <div className="record-content">
                  <div className="record-section">
                    <h4>作業・訓練内容</h4>
                    <p style={{ whiteSpace: 'pre-line' }}>{record.workContent}</p>
                  </div>
                  
                  <div className="record-section">
                    <h4>支援内容（1日2回以上）</h4>
                    <p style={{ whiteSpace: 'pre-line' }}>{record.supportContent}</p>
                  </div>
                  
                  <div className="record-section">
                    <h4>対象者の心身の状況及びそれに対する助言の内容</h4>
                    <p style={{ whiteSpace: 'pre-line' }}>{record.healthStatus}</p>
                  </div>
                  
                  <div className="record-footer">
                    <span className="recorder">対応・記録者: {record.recorder}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 記録作成フォーム */}
      {showRecordForm && (
        <div className="modal-overlay">
          <div className="modal record-form-modal">
            <div className="modal-header">
              <h3>日々の就労支援記録作成</h3>
              <button 
                className="close-button"
                onClick={() => setShowRecordForm(false)}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={addRecord}>
              <div className="form-row">
                <div className="form-group">
                  <label>実施日 *</label>
                  <input 
                    type="date" 
                    value={recordForm.date}
                    onChange={(e) => setRecordForm({...recordForm, date: e.target.value})}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>開始時間 *</label>
                  <input 
                    type="time" 
                    value={recordForm.startTime}
                    onChange={(e) => setRecordForm({...recordForm, startTime: e.target.value})}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>終了時間 *</label>
                  <input 
                    type="time" 
                    value={recordForm.endTime}
                    onChange={(e) => setRecordForm({...recordForm, endTime: e.target.value})}
                    required 
                  />
                </div>
              </div>

              <div className="form-group">
                <label>支援方法 *</label>
                <select 
                  value={recordForm.supportMethod}
                  onChange={(e) => setRecordForm({...recordForm, supportMethod: e.target.value})}
                  required
                >
                  <option value="">選択してください</option>
                  <option value="訪問">訪問</option>
                  <option value="電話">電話</option>
                  <option value="その他">その他</option>
                </select>
              </div>

              <div className="form-group">
                <label>作業・訓練内容 *</label>
                <textarea
                  value={recordForm.workContent}
                  onChange={(e) => setRecordForm({...recordForm, workContent: e.target.value})}
                  placeholder="実施した作業や訓練の内容を記載してください"
                  required
                  rows="4"
                />
              </div>

              <div className="form-group">
                <label>支援内容（1日2回以上） *</label>
                <textarea
                  value={recordForm.supportContent}
                  onChange={(e) => setRecordForm({...recordForm, supportContent: e.target.value})}
                  placeholder="具体的な支援内容を時間順に記載してください"
                  required
                  rows="6"
                />
              </div>

              <div className="form-group">
                <label>対象者の心身の状況及びそれに対する助言の内容 *</label>
                <textarea
                  value={recordForm.healthStatus}
                  onChange={(e) => setRecordForm({...recordForm, healthStatus: e.target.value})}
                  placeholder="体調や精神状態、それに対する助言を記載してください"
                  required
                  rows="4"
                />
              </div>

              <div className="form-actions">
                <button type="button" onClick={() => setShowRecordForm(false)}>
                  キャンセル
                </button>
                <button type="submit" className="primary">
                  記録
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyRecordsPage; 