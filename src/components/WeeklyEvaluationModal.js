import React, { useState } from 'react';
import './WeeklyEvaluationModal.css';

const instructorList = [
  '佐藤指導員',
  '田中指導員',
  '山田指導員',
  '鈴木指導員',
];

const todayStr = new Date().toISOString().split('T')[0];

const WeeklyEvaluationModal = ({
  isOpen,
  onClose,
  onSave,
  prevEvalDate,
  defaultPeriod,
  defaultInstructor,
  aiAssist,
}) => {
  const [method, setMethod] = useState('通所');
  const [otherMethod, setOtherMethod] = useState('');
  const [period, setPeriod] = useState(defaultPeriod || { start: '', end: '' });
  const [content, setContent] = useState('');
  const [instructor, setInstructor] = useState(defaultInstructor || instructorList[0]);

  const handleAiAssist = async () => {
    if (aiAssist) {
      const suggestion = await aiAssist({
        type: 'weekly',
        period,
        prevEvalDate,
        instructor,
      });
      setContent(suggestion || '');
    }
  };

  const handleSave = () => {
    onSave && onSave({
      evalDate: todayStr,
      prevEvalDate,
      method: method === 'その他' ? otherMethod : method,
      period,
      content,
      instructor,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal weekly-eval-modal">
        <div className="modal-header">
          <h2>週次評価（在宅における就労支援記録・評価）</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label>評価実施日</label>
            <input type="date" value={todayStr} disabled />
          </div>
          <div className="form-group">
            <label>前回評価日</label>
            <input type="date" value={prevEvalDate || ''} disabled />
          </div>
          <div className="form-group">
            <label>評価方法</label>
            <div className="radio-group">
              <label><input type="radio" name="method" value="通所" checked={method==='通所'} onChange={()=>setMethod('通所')} />通所</label>
              <label><input type="radio" name="method" value="訪問" checked={method==='訪問'} onChange={()=>setMethod('訪問')} />訪問</label>
              <label><input type="radio" name="method" value="その他" checked={method==='その他'} onChange={()=>setMethod('その他')} />その他</label>
              {method==='その他' && (
                <input type="text" value={otherMethod} onChange={e=>setOtherMethod(e.target.value)} placeholder="方法を入力" />
              )}
            </div>
          </div>
          <div className="form-group period-group">
            <label>対象期間</label>
            <input type="date" value={period.start} onChange={e=>setPeriod(p=>({...p, start: e.target.value}))} />
            <span>～</span>
            <input type="date" value={period.end} onChange={e=>setPeriod(p=>({...p, end: e.target.value}))} />
          </div>
          <div className="form-group">
            <label>評価内容</label>
            <div className="textarea-ai-group">
              <textarea value={content} onChange={e=>setContent(e.target.value)} rows={6} placeholder="評価内容を入力してください" />
              <button type="button" className="ai-btn" onClick={handleAiAssist}>AIアシスト</button>
            </div>
          </div>
          <div className="form-group">
            <label>記録者</label>
            <select value={instructor} onChange={e=>setInstructor(e.target.value)}>
              {instructorList.map(name => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="modal-actions">
          <button className="save-btn" onClick={handleSave}>保存</button>
          <button className="cancel-btn" onClick={onClose}>キャンセル</button>
        </div>
      </div>
    </div>
  );
};

export default WeeklyEvaluationModal; 