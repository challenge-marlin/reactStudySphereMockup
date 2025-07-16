import React, { useState } from 'react';
import './MonthlyEvaluationDetail.css';

const instructorList = [
  '佐藤指導員',
  '田中指導員',
  '山田指導員',
  '鈴木指導員',
];

const MonthlyEvaluationDetail = ({ student, report, onSave, onEdit, onDelete, onDownloadPDF }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    evalDate: report?.evalDate || new Date().toISOString().split('T')[0],
    prevEvalDate: report?.prevEvalDate || '',
    method: report?.method || '通所',
    otherMethod: report?.otherMethod || '',
    goal: report?.goal || '',
    work: report?.work || '',
    achievement: report?.achievement || '',
    issue: report?.issue || '',
    improve: report?.improve || '',
    health: report?.health || '',
    note: report?.note || '',
    validity: report?.validity || '',
    instructor: report?.instructor || student?.instructorName || instructorList[0]
  });

  const handleSave = () => {
    if (!formData.goal.trim() || !formData.work.trim()) {
      alert('訓練目標と取組内容は必須項目です。');
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
      goal: report?.goal || '',
      work: report?.work || '',
      achievement: report?.achievement || '',
      issue: report?.issue || '',
      improve: report?.improve || '',
      health: report?.health || '',
      note: report?.note || '',
      validity: report?.validity || '',
      instructor: report?.instructor || student?.instructorName || instructorList[0]
    });
  };

  const handleDelete = () => {
    if (window.confirm('この月次評価を削除しますか？')) {
      onDelete(report?.id);
    }
  };

  // AIアシスト機能（モック）
  const handleAiAssist = async (field) => {
    const suggestions = {
      goal: `${student?.class}の習得と実践的なスキルアップ`,
      work: `${student?.class}の学習と実習、課題への取り組み`,
      achievement: '基礎知識の習得ができ、実践的な作業も可能になった',
      issue: 'より高度な内容への理解を深める必要がある',
      improve: '段階的な学習と実践を組み合わせた指導を継続',
      health: '体調管理を適切に行い、無理のない学習を継続',
      note: '学習意欲が高く、着実にスキルアップしている',
      validity: '在宅就労の継続は妥当。適切なサポート体制を維持'
    };
    
    setFormData(prev => ({ ...prev, [field]: suggestions[field] || '' }));
  };

  return (
    <div className="monthly-evaluation-detail">
      <div className="detail-header">
        <h3>📈 月次評価（在宅における就労達成度評価シート）</h3>
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
                <label>前回の達成度評価日</label>
                <input 
                  type="date" 
                  value={formData.prevEvalDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, prevEvalDate: e.target.value }))}
                />
              </div>
            </div>

            <div className="form-group">
              <label>実施方法</label>
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

            <div className="form-group">
              <label>
                訓練目標 *
                <button 
                  type="button" 
                  className="ai-assist-btn"
                  onClick={() => handleAiAssist('goal')}
                >
                  🤖 AI
                </button>
              </label>
              <textarea 
                value={formData.goal} 
                onChange={(e) => setFormData(prev => ({ ...prev, goal: e.target.value }))} 
                rows={3} 
                placeholder="訓練目標を入力" 
              />
            </div>

            <div className="form-group">
              <label>
                取組内容 *
                <button 
                  type="button" 
                  className="ai-assist-btn"
                  onClick={() => handleAiAssist('work')}
                >
                  🤖 AI
                </button>
              </label>
              <textarea 
                value={formData.work} 
                onChange={(e) => setFormData(prev => ({ ...prev, work: e.target.value }))} 
                rows={3} 
                placeholder="取組内容を入力" 
              />
            </div>

            <div className="form-group">
              <label>
                訓練目標に対する達成度
                <button 
                  type="button" 
                  className="ai-assist-btn"
                  onClick={() => handleAiAssist('achievement')}
                >
                  🤖 AI
                </button>
              </label>
              <textarea 
                value={formData.achievement} 
                onChange={(e) => setFormData(prev => ({ ...prev, achievement: e.target.value }))} 
                rows={3} 
                placeholder="達成度を入力" 
              />
            </div>

            <div className="form-group">
              <label>
                課題
                <button 
                  type="button" 
                  className="ai-assist-btn"
                  onClick={() => handleAiAssist('issue')}
                >
                  🤖 AI
                </button>
              </label>
              <textarea 
                value={formData.issue} 
                onChange={(e) => setFormData(prev => ({ ...prev, issue: e.target.value }))} 
                rows={3} 
                placeholder="課題を入力" 
              />
            </div>

            <div className="form-group">
              <label>
                今後の課題改善方針
                <button 
                  type="button" 
                  className="ai-assist-btn"
                  onClick={() => handleAiAssist('improve')}
                >
                  🤖 AI
                </button>
              </label>
              <textarea 
                value={formData.improve} 
                onChange={(e) => setFormData(prev => ({ ...prev, improve: e.target.value }))} 
                rows={3} 
                placeholder="改善方針を入力" 
              />
            </div>

            <div className="form-group">
              <label>
                健康・体調面での留意事項
                <button 
                  type="button" 
                  className="ai-assist-btn"
                  onClick={() => handleAiAssist('health')}
                >
                  🤖 AI
                </button>
              </label>
              <textarea 
                value={formData.health} 
                onChange={(e) => setFormData(prev => ({ ...prev, health: e.target.value }))} 
                rows={3} 
                placeholder="健康・体調面での留意事項を入力" 
              />
            </div>

            <div className="form-group">
              <label>
                その他特記事項
                <button 
                  type="button" 
                  className="ai-assist-btn"
                  onClick={() => handleAiAssist('note')}
                >
                  🤖 AI
                </button>
              </label>
              <textarea 
                value={formData.note} 
                onChange={(e) => setFormData(prev => ({ ...prev, note: e.target.value }))} 
                rows={3} 
                placeholder="特記事項を入力" 
              />
            </div>

            <div className="form-group">
              <label>
                在宅就労継続の妥当性
                <button 
                  type="button" 
                  className="ai-assist-btn"
                  onClick={() => handleAiAssist('validity')}
                >
                  🤖 AI
                </button>
              </label>
              <textarea 
                value={formData.validity} 
                onChange={(e) => setFormData(prev => ({ ...prev, validity: e.target.value }))} 
                rows={3} 
                placeholder="妥当性を入力" 
              />
            </div>

            <div className="form-group">
              <label>評価実施者</label>
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
                <label>前回の達成度評価日:</label>
                <span>{report?.prevEvalDate || 'なし'}</span>
              </div>
              <div className="info-item">
                <label>実施方法:</label>
                <span>{report?.method || '未設定'}</span>
              </div>
              <div className="info-item">
                <label>評価実施者:</label>
                <span>{report?.instructor || '未設定'}</span>
              </div>
            </div>

            <div className="content-sections">
              <div className="content-section">
                <label>訓練目標:</label>
                <div className="content-text">
                  {report?.goal || '未入力'}
                </div>
              </div>

              <div className="content-section">
                <label>取組内容:</label>
                <div className="content-text">
                  {report?.work || '未入力'}
                </div>
              </div>

              <div className="content-section">
                <label>訓練目標に対する達成度:</label>
                <div className="content-text">
                  {report?.achievement || '未入力'}
                </div>
              </div>

              <div className="content-section">
                <label>課題:</label>
                <div className="content-text">
                  {report?.issue || '未入力'}
                </div>
              </div>

              <div className="content-section">
                <label>今後の課題改善方針:</label>
                <div className="content-text">
                  {report?.improve || '未入力'}
                </div>
              </div>

              <div className="content-section">
                <label>健康・体調面での留意事項:</label>
                <div className="content-text">
                  {report?.health || '未入力'}
                </div>
              </div>

              <div className="content-section">
                <label>その他特記事項:</label>
                <div className="content-text">
                  {report?.note || '未入力'}
                </div>
              </div>

              <div className="content-section">
                <label>在宅就労継続の妥当性:</label>
                <div className="content-text">
                  {report?.validity || '未入力'}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MonthlyEvaluationDetail; 