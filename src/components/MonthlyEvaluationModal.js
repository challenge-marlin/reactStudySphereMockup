import React, { useState } from 'react';
import './MonthlyEvaluationModal.css';

const instructorList = [
  '佐藤指導員',
  '田中指導員',
  '山田指導員',
  '鈴木指導員',
];

const todayStr = new Date().toISOString().split('T')[0];

const MonthlyEvaluationModal = ({
  isOpen,
  onClose,
  onSave,
  prevEvalDate,
  defaultInstructor,
  aiAssist,
}) => {
  const [method, setMethod] = useState('通所');
  const [otherMethod, setOtherMethod] = useState('');
  const [goal, setGoal] = useState('');
  const [work, setWork] = useState('');
  const [achievement, setAchievement] = useState('');
  const [issue, setIssue] = useState('');
  const [improve, setImprove] = useState('');
  const [health, setHealth] = useState('');
  const [note, setNote] = useState('');
  const [validity, setValidity] = useState('');
  const [instructor, setInstructor] = useState(defaultInstructor || instructorList[0]);

  const handleAi = async (field, setter) => {
    if (aiAssist) {
      const suggestion = await aiAssist({
        type: 'monthly',
        field,
        prevEvalDate,
        instructor,
      });
      setter(suggestion || '');
    }
  };

  const handleSave = () => {
    onSave && onSave({
      evalDate: todayStr,
      prevEvalDate,
      method: method === 'その他' ? otherMethod : method,
      goal,
      work,
      achievement,
      issue,
      improve,
      health,
      note,
      validity,
      instructor,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal monthly-eval-modal">
        <div className="modal-header">
          <h2>月次評価（在宅における就労達成度評価シート）</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label>評価実施日</label>
            <input type="date" value={todayStr} disabled />
          </div>
          <div className="form-group">
            <label>実施方法</label>
            <div className="radio-group">
              <label><input type="radio" name="method" value="通所" checked={method==='通所'} onChange={()=>setMethod('通所')} />通所</label>
              <label><input type="radio" name="method" value="訪問" checked={method==='訪問'} onChange={()=>setMethod('訪問')} />訪問</label>
              <label><input type="radio" name="method" value="その他" checked={method==='その他'} onChange={()=>setMethod('その他')} />その他</label>
              {method==='その他' && (
                <input type="text" value={otherMethod} onChange={e=>setOtherMethod(e.target.value)} placeholder="方法を入力" />
              )}
            </div>
          </div>
          <div className="form-group">
            <label>訓練目標</label>
            <div className="textarea-ai-group">
              <textarea value={goal} onChange={e=>setGoal(e.target.value)} rows={3} placeholder="訓練目標を入力" />
              <button type="button" className="ai-btn" onClick={()=>handleAi('goal', setGoal)}>AIアシスト</button>
            </div>
          </div>
          <div className="form-group">
            <label>取組内容</label>
            <div className="textarea-ai-group">
              <textarea value={work} onChange={e=>setWork(e.target.value)} rows={3} placeholder="取組内容を入力" />
              <button type="button" className="ai-btn" onClick={()=>handleAi('work', setWork)}>AIアシスト</button>
            </div>
          </div>
          <div className="form-group">
            <label>訓練目標に対する達成度</label>
            <div className="textarea-ai-group">
              <textarea value={achievement} onChange={e=>setAchievement(e.target.value)} rows={3} placeholder="達成度を入力" />
              <button type="button" className="ai-btn" onClick={()=>handleAi('achievement', setAchievement)}>AIアシスト</button>
            </div>
          </div>
          <div className="form-group">
            <label>課題</label>
            <div className="textarea-ai-group">
              <textarea value={issue} onChange={e=>setIssue(e.target.value)} rows={3} placeholder="課題を入力" />
              <button type="button" className="ai-btn" onClick={()=>handleAi('issue', setIssue)}>AIアシスト</button>
            </div>
          </div>
          <div className="form-group">
            <label>今後の課題改善方針</label>
            <div className="textarea-ai-group">
              <textarea value={improve} onChange={e=>setImprove(e.target.value)} rows={3} placeholder="改善方針を入力" />
              <button type="button" className="ai-btn" onClick={()=>handleAi('improve', setImprove)}>AIアシスト</button>
            </div>
          </div>
          <div className="form-group">
            <label>健康・体調面での留意事項</label>
            <div className="textarea-ai-group">
              <textarea value={health} onChange={e=>setHealth(e.target.value)} rows={3} placeholder="健康・体調面での留意事項を入力" />
              <button type="button" className="ai-btn" onClick={()=>handleAi('health', setHealth)}>AIアシスト</button>
            </div>
          </div>
          <div className="form-group">
            <label>その他特記事項</label>
            <div className="textarea-ai-group">
              <textarea value={note} onChange={e=>setNote(e.target.value)} rows={3} placeholder="特記事項を入力" />
              <button type="button" className="ai-btn" onClick={()=>handleAi('note', setNote)}>AIアシスト</button>
            </div>
          </div>
          <div className="form-group">
            <label>在宅就労継続の妥当性</label>
            <div className="textarea-ai-group">
              <textarea value={validity} onChange={e=>setValidity(e.target.value)} rows={3} placeholder="妥当性を入力" />
              <button type="button" className="ai-btn" onClick={()=>handleAi('validity', setValidity)}>AIアシスト</button>
            </div>
          </div>
          <div className="form-group">
            <label>評価実施者</label>
            <select value={instructor} onChange={e=>setInstructor(e.target.value)}>
              {instructorList.map(name => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>前回の達成度評価日</label>
            <input type="date" value={prevEvalDate || ''} disabled />
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

export default MonthlyEvaluationModal; 