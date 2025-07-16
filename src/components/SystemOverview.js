import React from 'react';
import './SystemOverview.css';

const SystemOverview = () => {
  // カリキュラムデータ（コース管理から移動）
  const courses = [
    {
      id: 'course001',
      title: 'オフィスソフトの操作・文書作成',
      category: '選択科目',
      description: 'Word、Excel、PowerPointの基本操作を学び、実務で使える文書作成スキルを習得',
      duration: '3ヶ月',
      difficulty: 'beginner',
      totalLessons: 6,
      enrolledStudents: 12,
      completionRate: 85,
      status: 'active',
      createdDate: '2023-06-01',
      lastUpdated: '2024-01-10',
      instructor: '佐藤指導員',
      tags: ['Word', 'Excel', 'PowerPoint', '文書作成', '選択科目'],
      isElective: true, // 選択科目フラグ
      prerequisites: [], // 前提コースなし
      order: 0 // 受講順序（選択科目は0）
    },
    {
      id: 'course002',
      title: 'ITリテラシー・AIの基本',
      category: '必修科目',
      description: 'ITの基礎知識とAIの基本概念を学び、デジタル社会で活躍するための土台を構築',
      duration: '3ヶ月',
      difficulty: 'beginner',
      totalLessons: 6,
      enrolledStudents: 15,
      completionRate: 78,
      status: 'active',
      createdDate: '2023-08-01',
      lastUpdated: '2024-01-12',
      instructor: '田中指導員',
      tags: ['IT基礎', 'AI', 'Windows11', 'インターネット', '必修科目'],
      isElective: false,
      prerequisites: [],
      order: 1
    },
    {
      id: 'course003',
      title: 'SNS運用の基礎・画像生成編集',
      category: '必修科目',
      description: 'SNSマーケティングの基礎と画像編集技術を学び、効果的なコンテンツ作成スキルを習得',
      duration: '6ヶ月',
      difficulty: 'intermediate',
      totalLessons: 12,
      enrolledStudents: 8,
      completionRate: 65,
      status: 'active',
      createdDate: '2023-09-01',
      lastUpdated: '2024-01-08',
      instructor: '山田指導員',
      tags: ['SNS', 'マーケティング', 'Canva', 'Recraft', 'AI画像生成'],
      isElective: false,
      prerequisites: ['course002'], // ITリテラシーが前提
      order: 2
    },
    {
      id: 'course004',
      title: 'LP制作(HTML・CSS)',
      category: '必修科目',
      description: 'HTML・CSSを使ったランディングページ制作技術を学び、Web制作の実践スキルを習得',
      duration: '3ヶ月',
      difficulty: 'intermediate',
      totalLessons: 12,
      enrolledStudents: 6,
      completionRate: 72,
      status: 'active',
      createdDate: '2023-10-01',
      lastUpdated: '2024-01-05',
      instructor: '鈴木指導員',
      tags: ['HTML', 'CSS', 'LP制作', 'レスポンシブ', 'Web制作'],
      isElective: false,
      prerequisites: ['course003'], // SNS運用が前提
      order: 3
    },
    {
      id: 'course005',
      title: 'SNS管理代行・LP制作案件対応',
      category: '必修科目',
      description: '実際の案件を想定したSNS管理代行とLP制作の実践的なスキルを習得',
      duration: '3ヶ月',
      difficulty: 'advanced',
      totalLessons: 12,
      enrolledStudents: 4,
      completionRate: 45,
      status: 'active',
      createdDate: '2023-11-01',
      lastUpdated: '2024-01-03',
      instructor: '高橋指導員',
      tags: ['案件対応', 'プロジェクト管理', 'クライアント対応', '実践'],
      isElective: false,
      prerequisites: ['course004'], // LP制作が前提
      order: 4
    }
  ];

  // カリキュラムパスを取得
  const getCurriculumPath = () => {
    const requiredCourses = courses
      .filter(course => !course.isElective)
      .sort((a, b) => a.order - b.order);
    
    const electiveCourses = courses.filter(course => course.isElective);
    
    return { required: requiredCourses, elective: electiveCourses };
  };
  // モックデータ
  const systemStats = {
    totalInstructors: 5,
    totalStudents: 23,
    activeCourses: 8,
    totalCourses: 12,
    monthlyActiveUsers: 28,
    totalFacilities: 2,
    totalLocations: 3
  };

  const studentSummary = {
    byFacility: [
      { 
        facilityName: 'スタディスフィア東京校', 
        locations: [
          { locationName: '東京本校', studentCount: 15, activeStudents: 13 },
          { locationName: '新宿サテライト', studentCount: 5, activeStudents: 4 }
        ]
      },
      { 
        facilityName: 'スタディスフィア大阪校', 
        locations: [
          { locationName: '大阪支校', studentCount: 8, activeStudents: 7 }
        ]
      }
    ],
    byCourse: [
      { courseName: 'ITリテラシー・AIの基本', enrolledStudents: 15, completionRate: 78 },
      { courseName: 'SNS運用の基礎・画像生成編集', enrolledStudents: 8, completionRate: 65 },
      { courseName: 'LP制作(HTML・CSS)', enrolledStudents: 12, completionRate: 85 },
      { courseName: 'SNS管理代行・LP制作案件対応', enrolledStudents: 6, completionRate: 45 }
    ]
  };

  const alerts = [
    { 
      type: 'warning', 
      title: 'SNS管理代行・LP制作案件対応コースの完了率が低下', 
      message: '完了率45%と他コースに比べて低い状態です', 
      priority: 'high',
      time: '2時間前'
    },
    { 
      type: 'info', 
      title: '新宿サテライトの稼働率が高い', 
      message: '定員に対して80%の利用率となっています', 
      priority: 'medium',
      time: '4時間前'
    },
    { 
      type: 'success', 
      title: 'LP制作(HTML・CSS)コースが好調', 
      message: '完了率85%で最も高い成果を上げています', 
      priority: 'low',
      time: '6時間前'
    }
  ];

  const recentActivity = [
    { type: 'instructor', action: '新しい指導員が登録されました', user: '鈴木指導員', time: '2時間前' },
    { type: 'student', action: '生徒が新しいコースを開始しました', user: '田中花子', time: '3時間前' },
    { type: 'course', action: 'コースが完了されました', user: '山田太郎', time: '5時間前' },
    { type: 'system', action: 'システムメンテナンスが完了しました', user: 'システム', time: '1日前' }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'instructor': return '👨‍🏫';
      case 'student': return '👥';
      case 'course': return '📚';
      case 'system': return '⚙️';
      default: return '📋';
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      case 'success': return '✅';
      case 'error': return '❌';
      default: return 'ℹ️';
    }
  };

  const getAlertClass = (type) => {
    switch (type) {
      case 'warning': return 'alert-warning';
      case 'info': return 'alert-info';
      case 'success': return 'alert-success';
      case 'error': return 'alert-error';
      default: return 'alert-info';
    }
  };

  return (
    <div className="system-overview">
      <div className="overview-header">
        <h2>システム概要</h2>
        <p>Study Sphereの全体的な利用状況とアラート情報をご確認いただけます</p>
      </div>

      {/* アラートセクション */}
      <div className="alerts-section">
        <h3>📢 システムアラート</h3>
        <div className="alerts-list">
          {alerts.map((alert, index) => (
            <div key={index} className={`alert-item ${getAlertClass(alert.type)}`}>
              <div className="alert-icon">{getAlertIcon(alert.type)}</div>
              <div className="alert-content">
                <div className="alert-header">
                  <h4>{alert.title}</h4>
                  <span className="alert-time">{alert.time}</span>
                </div>
                <p>{alert.message}</p>
              </div>
              <div className={`alert-priority ${alert.priority}`}>
                {alert.priority === 'high' ? '高' : alert.priority === 'medium' ? '中' : '低'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* システム統計 */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👨‍🏫</div>
          <div className="stat-content">
            <h3>{systemStats.totalInstructors}</h3>
            <p>登録指導員数</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>{systemStats.totalStudents}</h3>
            <p>登録生徒数</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-content">
            <h3>{systemStats.activeCourses}/{systemStats.totalCourses}</h3>
            <p>アクティブコース</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">🏢</div>
          <div className="stat-content">
            <h3>{systemStats.totalFacilities}</h3>
            <p>事業所数</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📍</div>
          <div className="stat-content">
            <h3>{systemStats.totalLocations}</h3>
            <p>拠点数</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <h3>{systemStats.monthlyActiveUsers}</h3>
            <p>月間アクティブユーザー</p>
          </div>
        </div>
      </div>

      <div className="overview-content">
        {/* 生徒サマリー */}
        <section className="student-summary-section">
          <h3>📊 生徒サマリー</h3>
          
          <div className="summary-tabs">
            <div className="facility-summary">
              <h4>事業所・拠点別</h4>
              {studentSummary.byFacility.map((facility, index) => (
                <div key={index} className="facility-item">
                  <h5>{facility.facilityName}</h5>
                  {facility.locations.map((location, locIndex) => (
                    <div key={locIndex} className="location-item">
                      <div className="location-info">
                        <span className="location-name">{location.locationName}</span>
                        <span className="student-count">
                          {location.studentCount}名 
                          <small>（アクティブ: {location.activeStudents}名）</small>
                        </span>
                      </div>
                      <div className="activity-bar">
                        <div 
                          className="activity-fill"
                          style={{ width: `${(location.activeStudents / location.studentCount) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="course-summary">
              <h4>コース別受講状況</h4>
              {studentSummary.byCourse.map((course, index) => (
                <div key={index} className="course-item">
                  <div className="course-info">
                    <span className="course-name">{course.courseName}</span>
                    <span className="enrollment-info">
                      {course.enrolledStudents}名受講 | 完了率 {course.completionRate}%
                    </span>
                  </div>
                  <div className="completion-bar">
                    <div 
                      className="completion-fill"
                      style={{ width: `${course.completionRate}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* カリキュラムパス表示 */}
        <section className="curriculum-path-section">
          <h3>📚 カリキュラムパス</h3>
          
          <div className="curriculum-display">
            {/* 必修科目の受講順序 */}
            <div className="required-courses">
              <h4>必修科目（受講順序）</h4>
              <div className="course-flow">
                {getCurriculumPath().required.map((course, index) => (
                  <div key={course.id} className="course-flow-item">
                    <div className={`course-node ${course.status}`}>
                      <div className="course-order">{course.order}</div>
                      <div className="course-title">{course.title}</div>
                      <div className="course-duration">{course.duration}</div>
                      <div className="course-students">{course.enrolledStudents}名受講中</div>
                    </div>
                    {index < getCurriculumPath().required.length - 1 && (
                      <div className="flow-arrow">→</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 選択科目 */}
            <div className="elective-courses">
              <h4>選択科目（いつでも受講可能）</h4>
              <div className="elective-list">
                {getCurriculumPath().elective.map(course => (
                  <div key={course.id} className={`elective-node ${course.status}`}>
                    <div className="course-title">{course.title}</div>
                    <div className="course-duration">{course.duration}</div>
                    <div className="course-students">{course.enrolledStudents}名受講中</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 最近のアクティビティ */}
        <section className="recent-activity-section">
          <h3>🕒 最近のアクティビティ</h3>
          <div className="activity-list">
            {recentActivity.map((activity, index) => (
              <div key={index} className="activity-item">
                <div className="activity-icon">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="activity-details">
                  <p className="activity-text">
                    <strong>{activity.user}</strong> - {activity.action}
                  </p>
                  <small className="activity-time">{activity.time}</small>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default SystemOverview; 