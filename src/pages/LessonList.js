import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LessonList.css';

const LessonList = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  // const [lessonProgress, setLessonProgress] = useState({});

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
          lessons: [
            {
              id: 'lesson001-1',
              title: 'Microsoft Wordの特徴と文書作成',
              description: '基本操作、文書の作成、保存方法。フォーマット設定、スタイルの適用、図形や画像の挿入',
              duration: '120分',
              order: 1,
              status: 'completed', // completed, in-progress, not-started
              testScore: 85,
              hasAssignment: false
            },
            {
              id: 'lesson001-2',
              title: 'Microsoft Excelの特徴と表計算',
              description: '基本操作、セルの入力、データの整形、数式の使用、基本的な関数の紹介',
              duration: '120分',
              order: 2,
              status: 'completed',
              testScore: 92,
              hasAssignment: false
            },
            {
              id: 'lesson001-3',
              title: 'Microsoft Excelを使用したデータ分析',
              description: '基本操作、セルの入力、データの整形、数式の使用、基本的な関数の紹介',
              duration: '120分',
              order: 3,
              status: 'in-progress',
              testScore: null,
              hasAssignment: true
            },
            {
              id: 'lesson001-4',
              title: 'Microsoft PowerPointでのプレゼンテーション作成',
              description: 'スライドの構成、デザインの基本、アニメーションやトランジションの追加',
              duration: '120分',
              order: 4,
              status: 'not-started',
              testScore: null,
              hasAssignment: false
            },
            {
              id: 'lesson001-5',
              title: 'Wordでのレポート作成',
              description: '文書の構成（見出し、段落、リスト）、実践課題: 簡単なレポートを作成',
              duration: '120分',
              order: 5,
              status: 'not-started',
              testScore: null,
              hasAssignment: true
            },
            {
              id: 'lesson001-6',
              title: '実務での活用方法と応用技術',
              description: '各ソフトの実務での具体的な活用事例の紹介、効率的な作業方法やショートカットキーの紹介',
              duration: '120分',
              order: 6,
              status: 'not-started',
              testScore: null,
              hasAssignment: false
            }
          ]
        },
        {
          id: 'course002',
          title: 'ITリテラシー・AIの基本',
          category: '必修科目',
          progress: 50,
          lessons: [
            {
              id: 'lesson002-1',
              title: 'Windows11の基本操作',
              description: 'ファイル操作、ショートカットキーの利用、ソフトウェアの使用方法',
              duration: '120分',
              order: 1,
              status: 'completed',
              testScore: 88,
              hasAssignment: false
            },
            {
              id: 'lesson002-2',
              title: 'インターネットの基礎',
              description: 'インターネットの仕組みと安全な利用、情報検索と信頼性の高い情報の見分け方',
              duration: '120分',
              order: 2,
              status: 'completed',
              testScore: 95,
              hasAssignment: false
            },
            {
              id: 'lesson002-3',
              title: 'AIの基本概念',
              description: 'AIの基本概念（AIとは何か、利用されている分野）',
              duration: '120分',
              order: 3,
              status: 'in-progress',
              testScore: null,
              hasAssignment: false
            },
            {
              id: 'lesson002-4',
              title: 'AIの活用例',
              description: 'AIの活用例（日常での利用例、Google検索や翻訳ツールの仕組み）、AIツールの体験',
              duration: '120分',
              order: 4,
              status: 'not-started',
              testScore: null,
              hasAssignment: true
            },
            {
              id: 'lesson002-5',
              title: 'プログラミングの基本',
              description: 'プログラミングの基本、ChatGPTなどのAIアシスタントの活用',
              duration: '120分',
              order: 5,
              status: 'not-started',
              testScore: null,
              hasAssignment: false
            },
            {
              id: 'lesson002-6',
              title: 'AIを使用した簡単なLP作成',
              description: 'AIを使用した簡単なLP作成、チャットボットの仕組みと作成',
              duration: '120分',
              order: 6,
              status: 'not-started',
              testScore: null,
              hasAssignment: true
            }
          ]
        }
      ];
      
      setEnrolledCourses(mockEnrolledCourses);
      if (mockEnrolledCourses.length > 0) {
        setSelectedCourse(mockEnrolledCourses[0]);
      }
    }
  }, []);

  // レッスン進行状況の取得
  const getLessonStatus = (lesson) => {
    switch (lesson.status) {
      case 'completed':
        return { label: '完了', class: 'completed', icon: '✅' };
      case 'in-progress':
        return { label: '進行中', class: 'in-progress', icon: '🔄' };
      case 'not-started':
        return { label: '未開始', class: 'not-started', icon: '⏳' };
      default:
        return { label: '未開始', class: 'not-started', icon: '⏳' };
    }
  };

  // レッスン学習へのリンク
  const handleStartLesson = (lesson) => {
    // レッスン番号を取得（orderを使用）
    const lessonNumber = lesson.order;
    
    // 学習画面に遷移（レッスン番号をパラメータとして渡す）
    navigate(`/student/learning?lesson=${lessonNumber}`);
  };

  // 改善版レッスン学習へのリンク
  const handleStartEnhancedLesson = (lesson) => {
    // レッスン番号を取得（orderを使用）
    const lessonNumber = lesson.order;
    
    // 改善版学習画面に遷移（レッスン番号をパラメータとして渡す）
    navigate(`/student/enhanced-learning?lesson=${lessonNumber}`);
  };

  // 高度なレッスン学習へのリンク
  const handleStartAdvancedLesson = (lesson) => {
    // レッスン番号を取得（orderを使用）
    const lessonNumber = lesson.order;
    
    // 高度な学習画面に遷移（レッスン番号をパラメータとして渡す）
    navigate(`/student/advanced-learning?lesson=${lessonNumber}`);
  };

  // テスト受講・復習へのリンク
  const handleTakeTest = (lesson) => {
    if (lesson.status === 'completed') {
      alert(`レッスン「${lesson.title}」のテスト復習を開始します。\n前回のスコア: ${lesson.testScore}点`);
    } else {
      alert(`レッスン「${lesson.title}」のテストを受講します。`);
    }
  };

  // 課題提出へのリンク
  const handleSubmitAssignment = (lesson) => {
    alert(`レッスン「${lesson.title}」の課題提出画面を開きます。`);
  };

  if (!currentUser || enrolledCourses.length === 0) {
    return (
      <div className="lesson-list">
        <div className="lesson-list-header">
          <h2>レッスン一覧</h2>
          <p>受講中のコースのレッスンを確認できます</p>
        </div>
        <div className="no-courses">
          <p>現在受講中のコースがありません。</p>
        </div>
      </div>
    );
  }

  return (
    <div className="lesson-list">
      <div className="lesson-list-header">
        <h2>レッスン一覧</h2>
        <p>受講中のコースのレッスンを確認できます</p>
      </div>

      {/* コース選択フィルター */}
      <div className="course-selector">
        <label htmlFor="course-select">コースを選択:</label>
        <select 
          id="course-select"
          value={selectedCourse?.id || ''}
          onChange={(e) => {
            const course = enrolledCourses.find(c => c.id === e.target.value);
            setSelectedCourse(course);
          }}
        >
          {enrolledCourses.map(course => (
            <option key={course.id} value={course.id}>
              {course.title} (進捗: {course.progress}%)
            </option>
          ))}
        </select>
      </div>

      {selectedCourse && (
        <div className="course-info">
          <h3>{selectedCourse.title}</h3>
          <div className="course-progress">
            <span>全体進捗: {selectedCourse.progress}%</span>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${selectedCourse.progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* レッスン一覧 */}
      {selectedCourse && (
        <div className="lessons-container">
          <div className="lessons-grid">
            {selectedCourse.lessons.map(lesson => {
              const status = getLessonStatus(lesson);
              return (
                <div key={lesson.id} className={`lesson-card ${status.class}`}>
                  <div className="lesson-header">
                    <div className="lesson-order">
                      <span className="order-badge">第{lesson.order}回</span>
                    </div>
                    <div className="lesson-status">
                      <span className={`status-badge ${status.class}`}>
                        {status.icon} {status.label}
                      </span>
                    </div>
                  </div>

                  <div className="lesson-content">
                    <h4 className="lesson-title">{lesson.title}</h4>
                    <p className="lesson-description">{lesson.description}</p>
                    <div className="lesson-meta">
                      <span className="duration">⏱️ {lesson.duration}</span>
                      {lesson.testScore !== null && (
                        <span className="test-score">📊 テスト: {lesson.testScore}点</span>
                      )}
                    </div>
                  </div>

                  <div className="lesson-actions">
                    <button 
                      className="action-btn primary"
                      onClick={() => handleStartLesson(lesson)}
                    >
                      📖 レッスン学習
                    </button>
                    
                    <button 
                      className="action-btn enhanced"
                      onClick={() => handleStartEnhancedLesson(lesson)}
                    >
                      🚀 改善版学習
                    </button>
                    
                    <button 
                      className="action-btn advanced"
                      onClick={() => handleStartAdvancedLesson(lesson)}
                    >
                      ⭐ 高度な学習
                    </button>
                    
                    <button 
                      className="action-btn secondary"
                      onClick={() => handleTakeTest(lesson)}
                    >
                      {lesson.status === 'completed' ? '🔄 テスト復習' : '📝 テスト受講'}
                    </button>

                    {lesson.hasAssignment && (
                      <button 
                        className="action-btn assignment"
                        onClick={() => handleSubmitAssignment(lesson)}
                      >
                        📋 課題提出
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonList; 