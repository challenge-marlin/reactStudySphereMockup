import React, { useState } from 'react';
import './LessonManagement.css';

const LessonManagement = () => {
  // カリキュラム全体像に基づいたコースとレッスンデータ
  const [courses, setCourses] = useState([
    {
      id: 'course001',
      title: 'オフィスソフトの操作・文書作成',
      category: '選択科目',
      duration: '3ヶ月',
      totalLessons: 6,
      lessons: [
        {
          id: 'lesson001-1',
          title: 'Microsoft Wordの特徴と文書作成',
          description: '基本操作、文書の作成、保存方法。フォーマット設定、スタイルの適用、図形や画像の挿入',
          duration: '120分',
          order: 1,
          pdfFile: null,
          videoFile: null,
          videoSegments: []
        },
        {
          id: 'lesson001-2',
          title: 'Microsoft Excelの特徴と表計算',
          description: '基本操作、セルの入力、データの整形、数式の使用、基本的な関数の紹介',
          duration: '120分',
          order: 2,
          pdfFile: null,
          videoFile: null,
          videoSegments: []
        },
        {
          id: 'lesson001-3',
          title: 'Microsoft Excelを使用したデータ分析',
          description: '基本操作、セルの入力、データの整形、数式の使用、基本的な関数の紹介',
          duration: '120分',
          order: 3,
          pdfFile: null,
          videoFile: null,
          videoSegments: []
        },
        {
          id: 'lesson001-4',
          title: 'Microsoft PowerPointでのプレゼンテーション作成',
          description: 'スライドの構成、デザインの基本、アニメーションやトランジションの追加',
          duration: '120分',
          order: 4,
          pdfFile: null,
          videoFile: null,
          videoSegments: []
        },
        {
          id: 'lesson001-5',
          title: 'Wordでのレポート作成',
          description: '文書の構成（見出し、段落、リスト）、実践課題: 簡単なレポートを作成',
          duration: '120分',
          order: 5,
          pdfFile: null,
          videoFile: null,
          videoSegments: []
        },
        {
          id: 'lesson001-6',
          title: '実務での活用方法と応用技術',
          description: '各ソフトの実務での具体的な活用事例の紹介、効率的な作業方法やショートカットキーの紹介',
          duration: '120分',
          order: 6,
          pdfFile: null,
          videoFile: null,
          videoSegments: []
        }
      ]
    },
    {
      id: 'course002',
      title: 'ITリテラシー・AIの基本',
      category: '必修科目',
      duration: '3ヶ月',
      totalLessons: 6,
      lessons: [
        {
          id: 'lesson002-1',
          title: 'Windows11の基本操作',
          description: 'ファイル操作、ショートカットキーの利用、ソフトウェアの使用方法（ブラウザ、Word、Excelの簡単操作）',
          duration: '120分',
          order: 1,
          pdfFile: null,
          videoFile: null,
          videoSegments: []
        },
        {
          id: 'lesson002-2',
          title: 'インターネットの基礎',
          description: 'インターネットの仕組みと安全な利用（セキュリティ、パスワード管理）、情報検索と信頼性の高い情報の見分け方',
          duration: '120分',
          order: 2,
          pdfFile: null,
          videoFile: null,
          videoSegments: []
        },
        {
          id: 'lesson002-3',
          title: 'AIの基本概念',
          description: 'AIの基本概念（AIとは何か、利用されている分野）',
          duration: '120分',
          order: 3,
          pdfFile: null,
          videoFile: null,
          videoSegments: []
        },
        {
          id: 'lesson002-4',
          title: 'AIの活用例',
          description: 'AIの活用例（日常での利用例、Google検索や翻訳ツールの仕組み）、AIツールの体験',
          duration: '120分',
          order: 4,
          pdfFile: null,
          videoFile: null,
          videoSegments: []
        },
        {
          id: 'lesson002-5',
          title: 'プログラミングの基本',
          description: 'プログラミングの基本、ChatGPTなどのAIアシスタントの活用',
          duration: '120分',
          order: 5,
          pdfFile: null,
          videoFile: null,
          videoSegments: []
        },
        {
          id: 'lesson002-6',
          title: 'AIを使用した簡単なLP作成',
          description: 'AIを使用した簡単なLP作成、チャットボットの仕組みと作成',
          duration: '120分',
          order: 6,
          pdfFile: null,
          videoFile: null,
          videoSegments: []
        }
      ]
    },
    {
      id: 'course003',
      title: 'SNS運用の基礎・画像生成編集',
      category: '必修科目',
      duration: '6ヶ月',
      totalLessons: 12,
      lessons: [
        {
          id: 'lesson003-1',
          title: 'SNSマーケティングの重要性と基本概念',
          description: '各SNSプラットフォームの特徴とユーザー層の理解',
          duration: '120分',
          order: 1,
          pdfFile: null,
          videoFile: null,
          videoSegments: []
        },
        {
          id: 'lesson003-2',
          title: 'デザインが持つ影響力とコミュニケーションの重要性',
          description: '基本原則（バランス、コントラスト、近接、整列）',
          duration: '120分',
          order: 2,
          pdfFile: null,
          videoFile: null,
          videoSegments: []
        },
        {
          id: 'lesson003-3',
          title: 'グラフィックデザイン、UI/UXデザイン、ブランディングデザイン',
          description: '各デザインの目的と適用シーン',
          duration: '120分',
          order: 3,
          pdfFile: null,
          videoFile: null,
          videoSegments: []
        },
        {
          id: 'lesson003-4',
          title: '画像編集ツールの基礎（Canva）',
          description: 'Canvaのインターフェースと基本機能、テンプレートを利用したデザイン作成、実践演習: SNS投稿用の画像作成',
          duration: '120分',
          order: 4,
          pdfFile: null,
          videoFile: null,
          videoSegments: []
        },
        {
          id: 'lesson003-5',
          title: '画像編集ツールの基礎（Recraft）',
          description: 'Recraftの基本操作と機能、画像の加工・編集方法、実践演習: 簡単なデザインの作成',
          duration: '120分',
          order: 5,
          pdfFile: null,
          videoFile: null,
          videoSegments: []
        },
        {
          id: 'lesson003-6',
          title: 'イラストの基礎',
          description: 'イラストのスタイルと技法、手描きとデジタルイラストの違い、シンプルなイラスト作成の実践',
          duration: '120分',
          order: 6,
          pdfFile: null,
          videoFile: null,
          videoSegments: []
        },
        {
          id: 'lesson003-7',
          title: 'AI画像生成ツールの紹介',
          description: 'DALL-E、Midjourneyなどの基本的な使い方と生成プロセスの理解',
          duration: '120分',
          order: 7,
          pdfFile: null,
          videoFile: null,
          videoSegments: []
        },
        {
          id: 'lesson003-8',
          title: 'AIを使った画像生成の基礎',
          description: 'プロンプト作成のテクニック、AIによる生成結果の評価と改善方法',
          duration: '120分',
          order: 8,
          pdfFile: null,
          videoFile: null,
          videoSegments: []
        },
        {
          id: 'lesson003-9',
          title: 'AIを使った画像生成の応用（1）',
          description: 'ブランドに合わせた画像生成の実践、生成された画像の編集と最適化',
          duration: '120分',
          order: 9,
          pdfFile: null,
          videoFile: null,
          videoSegments: []
        },
        {
          id: 'lesson003-10',
          title: 'AIを使った画像生成の応用（2）',
          description: '複数の生成物を組み合わせる技術、コンテンツに適した画像選定の方法',
          duration: '120分',
          order: 10,
          pdfFile: null,
          videoFile: null,
          videoSegments: []
        },
        {
          id: 'lesson003-11',
          title: 'SNSにおける効果測定',
          description: 'KPI設定とデータ分析の重要性、SNS運用のパフォーマンスを測るためのツールとテクニック',
          duration: '120分',
          order: 11,
          pdfFile: null,
          videoFile: null,
          videoSegments: []
        },
        {
          id: 'lesson003-12',
          title: 'SNSを使用したデザインの事例研究',
          description: '成功したSNSキャンペーンにおけるデザインの分析、実際の成果を上げた事例からの学びと応用',
          duration: '120分',
          order: 12,
          pdfFile: null,
          videoFile: null,
          videoSegments: []
        }
      ]
    },
    {
      id: 'course004',
      title: 'LP制作(HTML・CSS)',
      category: '必修科目',
      duration: '3ヶ月',
      totalLessons: 12,
      lessons: [
        {
          id: 'lesson004-1',
          title: 'Webページの仕組み',
          description: 'ウェブサイトの構成要素（HTML・CSS・JavaScript）、静的サイトと動的サイトの違い、HTMLの役割と基本構造',
          duration: '120分',
          order: 1,
          pdfFile: null,
          videoFile: null,
          videoSegments: []
        },
        {
          id: 'lesson004-2',
          title: 'ドメイン・ホスティング・サーバの基本',
          description: 'ドメイン名の意味と重要性と選び方、購入プロセス、DNS、シェアードホスティング、VPS、専用サーバ、クラウドホスティング',
          duration: '120分',
          order: 2,
          pdfFile: null,
          videoFile: null,
          videoSegments: []
        },
        {
          id: 'lesson004-3',
          title: 'HTMLの要素と属性',
          description: 'idとclassの使い分け、フォーム（input、textarea、button）の基礎、table要素の使い方',
          duration: '120分',
          order: 3,
          pdfFile: null,
          videoFile: null,
          videoSegments: []
        },
        {
          id: 'lesson004-4',
          title: 'CSSのセレクタ・プロパティ・値',
          description: '基本セレクタ（*、p、.class、#id）、擬似クラス（:hover、:nth-child）、UIデザインの基礎',
          duration: '120分',
          order: 4,
          pdfFile: null,
          videoFile: null,
          videoSegments: []
        },
        {
          id: 'lesson004-5',
          title: 'Flexboxの基本',
          description: 'display: flexの使い方、justify-content、align-itemsの適用、レスポンシブデザインの設定方法',
          duration: '120分',
          order: 5,
          pdfFile: null,
          videoFile: null,
          videoSegments: []
        },
        {
          id: 'lesson004-6',
          title: '複数カラムのデザイン',
          description: '画面の横幅に応じて表示するカラム数やカラム内部にある要素を調整する方法、ナビゲーションバーの作成',
          duration: '120分',
          order: 6,
          pdfFile: null,
          videoFile: null,
          videoSegments: []
        },
        {
          id: 'lesson004-7',
          title: 'メディアクエリの使い方',
          description: 'レスポンシブ画像（srcset、pictureタグ）、特定のデバイス幅に応じたスタイルの設定方法、モバイルファーストデザイン',
          duration: '120分',
          order: 7,
          pdfFile: null,
          videoFile: null,
          videoSegments: []
        },
        {
          id: 'lesson004-8',
          title: 'UI/UXデザインの基本',
          description: 'ユーザフローとサイトの設計、CTA（コール・トゥ・アクション）の最適化、デザインフィードバックの取り方',
          duration: '120分',
          order: 8,
          pdfFile: null,
          videoFile: null,
          videoSegments: []
        },
        {
          id: 'lesson004-9',
          title: '色彩理論の基本',
          description: '暖色・寒色、色相・彩度・明度、色覚多様性対応、フォントの選び方、レイアウトの作成',
          duration: '120分',
          order: 9,
          pdfFile: null,
          videoFile: null,
          videoSegments: []
        },
        {
          id: 'lesson004-10',
          title: '指定テーマに基づくLP制作',
          description: '商品・サービス紹介LP、主要コンテンツのワイヤーフレーム設計、ヒーローセクション（ファーストビュー）の作成',
          duration: '120分',
          order: 10,
          pdfFile: null,
          videoFile: null,
          videoSegments: []
        },
        {
          id: 'lesson004-11',
          title: 'コンバージョンを高めるデザイン',
          description: 'CTA（コール・トゥ・アクション）の最適化、説得力のあるコピーライティングの基礎、LPの改善点の見つけ方',
          duration: '120分',
          order: 11,
          pdfFile: null,
          videoFile: null,
          videoSegments: []
        },
        {
          id: 'lesson004-12',
          title: 'SEOの基本と仕組み',
          description: 'LPに適したSEOの基本設定、画像最適化、キーワード戦略とコンテンツ最適化',
          duration: '120分',
          order: 12,
          pdfFile: null,
          videoFile: null,
          videoSegments: []
        }
      ]
    },
    {
      id: 'course005',
      title: 'SNS管理代行・LP制作案件対応',
      category: '必修科目',
      duration: '3ヶ月',
      totalLessons: 12,
      lessons: [
        {
          id: 'lesson005-1',
          title: 'コース概要説明',
          description: 'SNS運用・LP制作の目的、受講者のスキルレベルと目標を共有、目標設定とプロジェクト概要',
          duration: '120分',
          order: 1,
          pdfFile: null,
          videoFile: null,
          videoSegments: []
        },
        {
          id: 'lesson005-2',
          title: '各SNSの特性とターゲット層の特定',
          description: 'Instagram、X（旧:Twitter）、Facebook、TikTokの違い、業種毎の最適なSNS戦略、初期コンテンツの計画',
          duration: '120分',
          order: 2,
          pdfFile: null,
          videoFile: null,
          videoSegments: []
        },
        {
          id: 'lesson005-3',
          title: 'LPの役割',
          description: '構成要素、コンバージョンの考え方、成功事例と失敗事例の比較、コンテンツ構成の基本',
          duration: '120分',
          order: 3,
          pdfFile: null,
          videoFile: null,
          videoSegments: []
        },
        {
          id: 'lesson005-4',
          title: 'Google Analyticsの基本操作',
          description: 'GAアカウントのセットアップ方法、レポートの読み方と分析する為の指標、実践: 初期データ収集',
          duration: '120分',
          order: 4,
          pdfFile: null,
          videoFile: null,
          videoSegments: []
        },
        {
          id: 'lesson005-5',
          title: 'SNS投稿の実施',
          description: 'エンゲージメント測定と改善策の検討、フォロワー増加の施策',
          duration: '120分',
          order: 5,
          pdfFile: null,
          videoFile: null,
          videoSegments: []
        },
        {
          id: 'lesson005-6',
          title: 'プロジェクト管理の基礎',
          description: 'Trello、Asanaを活用したタスク管理、タスクの優先順位付けと納期管理、クライアント対応スキル',
          duration: '120分',
          order: 6,
          pdfFile: null,
          videoFile: null,
          videoSegments: []
        },
        {
          id: 'lesson005-7',
          title: 'SNS運用データの分析',
          description: '各SNSのインサイトツールの活用、LPのコンバージョン率の評価、改善点の抽出と実践',
          duration: '120分',
          order: 7,
          pdfFile: null,
          videoFile: null,
          videoSegments: []
        },
        {
          id: 'lesson005-8',
          title: 'A/Bテストの基礎と実施方法',
          description: 'A/Bテストツール、データを活用した改善提案、改善施策の実施とテスト',
          duration: '120分',
          order: 8,
          pdfFile: null,
          videoFile: null,
          videoSegments: []
        },
        {
          id: 'lesson005-9',
          title: 'LPデザインのブラッシュアップ',
          description: 'モバイルファーストの最適化、直感的なUIデザインの考え方、SNSコンテンツの改善',
          duration: '120分',
          order: 9,
          pdfFile: null,
          videoFile: null,
          videoSegments: []
        },
        {
          id: 'lesson005-10',
          title: 'データの可視化手法',
          description: 'AIを使ったクラスター分析、パターン抽出、レポートの構成と作成、プレゼンテーション資料の作成',
          duration: '120分',
          order: 10,
          pdfFile: null,
          videoFile: null,
          videoSegments: []
        },
        {
          id: 'lesson005-11',
          title: '提案書のストーリ設計',
          description: '改善・変更策を纏めた概要をAIに入力し下書きを作成、改善策の具体化とデザイン、プレゼンテーションの練習',
          duration: '120分',
          order: 11,
          pdfFile: null,
          videoFile: null,
          videoSegments: []
        },
        {
          id: 'lesson005-12',
          title: '成果発表',
          description: '成果発表、フィードバックと改善点の共有、今後のキャリアプランニング',
          duration: '120分',
          order: 12,
          pdfFile: null,
          videoFile: null,
          videoSegments: []
        }
      ]
    }
  ]);

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [showVideoSegmentModal, setShowVideoSegmentModal] = useState(false);

  // レッスン編集モーダルを開く
  const handleEditLesson = (courseId, lessonId) => {
    const course = courses.find(c => c.id === courseId);
    const lesson = course.lessons.find(l => l.id === lessonId);
    setSelectedCourse(course);
    setSelectedLesson(lesson);
    setShowLessonModal(true);
  };

  // レッスン情報を更新
  const handleUpdateLesson = (updatedLesson) => {
    setCourses(courses.map(course => {
      if (course.id === selectedCourse.id) {
        return {
          ...course,
          lessons: course.lessons.map(lesson => 
            lesson.id === updatedLesson.id ? updatedLesson : lesson
          )
        };
      }
      return course;
    }));
    setShowLessonModal(false);
    setSelectedLesson(null);
  };

  // 動画セグメント管理モーダルを開く
  const handleManageVideoSegments = (courseId, lessonId) => {
    const course = courses.find(c => c.id === courseId);
    const lesson = course.lessons.find(l => l.id === lessonId);
    setSelectedCourse(course);
    setSelectedLesson(lesson);
    setShowVideoSegmentModal(true);
  };

  // 動画セグメントを更新
  const handleUpdateVideoSegments = (segments) => {
    const updatedLesson = { ...selectedLesson, videoSegments: segments };
    handleUpdateLesson(updatedLesson);
    setShowVideoSegmentModal(false);
  };

  return (
    <div className="lesson-management">
      <div className="lesson-header">
        <h2>📚 レッスン管理</h2>
        <p>各コースのレッスン詳細を管理できます。PDFファイルと動画ファイルのアップロード、動画の分割設定が可能です。</p>
      </div>

      {/* コース選択フィルター */}
      <div className="course-filter">
        <label>コースを選択:</label>
        <select 
          onChange={(e) => setSelectedCourse(courses.find(c => c.id === e.target.value) || null)}
          value={selectedCourse?.id || ''}
        >
          <option value="">全てのコース</option>
          {courses.map(course => (
            <option key={course.id} value={course.id}>
              {course.title} ({course.totalLessons}レッスン)
            </option>
          ))}
        </select>
      </div>

      {/* レッスン一覧テーブル */}
      <div className="lessons-table-container">
        <table className="lessons-table">
          <thead>
            <tr>
              <th>コース</th>
              <th>レッスン</th>
              <th>タイトル</th>
              <th>説明</th>
              <th>所要時間</th>
              <th>PDF</th>
              <th>動画</th>
              <th>セグメント</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {courses
              .filter(course => !selectedCourse || course.id === selectedCourse.id)
              .flatMap(course => 
                course.lessons.map(lesson => ({ ...lesson, courseTitle: course.title, courseId: course.id }))
              )
              .map(lesson => (
                <tr key={lesson.id} className="lesson-row">
                  <td className="course-name">
                    <span className="course-badge">{lesson.courseTitle}</span>
                  </td>
                  <td className="lesson-order">
                    <span className="order-badge">第{lesson.order}回</span>
                  </td>
                  <td className="lesson-title">
                    <strong>{lesson.title}</strong>
                  </td>
                  <td className="lesson-description">
                    <div className="description-text">
                      {lesson.description.length > 100 
                        ? `${lesson.description.substring(0, 100)}...` 
                        : lesson.description
                      }
                    </div>
                  </td>
                  <td className="lesson-duration">
                    <span className="duration-badge">{lesson.duration}</span>
                  </td>
                  <td className="lesson-pdf">
                    <span className={`file-status ${lesson.pdfFile ? 'uploaded' : 'not-uploaded'}`}>
                      {lesson.pdfFile ? '📄 済み' : '📄 未'}
                    </span>
                  </td>
                  <td className="lesson-video">
                    <span className={`file-status ${lesson.videoFile ? 'uploaded' : 'not-uploaded'}`}>
                      {lesson.videoFile ? '🎥 済み' : '🎥 未'}
                    </span>
                  </td>
                  <td className="lesson-segments">
                    {lesson.videoFile ? (
                      <span className="segments-count">
                        {lesson.videoSegments.length}個
                      </span>
                    ) : (
                      <span className="no-segments">-</span>
                    )}
                  </td>
                  <td className="lesson-actions">
                    <div className="action-buttons">
                      <button 
                        className="edit-btn"
                        onClick={() => handleEditLesson(lesson.courseId, lesson.id)}
                        title="編集"
                      >
                        ✏️
                      </button>
                      {lesson.videoFile && (
                        <button 
                          className="segment-btn"
                          onClick={() => handleManageVideoSegments(lesson.courseId, lesson.id)}
                          title="動画分割"
                        >
                          🎬
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {courses
          .filter(course => !selectedCourse || course.id === selectedCourse.id)
          .flatMap(course => course.lessons).length === 0 && (
          <div className="no-results">
            <p>表示するレッスンがありません。</p>
          </div>
        )}
      </div>

      {/* レッスン編集モーダル */}
      {showLessonModal && selectedLesson && (
        <LessonEditModal
          lesson={selectedLesson}
          onUpdate={handleUpdateLesson}
          onClose={() => setShowLessonModal(false)}
        />
      )}

      {/* 動画セグメント管理モーダル */}
      {showVideoSegmentModal && selectedLesson && (
        <VideoSegmentModal
          lesson={selectedLesson}
          onUpdate={handleUpdateVideoSegments}
          onClose={() => setShowVideoSegmentModal(false)}
        />
      )}
    </div>
  );
};

// レッスン編集モーダルコンポーネント
const LessonEditModal = ({ lesson, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({
    title: lesson.title,
    description: lesson.description,
    duration: lesson.duration,
    pdfFile: lesson.pdfFile,
    videoFile: lesson.videoFile
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e, fileType) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ 
        ...prev, 
        [fileType]: {
          name: file.name,
          size: file.size,
          type: file.type,
          lastModified: file.lastModified
        }
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({
      ...lesson,
      ...formData
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>レッスン編集: {lesson.title}</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="lesson-form">
          <div className="form-group">
            <label>レッスンタイトル</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>説明</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              required
            />
          </div>

          <div className="form-group">
            <label>所要時間</label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              placeholder="例: 120分"
              required
            />
          </div>

          <div className="form-group">
            <label>PDFファイル</label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => handleFileUpload(e, 'pdfFile')}
            />
            {formData.pdfFile && (
              <div className="file-info">
                <span>📄 {formData.pdfFile.name}</span>
                <span>{(formData.pdfFile.size / 1024 / 1024).toFixed(2)} MB</span>
              </div>
            )}
          </div>

          <div className="form-group">
            <label>動画ファイル</label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => handleFileUpload(e, 'videoFile')}
            />
            {formData.videoFile && (
              <div className="file-info">
                <span>🎥 {formData.videoFile.name}</span>
                <span>{(formData.videoFile.size / 1024 / 1024).toFixed(2)} MB</span>
              </div>
            )}
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="cancel-btn">
              キャンセル
            </button>
            <button type="submit" className="save-btn">
              保存
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// 動画セグメント管理モーダルコンポーネント
const VideoSegmentModal = ({ lesson, onUpdate, onClose }) => {
  const [segments, setSegments] = useState(lesson.videoSegments || []);
  const [newSegment, setNewSegment] = useState({
    title: '',
    startTime: '',
    endTime: '',
    description: ''
  });

  const handleAddSegment = () => {
    if (newSegment.title && newSegment.startTime && newSegment.endTime) {
      setSegments([...segments, { ...newSegment, id: Date.now() }]);
      setNewSegment({ title: '', startTime: '', endTime: '', description: '' });
    }
  };

  const handleRemoveSegment = (segmentId) => {
    setSegments(segments.filter(s => s.id !== segmentId));
  };

  const handleSave = () => {
    onUpdate(segments);
  };

  const formatTime = (timeString) => {
    const [minutes, seconds] = timeString.split(':').map(Number);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content video-segment-modal">
        <div className="modal-header">
          <h3>動画セグメント管理: {lesson.title}</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="segment-content">
          <div className="segment-info">
            <p>動画を時間で分割して、学習しやすいセグメントを作成できます。</p>
            <p>例: 0:00-5:30 導入部分、5:30-15:00 実践部分 など</p>
          </div>

          <div className="add-segment-form">
            <h4>新しいセグメントを追加</h4>
            <div className="segment-inputs">
              <input
                type="text"
                placeholder="セグメントタイトル"
                value={newSegment.title}
                onChange={(e) => setNewSegment({...newSegment, title: e.target.value})}
              />
              <input
                type="text"
                placeholder="開始時間 (例: 0:00)"
                value={newSegment.startTime}
                onChange={(e) => setNewSegment({...newSegment, startTime: e.target.value})}
              />
              <input
                type="text"
                placeholder="終了時間 (例: 5:30)"
                value={newSegment.endTime}
                onChange={(e) => setNewSegment({...newSegment, endTime: e.target.value})}
              />
              <textarea
                placeholder="説明（オプション）"
                value={newSegment.description}
                onChange={(e) => setNewSegment({...newSegment, description: e.target.value})}
                rows="2"
              />
              <button type="button" onClick={handleAddSegment} className="add-btn">
                ➕ 追加
              </button>
            </div>
          </div>

          <div className="segments-list">
            <h4>セグメント一覧</h4>
            {segments.length === 0 ? (
              <p className="no-segments">セグメントがありません</p>
            ) : (
              segments.map(segment => (
                <div key={segment.id} className="segment-item">
                  <div className="segment-header">
                    <h5>{segment.title}</h5>
                    <button 
                      onClick={() => handleRemoveSegment(segment.id)}
                      className="remove-btn"
                    >
                      🗑️
                    </button>
                  </div>
                  <div className="segment-time">
                    {formatTime(segment.startTime)} - {formatTime(segment.endTime)}
                  </div>
                  {segment.description && (
                    <p className="segment-description">{segment.description}</p>
                  )}
                </div>
              ))
            )}
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="cancel-btn">
              キャンセル
            </button>
            <button type="button" onClick={handleSave} className="save-btn">
              保存
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonManagement; 