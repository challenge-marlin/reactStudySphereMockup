import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomeSupportManagement.css';

const HomeSupportManagement = ({ instructorId }) => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [supportPlans, setSupportPlans] = useState([]);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [planForm, setPlanForm] = useState({
    longTermGoal: '',
    shortTermGoal: '',
    needs: '',
    supportContent: '',
    targetDate: ''
  });

  // 生徒データを取得（生徒管理と同じデータを使用）
  useEffect(() => {
    const fetchStudents = () => {
      // 生徒管理と同じモックデータを使用
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
    };

    fetchStudents();
  }, []);

  // 個別支援計画のモックデータ
  useEffect(() => {
    setSupportPlans([
      {
        id: 'plan001',
        userId: 'student001',
        userName: '末吉　元気',
        longTermGoal: 'しっかりと就労できるよう、心身の健康を維持する',
        shortTermGoal: '新しい環境や就労のスタイルに慣れる',
        needs: '・いずれはスキルアップしたい\n・天候が悪くなると頭痛などで体調が悪くなることがある',
        supportContent: '・生成AIを使用したHP作成、及びアプリの開発がスムーズに行えるよう、声掛け、助言、アドバイスを行います。また、休憩などを取らずオーバーワーク気味の際には休憩を促し、体調のコントロールを図ります\n・体調不良時には適宜休憩を促し、体調管理に努めます。また、在宅就労システムを導入した際には在宅の作業が出来るよう対応を行います',
        targetDate: '2025-07-31',
        createdAt: '2024-01-01'
      },
      {
        id: 'plan002',
        userId: 'student003',
        userName: '田中花子',
        longTermGoal: 'SNS運用スキルを習得し、デジタルマーケティング分野での就労を目指す',
        shortTermGoal: '画像生成・編集ツールの基本操作をマスターし、実践的なコンテンツ作成ができるようになる',
        needs: '・デジタルツールの操作に不安がある\n・創造的な作業に興味があるが、技術的な面で自信がない\n・在宅での作業に適応したい',
        supportContent: '・SNS運用の基礎知識と画像生成・編集ツールの操作方法を段階的に指導します\n・実際のツールを使用した実践的な演習を行い、操作に慣れるようサポートします\n・在宅での作業環境整備についてアドバイスし、効率的な作業方法を提案します\n・定期的な進捗確認とフィードバックを行い、学習意欲を維持します',
        targetDate: '2024-12-31',
        createdAt: '2024-01-05'
      }
    ]);
  }, []);

  // ログインURLをコピー
  const copyLoginUrl = (token) => {
    const loginUrl = `${window.location.origin}/student/login/${token}`;
    navigator.clipboard.writeText(loginUrl).then(() => {
      alert('ログインURLをクリップボードにコピーしました。');
    }).catch(() => {
      alert('コピーに失敗しました。手動でコピーしてください。');
    });
  };

  // 個別支援計画を開く
  const openPlanModal = (student) => {
    setSelectedStudent(student);
    const existingPlan = supportPlans.find(plan => plan.userId === student.id);
    if (existingPlan) {
      setPlanForm({
        longTermGoal: existingPlan.longTermGoal,
        shortTermGoal: existingPlan.shortTermGoal,
        needs: existingPlan.needs,
        supportContent: existingPlan.supportContent,
        targetDate: existingPlan.targetDate
      });
    } else {
      setPlanForm({
        longTermGoal: '',
        shortTermGoal: '',
        needs: '',
        supportContent: '',
        targetDate: ''
      });
    }
    setShowPlanModal(true);
  };

  // 個別支援計画を保存
  const savePlan = (e) => {
    e.preventDefault();
    
    const planData = {
      id: supportPlans.find(plan => plan.userId === selectedStudent.id)?.id || `plan${Date.now()}`,
      userId: selectedStudent.id,
      userName: selectedStudent.name,
      ...planForm,
      createdAt: supportPlans.find(plan => plan.userId === selectedStudent.id)?.createdAt || new Date().toISOString().split('T')[0]
    };

    if (supportPlans.find(plan => plan.userId === selectedStudent.id)) {
      // 既存の計画を更新
      setSupportPlans(prev => prev.map(plan => 
        plan.userId === selectedStudent.id ? planData : plan
      ));
    } else {
      // 新しい計画を追加
      setSupportPlans(prev => [...prev, planData]);
    }

    setShowPlanModal(false);
    setSelectedStudent(null);
    setPlanForm({
      longTermGoal: '',
      shortTermGoal: '',
      needs: '',
      supportContent: '',
      targetDate: ''
    });
  };

  // 個別支援計画の存在確認
  const hasPlan = (studentId) => {
    return supportPlans.some(plan => plan.userId === studentId);
  };

  return (
    <div className="home-support-management">
      <div className="home-support-header">
        <h2>🏠 在宅支援管理</h2>
        <p>在宅学習可能なユーザーに対する個別支援計画を管理します。</p>
      </div>

      <div className="management-actions">
        <button 
          className="action-btn primary"
          onClick={() => navigate('/instructor/daily-records')}
        >
          📝 日々の記録管理
        </button>
        <button 
          className="action-btn primary"
          onClick={() => navigate('/instructor/evaluations')}
        >
          📊 達成度評価管理
        </button>
      </div>

      <div className="students-table-container">
        <div className="table-header">
          <h3>在宅学習可能ユーザー一覧</h3>
          <div className="table-actions">
            <span className="student-count">
              {students.length}名の在宅学習可能ユーザー
            </span>
          </div>
        </div>

        <div className="students-table">
          <table>
            <thead>
              <tr>
                <th>氏名</th>
                <th>コース</th>
                <th>指導員</th>
                <th>拠点</th>
                <th>進捗</th>
                <th>最終ログイン</th>
                <th>ログインURL</th>
                <th>個別支援計画</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student.id}>
                  <td>
                    <div className="student-info">
                      <span className="student-name">{student.name}</span>
                      <span className="student-email">{student.email}</span>
                    </div>
                  </td>
                  <td>
                    <span className="course-name">{student.class}</span>
                  </td>
                  <td>
                    <span className="instructor-name">{student.instructorName}</span>
                  </td>
                  <td>
                    <span className="location-name">{student.locationName}</span>
                  </td>
                  <td>
                    <div className="progress-container">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${student.progress}%` }}
                        ></div>
                      </div>
                      <span className="progress-text">{student.progress}%</span>
                    </div>
                  </td>
                  <td>
                    <span className="last-login">{student.lastLogin}</span>
                  </td>
                  <td>
                    <div className="login-url-container">
                      <span className="login-token">{student.loginToken}</span>
                      <button 
                        className="copy-button"
                        onClick={() => copyLoginUrl(student.loginToken)}
                        title="ログインURLをコピー"
                      >
                        📋
                      </button>
                    </div>
                  </td>
                  <td>
                    {hasPlan(student.id) ? (
                      <span className="status active">作成済み</span>
                    ) : (
                      <span className="status inactive">未作成</span>
                    )}
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="action-btn primary"
                        onClick={() => openPlanModal(student)}
                      >
                        {hasPlan(student.id) ? '計画編集' : '計画作成'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 個別支援計画作成フォーム */}
      {showPlanModal && (
        <div className="modal-overlay">
          <div className="modal plan-form-modal">
            <div className="modal-header">
              <h3>個別支援計画作成</h3>
              <button 
                className="close-button"
                onClick={() => setShowPlanModal(false)}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={savePlan}>
              <div className="form-group">
                <label>対象者 *</label>
                <select 
                  value={selectedStudent ? selectedStudent.id : ''}
                  onChange={(e) => {
                    const student = students.find(s => s.id === e.target.value);
                    setSelectedStudent(student);
                  }}
                  required
                >
                  <option value="">選択してください</option>
                  {students.map(student => (
                    <option key={student.id} value={student.id}>
                      {student.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>長期目標</label>
                <textarea
                  value={planForm.longTermGoal}
                  onChange={(e) => setPlanForm({...planForm, longTermGoal: e.target.value})}
                  placeholder="例: しっかりと就労できるよう、心身の健康を維持する"
                  required
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label>短期目標</label>
                <textarea
                  value={planForm.shortTermGoal}
                  onChange={(e) => setPlanForm({...planForm, shortTermGoal: e.target.value})}
                  placeholder="例: 新しい環境や就労のスタイルに慣れる"
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label>本人のニーズ</label>
                <textarea
                  value={planForm.needs}
                  onChange={(e) => setPlanForm({...planForm, needs: e.target.value})}
                  placeholder="例: ・いずれはスキルアップしたい&#10;・天候が悪くなると頭痛などで体調が悪くなることがある"
                  rows="4"
                />
              </div>

              <div className="form-group">
                <label>個別支援内容</label>
                <textarea
                  value={planForm.supportContent}
                  onChange={(e) => setPlanForm({...planForm, supportContent: e.target.value})}
                  placeholder="具体的な支援内容を記載してください"
                  rows="6"
                />
              </div>

              <div className="form-group">
                <label>目標達成時期</label>
                <input
                  type="date"
                  value={planForm.targetDate}
                  onChange={(e) => setPlanForm({...planForm, targetDate: e.target.value})}
                />
              </div>

              <div className="form-actions">
                <button type="button" onClick={() => setShowPlanModal(false)}>
                  キャンセル
                </button>
                <button type="submit" className="primary">
                  作成
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeSupportManagement; 