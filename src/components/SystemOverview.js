import React from 'react';

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

  const getAlertBgColor = (type) => {
    switch (type) {
      case 'warning': return 'bg-yellow-50 border-l-yellow-400';
      case 'info': return 'bg-blue-50 border-l-blue-400';
      case 'success': return 'bg-green-50 border-l-green-400';
      case 'error': return 'bg-red-50 border-l-red-400';
      default: return 'bg-blue-50 border-l-blue-400';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-500 text-white';
      case 'medium': return 'bg-yellow-500 text-gray-800';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="bg-white rounded-xl p-8 shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">システム概要</h2>
        <p className="text-gray-600">Study Sphereの全体的な利用状況とアラート情報をご確認いただけます</p>
      </div>

      {/* アラートセクション */}
      <div className="bg-gray-50 rounded-xl p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">📢 システムアラート</h3>
        <div className="space-y-4">
          {alerts.map((alert, index) => (
            <div key={index} className={`flex items-center p-4 rounded-lg border-l-4 ${getAlertBgColor(alert.type)} shadow-sm hover:translate-x-1 transition-transform duration-200`}>
              <div className="text-2xl mr-4">{getAlertIcon(alert.type)}</div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold text-gray-800">{alert.title}</h4>
                  <span className="text-sm text-gray-500">{alert.time}</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{alert.message}</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-semibold min-w-[30px] text-center ${getPriorityColor(alert.priority)}`}>
                {alert.priority === 'high' ? '高' : alert.priority === 'medium' ? '中' : '低'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* システム統計 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 flex items-center gap-4 border border-green-200 hover:-translate-y-1 transition-transform duration-200">
          <div className="text-4xl">👨‍🏫</div>
          <div>
            <h3 className="text-3xl font-bold text-green-600">{systemStats.totalInstructors}</h3>
            <p className="text-green-700 font-medium text-sm">登録指導員数</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 flex items-center gap-4 border border-blue-200 hover:-translate-y-1 transition-transform duration-200">
          <div className="text-4xl">👥</div>
          <div>
            <h3 className="text-3xl font-bold text-blue-600">{systemStats.totalStudents}</h3>
            <p className="text-blue-700 font-medium text-sm">登録生徒数</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 flex items-center gap-4 border border-purple-200 hover:-translate-y-1 transition-transform duration-200">
          <div className="text-4xl">📚</div>
          <div>
            <h3 className="text-3xl font-bold text-purple-600">{systemStats.activeCourses}/{systemStats.totalCourses}</h3>
            <p className="text-purple-700 font-medium text-sm">アクティブコース</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 flex items-center gap-4 border border-orange-200 hover:-translate-y-1 transition-transform duration-200">
          <div className="text-4xl">🏢</div>
          <div>
            <h3 className="text-3xl font-bold text-orange-600">{systemStats.totalFacilities}</h3>
            <p className="text-orange-700 font-medium text-sm">事業所数</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6 flex items-center gap-4 border border-indigo-200 hover:-translate-y-1 transition-transform duration-200">
          <div className="text-4xl">📍</div>
          <div>
            <h3 className="text-3xl font-bold text-indigo-600">{systemStats.totalLocations}</h3>
            <p className="text-indigo-700 font-medium text-sm">拠点数</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-6 flex items-center gap-4 border border-pink-200 hover:-translate-y-1 transition-transform duration-200">
          <div className="text-4xl">📈</div>
          <div>
            <h3 className="text-3xl font-bold text-pink-600">{systemStats.monthlyActiveUsers}</h3>
            <p className="text-pink-700 font-medium text-sm">月間アクティブユーザー</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 生徒サマリー */}
        <section className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">📊 生徒サマリー</h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-medium text-gray-700 mb-4 pb-2 border-b-2 border-gray-200">事業所・拠点別</h4>
              {studentSummary.byFacility.map((facility, index) => (
                <div key={index} className="mb-4">
                  <h5 className="font-semibold text-gray-800 mb-2">{facility.facilityName}</h5>
                  {facility.locations.map((location, locIndex) => (
                    <div key={locIndex} className="flex justify-between items-center p-3 bg-white rounded-lg mb-2 shadow-sm">
                      <div className="flex-1">
                        <span className="font-medium text-gray-800 block">{location.locationName}</span>
                        <span className="text-gray-600 text-sm">
                          {location.studentCount}名 
                          <span className="text-green-600 font-semibold">（アクティブ: {location.activeStudents}名）</span>
                        </span>
                      </div>
                      <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-500 transition-all duration-300"
                          style={{ width: `${(location.activeStudents / location.studentCount) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div>
              <h4 className="text-lg font-medium text-gray-700 mb-4 pb-2 border-b-2 border-gray-200">コース別受講状況</h4>
              {studentSummary.byCourse.map((course, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-800">{course.courseName}</span>
                    <span className="text-gray-600 text-sm">
                      {course.enrolledStudents}名受講 | 完了率 {course.completionRate}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 transition-all duration-300"
                      style={{ width: `${course.completionRate}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* カリキュラムパス表示 */}
        <section className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">📚 カリキュラムパス</h3>
          
          <div className="space-y-6">
            {/* 必修科目の受講順序 */}
            <div>
              <h4 className="text-lg font-medium text-gray-700 mb-4">必修科目（受講順序）</h4>
              <div className="flex flex-wrap items-center gap-4">
                {getCurriculumPath().required.map((course, index) => (
                  <div key={course.id} className="flex items-center">
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
                      <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold mb-2">
                        {course.order}
                      </div>
                      <div className="font-medium text-gray-800 text-sm mb-1">{course.title}</div>
                      <div className="text-gray-600 text-xs mb-1">{course.duration}</div>
                      <div className="text-blue-600 text-xs font-medium">{course.enrolledStudents}名受講中</div>
                    </div>
                    {index < getCurriculumPath().required.length - 1 && (
                      <div className="text-2xl text-gray-400">→</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 選択科目 */}
            <div>
              <h4 className="text-lg font-medium text-gray-700 mb-4">選択科目（いつでも受講可能）</h4>
              <div className="grid grid-cols-1 gap-3">
                {getCurriculumPath().elective.map(course => (
                  <div key={course.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
                    <div className="font-medium text-gray-800 text-sm mb-1">{course.title}</div>
                    <div className="text-gray-600 text-xs mb-1">{course.duration}</div>
                    <div className="text-blue-600 text-xs font-medium">{course.enrolledStudents}名受講中</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 最近のアクティビティ */}
        <section className="bg-gray-50 rounded-xl p-6 lg:col-span-2">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">🕒 最近のアクティビティ</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="text-2xl mr-4">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <p className="text-gray-800">
                    <span className="font-semibold">{activity.user}</span> - {activity.action}
                  </p>
                  <small className="text-gray-500">{activity.time}</small>
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