import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomeSupportEvaluationsPage.css';
import WeeklyEvaluationModal from '../components/WeeklyEvaluationModal';
import MonthlyEvaluationModal from '../components/MonthlyEvaluationModal';


const HomeSupportEvaluationsPage = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [filteredStudentsList, setFilteredStudentsList] = useState([]);
  const [evaluations, setEvaluations] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [supportPlans, setSupportPlans] = useState([]);
  const [showSupportPlanModal, setShowSupportPlanModal] = useState(false);
  const [selectedStudentForPlan, setSelectedStudentForPlan] = useState(null);
  const [editingPlan, setEditingPlan] = useState(null);
  
  // 評価モーダル用の状態
  const [showWeeklyModal, setShowWeeklyModal] = useState(false);
  const [showMonthlyModal, setShowMonthlyModal] = useState(false);
  const [selectedStudentForEvaluation, setSelectedStudentForEvaluation] = useState(null);


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
      setFilteredStudentsList(filteredStudents);
    };

    fetchStudents();
  }, []);

  // リマインド対象者を動的に判定
  useEffect(() => {
    const mockEvaluations = [
      {
        id: 'eval001',
        studentId: 'student001',
        studentName: '末吉　元気',
        period: 'weekly',
        evaluationDate: '2024-01-19',
        status: 'pending',
        type: '週次評価',
        description: 'ITリテラシー・AIの基本コースの週次達成度評価'
      },
      {
        id: 'eval002',
        studentId: 'student003',
        studentName: '田中花子',
        period: 'weekly',
        evaluationDate: '2024-01-19',
        status: 'pending',
        type: '週次評価',
        description: 'SNS運用の基礎・画像生成編集コースの週次達成度評価'
      },
      {
        id: 'eval003',
        studentId: 'student001',
        studentName: '末吉　元気',
        period: 'monthly',
        evaluationDate: '2024-01-31',
        status: 'pending',
        type: '月次評価',
        description: 'ITリテラシー・AIの基本コースの月次達成度評価'
      },
      {
        id: 'eval004',
        studentId: 'student003',
        studentName: '田中花子',
        period: 'monthly',
        evaluationDate: '2024-01-31',
        status: 'pending',
        type: '月次評価',
        description: 'SNS運用の基礎・画像生成編集コースの月次達成度評価'
      },
      {
        id: 'eval005',
        studentId: 'student005',
        studentName: '山田一郎',
        period: 'weekly',
        evaluationDate: '2024-01-12',
        status: 'completed',
        type: '週次評価',
        description: 'LP制作(HTML・CSS)コースの週次達成度評価',
        completedDate: '2024-01-12',
        score: 85
      }
    ];

    setEvaluations(mockEvaluations);

    // 個別支援計画のモックデータ
    const mockSupportPlans = [
      {
        id: 'plan001',
        studentId: 'student001',
        studentName: '末吉　元気',
        startDate: '2024-01-01',
        endDate: '2024-03-31',
        longTermGoal: 'しっかりと就労できるよう、心身の健康を維持する',
        shortTermGoal: '新しい環境や就労のスタイルに慣れる',
        needs: '・いずれはスキルアップしたい\n・天候が悪くなると頭痛などで体調が悪くなることがある',
        supportContent: '・生成AIを使用したHP作成、及びアプリの開発がスムーズに行えるよう、声掛け、助言、アドバイスを行います。また、休憩などを取らずオーバーワーク気味の際には休憩を促し、体調のコントロールを図ります\n・体調不良時には適宜休憩を促し、体調管理に努めます。また、在宅就労システムを導入した際には在宅の作業が出来るよう対応を行います'
      },
      {
        id: 'plan002',
        studentId: 'student003',
        studentName: '田中花子',
        startDate: '2024-01-02',
        endDate: '2024-02-29',
        longTermGoal: 'SNSを活用したビジネス展開ができるようになる',
        shortTermGoal: '基本的なSNS投稿と運用スキルを習得する',
        needs: '・SNSの基本操作を学びたい\n・フォロワーを増やしたい\n・画像編集のスキルを身につけたい',
        supportContent: '・SNS投稿の基本から応用まで段階的に指導\n・画像編集ソフトの使い方を実習形式で学習\n・フォロワー獲得のための戦略をアドバイス'
      },
      {
        id: 'plan003',
        studentId: 'student005',
        studentName: '山田一郎',
        startDate: '2023-12-01',
        endDate: '2024-01-31',
        longTermGoal: 'Web制作のスキルを身につけ、フリーランスとして活動できるようになる',
        shortTermGoal: 'HTML/CSSの基礎を習得し、レスポンシブなLPを作成できるようになる',
        needs: '・Web制作の基礎を学びたい\n・実践的なスキルを身につけたい\n・ポートフォリオを作成したい',
        supportContent: '・HTML/CSSの基礎から応用まで体系的に学習\n・レスポンシブデザインの実装方法を実習\n・SEO対策を含めたLP制作の実践'
      }
    ];

    setSupportPlans(mockSupportPlans);

    // --- リマインドロジック ---
    const today = new Date();
    const reminders = [];

    students.forEach(student => {
      const joinDate = new Date(student.joinDate);
      // 週次
      const weeklyEvals = mockEvaluations.filter(e => e.studentId === student.id && e.period === 'weekly' && e.status === 'completed');
      const lastWeeklyEval = weeklyEvals.length > 0 ? new Date(weeklyEvals.sort((a, b) => new Date(b.completedDate) - new Date(a.completedDate))[0].completedDate) : null;
      const daysSinceJoin = (today - joinDate) / (1000 * 60 * 60 * 24);
      const daysSinceLastWeekly = lastWeeklyEval ? (today - lastWeeklyEval) / (1000 * 60 * 60 * 24) : null;
      if (daysSinceJoin >= 7 && (!lastWeeklyEval || daysSinceLastWeekly >= 7)) {
        reminders.push({
          student,
          type: '週次評価',
          message: '週次評価が必要です',
        });
      }
      // 月次
      const monthlyEvals = mockEvaluations.filter(e => e.studentId === student.id && e.period === 'monthly' && e.status === 'completed');
      const lastMonthlyEval = monthlyEvals.length > 0 ? new Date(monthlyEvals.sort((a, b) => new Date(b.completedDate) - new Date(a.completedDate))[0].completedDate) : null;
      const daysSinceLastMonthly = lastMonthlyEval ? (today - lastMonthlyEval) / (1000 * 60 * 60 * 24) : null;
      if (daysSinceJoin >= 30 && (!lastMonthlyEval || daysSinceLastMonthly >= 30)) {
        reminders.push({
          student,
          type: '月次評価',
          message: '月次評価が必要です',
        });
      }
    });
    // リマインド対象者は動的に計算されるため、ここでは設定しない
  }, [students]);

  // 日々の記録管理に進む
  const goToDailyRecords = () => {
    navigate('/instructor/daily-records');
  };



  // タグ選択機能
  const handleTagSelect = (tag) => {
    setSelectedTags(prev => {
      if (prev.includes(tag)) {
        return prev.filter(t => t !== tag);
      } else {
        return [...prev, tag];
      }
    });
    setCurrentPage(1); // ページをリセット
  };

  // 利用可能なタグを取得
  const getAvailableTags = () => {
    const allTags = new Set();
    students.forEach(student => {
      student.tags?.forEach(tag => allTags.add(tag));
    });
    return Array.from(allTags).sort();
  };

  // 週次評価を開始
  const startWeeklyEvaluation = (student) => {
    setSelectedStudentForEvaluation(student);
    setShowWeeklyModal(true);
  };

  // 月次評価を開始
  const startMonthlyEvaluation = (student) => {
    setSelectedStudentForEvaluation(student);
    setShowMonthlyModal(true);
  };

  // 評価を開始（旧関数 - 後方互換性のため残す）
  const startEvaluation = (evaluationId) => {
    const evaluation = evaluations.find(e => e.id === evaluationId);
    alert(`${evaluation.studentName}の${evaluation.type}を開始します。`);
    // 実際の実装では評価画面に遷移
  };



  // PDF出力機能






  // 個別支援計画を取得
  const getStudentSupportPlan = (studentId) => {
    return supportPlans.find(plan => plan.studentId === studentId);
  };

  // 個別支援計画の期限チェック
  const getSupportPlanStatus = (plan) => {
    if (!plan) return { status: 'none', message: '未作成' };
    
    const today = new Date();
    const endDate = new Date(plan.endDate);
    const daysUntilEnd = (endDate - today) / (1000 * 60 * 60 * 24);
    
    if (plan.status === 'completed') {
      return { status: 'completed', message: '完了' };
    } else if (daysUntilEnd < 0) {
      return { status: 'expired', message: '期限切れ' };
    } else if (daysUntilEnd <= 7) {
      return { status: 'warning', message: `期限まで${Math.ceil(daysUntilEnd)}日` };
    } else {
      return { status: 'active', message: `期限まで${Math.ceil(daysUntilEnd)}日` };
    }
  };

  // 個別支援計画モーダルを開く
  const openSupportPlanModal = (student, plan = null) => {
    setSelectedStudentForPlan(student);
    setEditingPlan(plan);
    setShowSupportPlanModal(true);
  };

  // 個別支援計画を保存
  const saveSupportPlan = (planData) => {
    if (editingPlan) {
      // 編集
      setSupportPlans(prev => prev.map(plan => 
        plan.id === editingPlan.id ? { ...plan, ...planData } : plan
      ));
    } else {
      // 新規作成
      const newPlan = {
        id: `plan${Date.now()}`,
        studentId: selectedStudentForPlan.id,
        studentName: selectedStudentForPlan.name,
        ...planData
      };
      setSupportPlans(prev => [...prev, newPlan]);
    }
    setShowSupportPlanModal(false);
    setSelectedStudentForPlan(null);
    setEditingPlan(null);
  };

  // フィルタリングされた評価を取得
  const getFilteredEvaluations = () => {
    let filtered = students;

    // タグでフィルタリングのみ
    if (selectedTags.length > 0) {
      filtered = filtered.filter(student => 
        selectedTags.some(tag => student.tags?.includes(tag))
      );
    }

    return filtered;
  };

  // 生徒の評価状況を取得
  const getStudentEvaluationStatus = (studentId) => {
    const studentEvaluations = evaluations.filter(e => e.studentId === studentId);
    const weeklyEvaluations = studentEvaluations.filter(e => e.period === 'weekly' && e.status === 'completed');
    const monthlyEvaluations = studentEvaluations.filter(e => e.period === 'monthly' && e.status === 'completed');
    
    const lastWeeklyEval = weeklyEvaluations.length > 0 ? 
      weeklyEvaluations.sort((a, b) => new Date(b.completedDate) - new Date(a.completedDate))[0] : null;
    const lastMonthlyEval = monthlyEvaluations.length > 0 ? 
      monthlyEvaluations.sort((a, b) => new Date(b.completedDate) - new Date(a.completedDate))[0] : null;

    // リマインド判定（利用開始日ベース）
    const today = new Date();
    const student = students.find(s => s.id === studentId);
    const joinDate = student?.joinDate ? new Date(student.joinDate) : null;
    
    if (!joinDate) {
      return {
        status: '利用開始日未設定',
        lastWeeklyEval,
        lastMonthlyEval,
        needsWeekly: false,
        needsMonthly: false
      };
    }

    const daysSinceJoin = (today - joinDate) / (1000 * 60 * 60 * 24);
    
    const daysSinceLastWeekly = lastWeeklyEval ? 
      (today - new Date(lastWeeklyEval.completedDate)) / (1000 * 60 * 60 * 24) : null;
    const daysSinceLastMonthly = lastMonthlyEval ? 
      (today - new Date(lastMonthlyEval.completedDate)) / (1000 * 60 * 60 * 24) : null;

    // 利用開始日から1週間経過で週次評価、1ヶ月経過で月次評価
    const needsWeekly = daysSinceJoin >= 7 && (!lastWeeklyEval || daysSinceLastWeekly >= 7);
    const needsMonthly = daysSinceJoin >= 30 && (!lastMonthlyEval || daysSinceLastMonthly >= 30);

    let status = '評価済';
    if (needsWeekly && needsMonthly) {
      status = '未評価・週・月';
    } else if (needsWeekly) {
      status = '未評価・週';
    } else if (needsMonthly) {
      status = '未評価・月';
    }

    return {
      status,
      lastWeeklyEval,
      lastMonthlyEval,
      needsWeekly,
      needsMonthly,
      daysSinceJoin: Math.floor(daysSinceJoin)
    };
  };

  const filteredStudents = getFilteredEvaluations();

  // ページネーション計算
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

  // ページ変更
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 統計データ
  const pendingCount = evaluations.filter(e => e.status === 'pending').length;
  const completedCount = evaluations.filter(e => e.status === 'completed').length;
  const weeklyPendingCount = evaluations.filter(e => e.period === 'weekly' && e.status === 'pending').length;
  const monthlyPendingCount = evaluations.filter(e => e.period === 'monthly' && e.status === 'pending').length;

  return (
    <div className="home-support-evaluations">
      <div className="page-header">
        <div className="header-content">
          <h1>📊 在宅支援管理</h1>
          <p>在宅学習者の週次・月次達成度評価を管理し、評価スケジュールとレポートを効率的に管理できます。</p>
        </div>
        <button 
          className="back-btn"
          onClick={() => navigate('/instructor/dashboard')}
        >
          ← ダッシュボードに戻る
        </button>
      </div>



      {/* 評価統計を上部に移動 */}
      <div className="evaluation-summary">
        <div className="summary-card">
          <h4>📈 評価統計・リマインド</h4>
          <div className="summary-stats">
            <div className="stat-item">
              <span className="stat-label">未評価</span>
              <span className="stat-value pending">
                {pendingCount}件
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-label">完了</span>
              <span className="stat-value completed">
                {completedCount}件
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-label">今週の評価予定</span>
              <span className="stat-value">
                {weeklyPendingCount}件
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-label">今月の評価予定</span>
              <span className="stat-value">
                {monthlyPendingCount}件
              </span>
            </div>
          </div>
          {pendingCount > 0 && (
            <div className="reminder-message">
              ⚠️ {pendingCount}件の未評価があります。早めに評価を完了させてください。
            </div>
          )}
        </div>
      </div>

      <div className="management-actions">
        <button 
          className="action-btn primary daily-records-btn"
          onClick={goToDailyRecords}
        >
          📝 日々の記録管理
        </button>
      </div>



      {/* タグ選択エリア */}
      <div className="tags-filter-section">
        <label>タグで検索</label>
        <div className="tags-container">
          {getAvailableTags().map(tag => (
            <button
              key={tag}
              className={`tag-btn ${selectedTags.includes(tag) ? 'selected' : ''}`}
              onClick={() => handleTagSelect(tag)}
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
                <button 
                  className="remove-tag"
                  onClick={() => handleTagSelect(tag)}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="evaluations-container">
        <div className="evaluations-header">
          <h3>在宅一覧</h3>
          <span className="evaluation-count">
            {filteredStudents.length}件
          </span>
        </div>

        {filteredStudents.length === 0 ? (
          <div className="no-results">
            <p>該当する評価が見つかりません。</p>
          </div>
        ) : (
          <>
            {/* リスト形式での表示 */}
            <div className="evaluations-list">
              <div className="list-header">
                <div className="header-cell">氏名</div>
                <div className="header-cell">タグ</div>
                <div className="header-cell">個別支援計画</div>
                <div className="header-cell">利用開始日</div>
                <div className="header-cell">過去の評価日</div>
                <div className="header-cell">ステータス</div>
                <div className="header-cell">操作</div>
              </div>
              
                           {currentStudents.map(student => {
                 const { status, lastWeeklyEval, lastMonthlyEval } = getStudentEvaluationStatus(student.id);
                 const supportPlan = getStudentSupportPlan(student.id);
                 const planStatus = getSupportPlanStatus(supportPlan);
                 return (
                   <div key={student.id} className="list-row">
                     <div className="list-cell" data-label="氏名">
                       <span className="student-name">{student.name}</span>
                     </div>
                     <div className="list-cell" data-label="タグ">
                       <div className="student-tags">
                         {student.tags?.map((tag, index) => (
                           <span key={index} className="tag">{tag}</span>
                         ))}
                       </div>
                     </div>
                     <div className="list-cell" data-label="個別支援計画">
                       <div className="support-plan-section">
                         <button 
                           className={`support-plan-btn ${planStatus.status}`}
                           onClick={() => openSupportPlanModal(student, supportPlan)}
                         >
                           {supportPlan ? '📋 編集' : '➕ 新規作成'}
                         </button>
                         <div className={`plan-status ${planStatus.status}`}>
                           {planStatus.message}
                         </div>
                       </div>
                     </div>
                     <div className="list-cell" data-label="利用開始日">
                       <div className="start-date-info">
                         <div className="start-date">
                           {student.joinDate || '未設定'}
                         </div>
                         {student.joinDate && (
                           <div className="days-since-join">
                             {getStudentEvaluationStatus(student.id).daysSinceJoin}日経過
                           </div>
                         )}
                       </div>
                     </div>
                     <div className="list-cell" data-label="過去の評価日">
                       <div className="evaluation-dates">
                         <div className="date-item">
                           <span className="date-label">週次:</span>
                           <span className="date-value">
                             {lastWeeklyEval ? lastWeeklyEval.completedDate : '未実施'}
                           </span>
                         </div>
                         <div className="date-item">
                           <span className="date-label">月次:</span>
                           <span className="date-value">
                             {lastMonthlyEval ? lastMonthlyEval.completedDate : '未実施'}
                           </span>
                         </div>
                       </div>
                     </div>
                    <div className="list-cell" data-label="ステータス">
                      <span className={`status ${status}`}>
                        {status}
                      </span>
                    </div>
                    <div className="list-cell" data-label="操作">
                      <div className="action-buttons">
                        <button 
                          className="detail-btn"
                          onClick={() => navigate(`/instructor/student-detail/${student.id}`)}
                        >
                          📋 詳細管理
                        </button>
                        {status === '未評価・週' && (
                          <button 
                            className="evaluate-btn"
                            onClick={() => startWeeklyEvaluation(student)}
                          >
                            週次評価
                          </button>
                        )}
                        {status === '未評価・月' && (
                          <button 
                            className="evaluate-btn"
                            onClick={() => startMonthlyEvaluation(student)}
                          >
                            月次評価
                          </button>
                        )}
                        {status === '未評価・週・月' && (
                          <>
                            <button 
                              className="evaluate-btn"
                              onClick={() => startWeeklyEvaluation(student)}
                            >
                              週次評価
                            </button>
                            <button 
                              className="evaluate-btn"
                              onClick={() => startMonthlyEvaluation(student)}
                            >
                              月次評価
                            </button>
                          </>
                        )}


                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ページネーション */}
            {totalPages > 1 && (
              <div className="pagination">
                <button 
                  className="page-btn"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  前へ
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    className={`page-btn ${currentPage === page ? 'active' : ''}`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                ))}
                
                <button 
                  className="page-btn"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  次へ
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* 個別支援計画モーダル */}
      {showSupportPlanModal && (
        <SupportPlanModal
          student={selectedStudentForPlan}
          plan={editingPlan}
          onSave={saveSupportPlan}
          onClose={() => {
            setShowSupportPlanModal(false);
            setSelectedStudentForPlan(null);
            setEditingPlan(null);
          }}
        />
      )}

      {/* 週次評価モーダル */}
      {showWeeklyModal && selectedStudentForEvaluation && (
        <WeeklyEvaluationModal
          isOpen={true}
          student={selectedStudentForEvaluation}
          prevEvalDate={(() => {
            const status = getStudentEvaluationStatus(selectedStudentForEvaluation.id);
            return status.lastWeeklyEval ? status.lastWeeklyEval.completedDate : '';
          })()}
          defaultInstructor={selectedStudentForEvaluation.instructorName}
          onClose={() => {
            setShowWeeklyModal(false);
            setSelectedStudentForEvaluation(null);
          }}
          onSave={(evaluationData) => {
            console.log('週次評価データ:', evaluationData);
            setShowWeeklyModal(false);
            setSelectedStudentForEvaluation(null);
          }}
        />
      )}

      {/* 月次評価モーダル */}
      {showMonthlyModal && selectedStudentForEvaluation && (
        <MonthlyEvaluationModal
          isOpen={true}
          student={selectedStudentForEvaluation}
          prevEvalDate={(() => {
            const status = getStudentEvaluationStatus(selectedStudentForEvaluation.id);
            return status.lastMonthlyEval ? status.lastMonthlyEval.completedDate : '';
          })()}
          defaultInstructor={selectedStudentForEvaluation.instructorName}
          onClose={() => {
            setShowMonthlyModal(false);
            setSelectedStudentForEvaluation(null);
          }}
          onSave={(evaluationData) => {
            console.log('月次評価データ:', evaluationData);
            setShowMonthlyModal(false);
            setSelectedStudentForEvaluation(null);
          }}
        />
      )}
    </div>
  );
};

// 個別支援計画モーダルコンポーネント
const SupportPlanModal = ({ student, plan, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    startDate: plan?.startDate || new Date().toISOString().split('T')[0],
    endDate: plan?.endDate || '',
    longTermGoal: plan?.longTermGoal || '',
    shortTermGoal: plan?.shortTermGoal || '',
    needs: plan?.needs || '',
    supportContent: plan?.supportContent || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="support-plan-modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>📋 個別支援計画</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>{student?.name}の個別支援計画</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label>開始日</label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label>目標達成時期</label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                />
              </div>
            </div>

            <div className="form-group">
              <label>長期目標</label>
              <textarea
                value={formData.longTermGoal}
                onChange={(e) => setFormData(prev => ({ ...prev, longTermGoal: e.target.value }))}
                placeholder="例: しっかりと就労できるよう、心身の健康を維持する"
                rows="3"
              />
            </div>

            <div className="form-group">
              <label>短期目標</label>
              <textarea
                value={formData.shortTermGoal}
                onChange={(e) => setFormData(prev => ({ ...prev, shortTermGoal: e.target.value }))}
                placeholder="例: 新しい環境や就労のスタイルに慣れる"
                rows="3"
              />
            </div>

            <div className="form-group">
              <label>本人のニーズ</label>
              <textarea
                value={formData.needs}
                onChange={(e) => setFormData(prev => ({ ...prev, needs: e.target.value }))}
                placeholder="例: ・いずれはスキルアップしたい&#10;・天候が悪くなると頭痛などで体調が悪くなることがある"
                rows="4"
              />
            </div>

            <div className="form-group">
              <label>個別支援内容</label>
              <textarea
                value={formData.supportContent}
                onChange={(e) => setFormData(prev => ({ ...prev, supportContent: e.target.value }))}
                placeholder="具体的な支援内容を記載してください"
                rows="6"
              />
            </div>
          </div>

          <div className="modal-actions">
            <button type="submit" className="save-btn">
              {plan ? '更新' : '作成'}
            </button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              キャンセル
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HomeSupportEvaluationsPage; 