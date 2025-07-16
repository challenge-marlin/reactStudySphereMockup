import React from 'react';
import './ClassOverview.css';

const ClassOverview = ({ teacherId }) => {
  // モックデータ
  const classStats = {
    totalStudents: 15,
    activeStudents: 12,
    averageProgress: 68,
    completedCourses: 23,
    pendingAssignments: 8
  };

  const recentStudentActivity = [
    { name: '鈴木太郎', action: 'Microsoft Excelを使用したデータ分析を完了', time: '30分前', progress: 75 },
    { name: '田中花子', action: '課題「Excelデータ分析レポート」を提出', time: '1時間前', progress: 60 },
    { name: '山田次郎', action: 'ITリテラシー・AIの基本コースを開始', time: '2時間前', progress: 85 },
    { name: '佐藤美香', action: 'テスト「インターネットの基礎」で90点獲得', time: '3時間前', progress: 55 }
  ];

  const upcomingDeadlines = [
    { title: 'オフィスソフトの操作・文書作成 - 最終課題', dueDate: '2024-01-20', studentsCount: 8 },
    { title: 'ITリテラシー・AIの基本 - 中間テスト', dueDate: '2024-01-22', studentsCount: 6 },
    { title: 'SNS運用の基礎・画像生成編集 - プロジェクト発表', dueDate: '2024-01-25', studentsCount: 5 }
  ];

  return (
    <div className="class-overview">
      <div className="overview-header">
        <h2>指導員概要</h2>
        <p>担当生徒の個別学習状況を確認できます</p>
      </div>

      {/* 統計カード */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>総生徒数</h3>
            <p className="stat-number">{classStats.totalStudents}</p>
            <small>アクティブ: {classStats.activeStudents}名</small>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <h3>平均進捗</h3>
            <p className="stat-number">{classStats.averageProgress}%</p>
            <small>全体平均</small>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>完了コース</h3>
            <p className="stat-number">{classStats.completedCourses}</p>
            <small>累計完了数</small>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📝</div>
          <div className="stat-content">
            <h3>課題待ち</h3>
            <p className="stat-number">{classStats.pendingAssignments}</p>
            <small>提出待ち課題</small>
          </div>
        </div>
      </div>

      {/* 最近の活動 */}
      <div className="recent-activity-section">
        <h3>最近の活動</h3>
        <div className="activity-list">
          {recentStudentActivity.map((activity, index) => (
            <div key={index} className="activity-item">
              <div className="activity-avatar">
                {activity.name.charAt(0)}
              </div>
              <div className="activity-content">
                <div className="activity-name">{activity.name}</div>
                <div className="activity-action">{activity.action}</div>
                <div className="activity-meta">
                  <span className="activity-time">{activity.time}</span>
                  <span className="activity-progress">進捗: {activity.progress}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 期限が近い課題 */}
      <div className="deadlines-section">
        <h3>期限が近い課題</h3>
        <div className="deadlines-list">
          {upcomingDeadlines.map((deadline, index) => (
            <div key={index} className="deadline-item">
              <div className="deadline-info">
                <h4>{deadline.title}</h4>
                <p>期限: {deadline.dueDate}</p>
                <span className="student-count">{deadline.studentsCount}名対象</span>
              </div>
              <button className="view-details-btn">詳細を見る</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassOverview; 