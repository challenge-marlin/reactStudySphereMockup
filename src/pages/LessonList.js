import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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

  // テスト受験へのリンク
  const handleTakeTest = (lesson) => {
    // レッスン番号を取得（orderを使用）
    const lessonNumber = lesson.order;
    
    // テスト画面に遷移（レッスン番号をパラメータとして渡す）
    navigate(`/student/test?lesson=${lessonNumber}`);
  };

  // 課題提出へのリンク
  const handleSubmitAssignment = (lesson) => {
    alert(`${lesson.title}の課題提出機能は開発中です。`);
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
        <div className="text-blue-600 text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-6">
      {/* ヘッダー */}
      <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
              📚 レッスン一覧
            </h2>
            <p className="text-lg text-gray-600">{currentUser.name}さんの受講コース</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
              {enrolledCourses.length}コース受講中
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* コース選択サイドバー */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4">受講コース</h3>
            <div className="space-y-3">
              {enrolledCourses.map(course => (
                <button
                  key={course.id}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${
                    selectedCourse?.id === course.id
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg'
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                  }`}
                  onClick={() => setSelectedCourse(course)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-sm">{course.title}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      selectedCourse?.id === course.id
                        ? 'bg-white bg-opacity-20'
                        : course.category === '必修科目'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-blue-100 text-blue-800'
                    }`}>
                      {course.category}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        selectedCourse?.id === course.id
                          ? 'bg-white'
                          : 'bg-gradient-to-r from-blue-400 to-cyan-500'
                      }`}
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <div className="text-xs mt-1 opacity-75">
                    進捗: {course.progress}%
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* レッスン一覧 */}
        <div className="lg:col-span-3">
          {selectedCourse && (
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{selectedCourse.title}</h3>
                  <p className="text-gray-600">{selectedCourse.lessons.length}レッスン</p>
                </div>
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  selectedCourse.category === '必修科目'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {selectedCourse.category}
                </span>
              </div>

              <div className="space-y-4">
                {selectedCourse.lessons.map((lesson, index) => {
                  const status = getLessonStatus(lesson);
                  return (
                    <div key={lesson.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-200">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-4 flex-1">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                            lesson.status === 'completed'
                              ? 'bg-green-500'
                              : lesson.status === 'in-progress'
                                ? 'bg-blue-500'
                                : 'bg-gray-400'
                          }`}>
                            {lesson.order}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800 mb-2">{lesson.title}</h4>
                            <p className="text-gray-600 text-sm mb-3">{lesson.description}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span>⏱️ {lesson.duration}</span>
                              {lesson.testScore && (
                                <span className="text-green-600 font-medium">📊 テスト: {lesson.testScore}点</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            lesson.status === 'completed'
                              ? 'bg-green-100 text-green-800'
                              : lesson.status === 'in-progress'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-gray-100 text-gray-600'
                          }`}>
                            {status.icon} {status.label}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <button
                          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                          onClick={() => handleStartLesson(lesson)}
                        >
                          🎓 学習開始
                        </button>
                        <button
                          className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                          onClick={() => handleStartEnhancedLesson(lesson)}
                        >
                          🚀 改善版学習
                        </button>
                        <button
                          className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                          onClick={() => handleStartAdvancedLesson(lesson)}
                        >
                          ⭐ 高度な学習
                        </button>
                        {lesson.status === 'completed' && (
                          <button
                            className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                            onClick={() => handleTakeTest(lesson)}
                          >
                            📝 テスト受験
                          </button>
                        )}
                        {lesson.hasAssignment && (
                          <button
                            className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
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
      </div>
    </div>
  );
};

export default LessonList; 