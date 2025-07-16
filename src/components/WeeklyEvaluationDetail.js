import React, { useState } from 'react';
import './WeeklyEvaluationDetail.css';

const instructorList = [
  '佐藤指導員',
  '田中指導員',
  '山田指導員',
  '鈴木指導員',
];

const WeeklyEvaluationDetail = ({ student, report, onSave, onEdit, onDelete, onDownloadPDF }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    evalDate: report?.evalDate || new Date().toISOString().split('T')[0],
    prevEvalDate: report?.prevEvalDate || '',
    method: report?.method || '通所',
    otherMethod: report?.otherMethod || '',
    period: report?.period || { start: '', end: '' },
    content: report?.content || '',
    instructor: report?.instructor || student?.instructorName || instructorList[0]
  });

  const handleSave = () => {
    if (!formData.content.trim()) {
      alert('評価内容を入力してください。');
      return;
    }

    const saveData = {
      ...formData,
      method: formData.method === 'その他' ? formData.otherMethod : formData.method
    };

    onSave(saveData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      evalDate: report?.evalDate || new Date().toISOString().split('T')[0],
      prevEvalDate: report?.prevEvalDate || '',
      method: report?.method || '通所',
      otherMethod: report?.otherMethod || '',
      period: report?.period || { start: '', end: '' },
      content: report?.content || '',
      instructor: report?.instructor || student?.instructorName || instructorList[0]
    });
  };

  const handleDelete = () => {
    if (window.confirm('この週次評価を削除しますか？')) {
      onDelete(report?.id);
    }
  };

  // AIアシスト機能（モック）
  const handleAiAssist = async () => {
    const suggestion = `・${student?.name}の週次評価について
・期間：${formData.period.start} ～ ${formData.period.end}
・学習進捗：${student?.class}の内容を着実に習得
・体調管理：良好な状態を維持
・次回目標：より高度な内容への挑戦`;
    
    setFormData(prev => ({ ...prev, content: suggestion }));
  };

  return (
    <div className="weekly-evaluation-detail">
      <div className="detail-header">
        <h3>📅 週次評価（在宅における就労支援記録・評価）</h3>
        <div className="header-actions">
          {!isEditing ? (
            <>
              <button 
                className="edit-btn"
                onClick={() => setIsEditing(true)}
              >
                ✏️ 編集
              </button>
              <button 
                className="delete-btn"
                onClick={handleDelete}
              >
                🗑️ 削除
              </button>
              <button 
                className="pdf-btn"
                onClick={() => onDownloadPDF && onDownloadPDF(report)}
                title="PDFでダウンロード"
              >
                📄 PDF
              </button>
            </>
          ) : (
            <>
              <button 
                className="save-btn"
                onClick={handleSave}
              >
                💾 保存
              </button>
              <button 
                className="cancel-btn"
                onClick={handleCancel}
              >
                キャンセル
              </button>
            </>
          )}
        </div>
      </div>

      <div className="detail-content">
        {isEditing ? (
          <div className="edit-form">
            <div className="form-grid">
              <div className="form-group">
                <label>評価実施日</label>
                <input 
                  type="date" 
                  value={formData.evalDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, evalDate: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label>前回評価日</label>
                <input 
                  type="date" 
                  value={formData.prevEvalDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, prevEvalDate: e.target.value }))}
                />
              </div>
            </div>

            <div className="form-group">
              <label>評価方法</label>
              <div className="radio-group">
                <label>
                  <input 
                    type="radio" 
                    name="method" 
                    value="通所" 
                    checked={formData.method === '通所'} 
                    onChange={() => setFormData(prev => ({ ...prev, method: '通所' }))} 
                  />
                  通所
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="method" 
                    value="訪問" 
                    checked={formData.method === '訪問'} 
                    onChange={() => setFormData(prev => ({ ...prev, method: '訪問' }))} 
                  />
                  訪問
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="method" 
                    value="その他" 
                    checked={formData.method === 'その他'} 
                    onChange={() => setFormData(prev => ({ ...prev, method: 'その他' }))} 
                  />
                  その他
                </label>
                {formData.method === 'その他' && (
                  <input 
                    type="text" 
                    value={formData.otherMethod} 
                    onChange={(e) => setFormData(prev => ({ ...prev, otherMethod: e.target.value }))} 
                    placeholder="方法を入力" 
                    className="other-method-input"
                  />
                )}
              </div>
            </div>

            <div className="form-group period-group">
              <label>対象期間</label>
              <div className="period-inputs">
                <input 
                  type="date" 
                  value={formData.period.start} 
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    period: { ...prev.period, start: e.target.value } 
                  }))} 
                />
                <span>～</span>
                <input 
                  type="date" 
                  value={formData.period.end} 
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    period: { ...prev.period, end: e.target.value } 
                  }))} 
                />
              </div>
            </div>

            <div className="form-group">
              <label>
                評価内容
                <button 
                  type="button" 
                  className="ai-assist-btn"
                  onClick={handleAiAssist}
                >
                  🤖 AIアシスト
                </button>
              </label>
              <textarea 
                value={formData.content} 
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))} 
                rows={6} 
                placeholder="評価内容を入力してください" 
              />
            </div>

            <div className="form-group">
              <label>記録者</label>
              <select 
                value={formData.instructor} 
                onChange={(e) => setFormData(prev => ({ ...prev, instructor: e.target.value }))}
              >
                {instructorList.map(name => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
            </div>
          </div>
        ) : (
          <div className="display-form">
            <div className="info-grid">
              <div className="info-item">
                <label>評価実施日:</label>
                <span>{report?.evalDate || '未設定'}</span>
              </div>
              <div className="info-item">
                <label>前回評価日:</label>
                <span>{report?.prevEvalDate || 'なし'}</span>
              </div>
              <div className="info-item">
                <label>評価方法:</label>
                <span>{report?.method || '未設定'}</span>
              </div>
              <div className="info-item">
                <label>対象期間:</label>
                <span>
                  {report?.period?.start && report?.period?.end 
                    ? `${report.period.start} ～ ${report.period.end}`
                    : '未設定'
                  }
                </span>
              </div>
              <div className="info-item">
                <label>記録者:</label>
                <span>{report?.instructor || '未設定'}</span>
              </div>
            </div>

            <div className="content-section">
              <label>評価内容:</label>
              <div className="content-text">
                {report?.content || '評価内容が入力されていません。'}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeeklyEvaluationDetail; 