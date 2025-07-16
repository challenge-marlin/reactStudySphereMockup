import React, { useState, useEffect } from 'react';
// import ProgressCard from '../components/ProgressCard';
import RecentActivity from '../components/RecentActivity';
import './Dashboard.css';

const Dashboard = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [completedCourses, setCompletedCourses] = useState([]);
  const [nextLesson, setNextLesson] = useState(null);
  const [pendingApprovals, setPendingApprovals] = useState([]);

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      const userData = JSON.parse(user);
      setCurrentUser(userData);
      
      // 生徒の受講コースを取得（モックデータ）
      const mockEnrolledCourses = [
        {
          id: 'course001',
          title: 'オフィスソフトの操作・文書作成',
          category: '選択科目',
          progress: 75,
          totalLessons: 6,
          completedLessons: 4,
          nextLesson: {
            id: 'lesson001-4',
            title: 'Microsoft PowerPointでのプレゼンテーション作成',
            courseTitle: 'オフィスソフトの操作・文書作成'
          }
        },
        {
          id: 'course002',
          title: 'ITリテラシー・AIの基本',
          category: '必修科目',
          progress: 50,
          totalLessons: 6,
          completedLessons: 3,
          nextLesson: {
            id: 'lesson002-4',
            title: 'AIの活用例',
            courseTitle: 'ITリテラシー・AIの基本'
          }
        }
      ];
      
      // 修了コース（モックデータ）
      const mockCompletedCourses = [
        {
          id: 'course003',
          title: 'SNS運用の基礎・画像生成編集',
          category: '必修科目',
          completedDate: '2024-01-10',
          finalScore: 92
        }
      ];
      
      setEnrolledCourses(mockEnrolledCourses);
      setCompletedCourses(mockCompletedCourses);
      
      // 次に受講すべきレッスンを設定
      if (mockEnrolledCourses.length > 0) {
        setNextLesson(mockEnrolledCourses[0].nextLesson);
      }

      // 判定依頼中のテスト（モックデータ）
      const mockPendingApprovals = [
        {
          id: 'approval001',
          courseTitle: 'ITリテラシー・AIの基本',
          lessonTitle: '第3回　AIの仕組みや基本用語を学ぶ',
          testScore: 85,
          submittedDate: '2024-01-15',
          status: 'pending',
          instructorName: '山田 指導員'
        },
        {
          id: 'approval002',
          courseTitle: 'オフィスソフトの操作・文書作成',
          lessonTitle: '第2回　Microsoft Wordでの文書作成',
          testScore: 92,
          submittedDate: '2024-01-14',
          status: 'pending',
          instructorName: '田中 指導員'
        }
      ];
      
      setPendingApprovals(mockPendingApprovals);
    }
  }, []);

  // 最新の活動データ
  const recentActivities = [
    { 
      title: 'Microsoft Excelを使用したデータ分析', 
      date: '2024-01-15', 
      type: 'lesson',
      course: 'オフィスソフトの操作・文書作成',
      status: '完了'
    },
    { 
      title: '課題: Excelデータ分析レポート', 
      date: '2024-01-14', 
      type: 'assignment',
      course: 'オフィスソフトの操作・文書作成',
      status: '提出済み'
    },
    { 
      title: 'AIの基本概念', 
      date: '2024-01-13', 
      type: 'lesson',
      course: 'ITリテラシー・AIの基本',
      status: '進行中'
    },
    { 
      title: 'テスト: インターネットの基礎', 
      date: '2024-01-12', 
      type: 'test',
      course: 'ITリテラシー・AIの基本',
      status: '95点'
    },
  ];

  const handleStartNextLesson = () => {
    if (nextLesson) {
      alert(`レッスン「${nextLesson.title}」の学習を開始します。\nコース: ${nextLesson.courseTitle}`);
    }
  };

  const handleViewCourse = (courseId) => {
    alert(`コース「${enrolledCourses.find(c => c.id === courseId)?.title}」の詳細を表示します。`);
  };

  const handleViewCompletedCourse = (courseId) => {
    const course = completedCourses.find(c => c.id === courseId);
    alert(`修了コース「${course?.title}」の詳細を表示します。\n修了日: ${course?.completedDate}\n最終スコア: ${course?.finalScore}点`);
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>ダッシュボード</h2>
        <p>おかえりなさい、{currentUser.name}さん！学習を続けましょう。</p>
      </div>
      
      <div className="dashboard-grid">
        {/* 現在利用コースセクション */}
        <section className="current-courses-section">
          <h3>📚 現在利用コース</h3>
          <div className="current-courses">
            {enrolledCourses.map((course) => (
              <div key={course.id} className="course-card">
                <div className="course-header">
                  <h4>{course.title}</h4>
                  <span className="course-category">{course.category}</span>
                </div>
                <div className="course-progress">
                  <div className="progress-info">
                    <span>進捗: {course.progress}%</span>
                    <span>{course.completedLessons}/{course.totalLessons} レッスン完了</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
                <button 
                  className="view-course-btn"
                  onClick={() => handleViewCourse(course.id)}
                >
                  詳細を見る
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* 最新学習へのリンク */}
        {nextLesson && (
          <section className="next-lesson-section">
            <h3>🎯 次に学習するレッスン</h3>
            <div className="next-lesson-card">
              <div className="next-lesson-info">
                <h4>{nextLesson.title}</h4>
                <p className="course-name">{nextLesson.courseTitle}</p>
                <p className="lesson-description">
                  このレッスンでは、PDF資料の閲覧、動画の視聴、テストの受講を行います。
                </p>
              </div>
              <button 
                className="start-lesson-btn"
                onClick={handleStartNextLesson}
              >
                📖 学習を開始
              </button>
            </div>
          </section>
        )}

        {/* 判定依頼中セクション */}
        {pendingApprovals.length > 0 && (
          <section className="pending-approvals-section">
            <h3>⏳ 判定依頼中</h3>
            <div className="pending-approvals">
              {pendingApprovals.map((approval) => (
                <div key={approval.id} className="approval-card">
                  <div className="approval-header">
                    <h4>{approval.lessonTitle}</h4>
                    <span className="approval-status pending">判定待ち</span>
                  </div>
                  <div className="approval-info">
                    <p className="course-name">{approval.courseTitle}</p>
                    <div className="approval-details">
                      <span>テストスコア: {approval.testScore}点</span>
                      <span>提出日: {approval.submittedDate}</span>
                      <span>担当指導員: {approval.instructorName}</span>
                    </div>
                  </div>
                  <div className="approval-message">
                    <p>テストに合格しました。指導員の承認をお待ちしています。</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 修了コースセクション */}
        {completedCourses.length > 0 && (
          <section className="completed-courses-section">
            <h3>🏆 修了コース</h3>
            <div className="completed-courses">
              {completedCourses.map((course) => (
                <div key={course.id} className="completed-course-card">
                  <div className="course-header">
                    <h4>{course.title}</h4>
                    <span className="course-category">{course.category}</span>
                  </div>
                  <div className="completion-info">
                    <span>修了日: {course.completedDate}</span>
                    <span>最終スコア: {course.finalScore}点</span>
                  </div>
                  <button 
                    className="view-completed-btn"
                    onClick={() => handleViewCompletedCourse(course.id)}
                  >
                    詳細を見る
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 最近の活動 */}
        <section className="activity-section">
          <h3>📈 最近の活動</h3>
          <RecentActivity activities={recentActivities} />
        </section>
      </div>
    </div>
  );
};

export default Dashboard; 