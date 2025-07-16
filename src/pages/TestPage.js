import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './TestPage.css';

const TestPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [currentLesson, setCurrentLesson] = useState(1);
  const [testData, setTestData] = useState(null);
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // URLパラメータからレッスン番号を取得
  useEffect(() => {
    const lessonParam = searchParams.get('lesson');
    if (lessonParam) {
      const lessonNumber = parseInt(lessonParam);
      if (lessonNumber >= 1 && lessonNumber <= 6) {
        setCurrentLesson(lessonNumber);
      }
    }
  }, [searchParams]);

  // レッスンデータ
  const lessonData = {
    1: {
      title: "第1回　Windows11の基本操作とソフトウェアの活用",
      description: "コンピュータの基本構造とWindows 11の操作方法を学びます"
    },
    2: {
      title: "第2回　インターネットの基礎と安全な利用",
      description: "インターネットの仕組みと安全な利用方法を学びます"
    },
    3: {
      title: "第3回　AIの仕組みや基本用語を学ぶ",
      description: "AIの基本概念と用語について理解を深めます"
    },
    4: {
      title: "第4回　AIの活用例と実践体験",
      description: "実際のAI活用事例を体験します"
    },
    5: {
      title: "第5回　簡単なプログラミングとAIアシスタント活用",
      description: "プログラミングの基礎とAIアシスタントの活用方法を学びます"
    },
    6: {
      title: "第6回　AIの活用例と実践体験",
      description: "総合的なAI活用の実践演習を行います"
    }
  };

  // サンプルテストデータ（AIが生成した問題）
  const sampleTestData = {
    title: `記述式理解度テスト\nカリキュラム1・第${currentLesson}回・第2章`,
    questions: [
      {
        id: 1,
        question: "ニューラルネットワークの基本的な構造について説明してください。",
        placeholder: "ニューラルネットワークの構造について説明してください..."
      },
      {
        id: 2,
        question: "活性化関数の役割とその種類について説明してください。",
        placeholder: "活性化関数の役割や種類について説明してください..."
      },
      {
        id: 3,
        question: "誤差逆伝播法（バックプロパゲーション）とは何か、説明してください。",
        placeholder: "誤差逆伝播法について説明してください..."
      },
      {
        id: 4,
        question: "過学習（オーバーフィッティング）とは何か、またそれを防ぐ方法について説明してください。",
        placeholder: "過学習の定義と防止策について説明してください..."
      },
      {
        id: 5,
        question: "畳み込みニューラルネットワーク（CNN）の基本的な仕組みについて説明してください。",
        placeholder: "CNNの基本的な仕組みについて説明してください..."
      },
      {
        id: 6,
        question: "自然言語処理における「ベクトル化」とは何か、説明してください。",
        placeholder: "ベクトル化について説明してください..."
      },
      {
        id: 7,
        question: "トランスフォーマー技術の特徴とその応用例について説明してください。",
        placeholder: "トランスフォーマー技術の特徴や応用例について説明してください..."
      },
      {
        id: 8,
        question: "ディープラーニングが従来の機械学習技術と比べて優れている点を説明してください。",
        placeholder: "ディープラーニングの特徴や利点について具体的に説明してください..."
      },
      {
        id: 9,
        question: "AIの画像認識技術が応用されている具体例を3つ挙げて説明してください。",
        placeholder: "画像認識技術の具体例を3つ挙げて説明してください..."
      },
      {
        id: 10,
        question: "AIと人間が協力し合うことで生まれる価値や可能性について、あなたの考えを述べてください。",
        placeholder: "AIと人間の協力についての考えを述べてください..."
      }
    ]
  };

  // テストデータを設定
  useEffect(() => {
    setTestData(sampleTestData);
  }, [currentLesson]);

  // 回答の更新
  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  // テスト提出
  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // モックアップなので、少し待ってから結果画面に遷移
    setTimeout(() => {
      navigate('/student/test-result', {
        state: {
          lessonNumber: currentLesson,
          lessonTitle: lessonData[currentLesson].title,
          answers: answers,
          testData: testData
        }
      });
    }, 1500);
  };

  // 回答済みの問題数を計算
  const answeredCount = Object.keys(answers).filter(key => answers[key] && answers[key].trim() !== '').length;

  if (!testData) {
    return (
      <div className="test-page">
        <div className="test-loading">
          <p>テストを準備中...</p>
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="test-page">
      {/* ヘッダー */}
      <div className="test-header">
        <div className="header-left">
          <button 
            className="back-button"
            onClick={() => navigate(-1)}
          >
            ← 学習画面に戻る
          </button>
          <h1>学習効果テスト</h1>
          <span className="lesson-info">
            {lessonData[currentLesson].title} - {lessonData[currentLesson].description}
          </span>
        </div>
        <div className="test-progress">
          <span className="progress-text">
            回答済み: {answeredCount} / {testData.questions.length} 問
          </span>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(answeredCount / testData.questions.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* テスト内容 */}
      <div className="test-content">
        <div className="test-instructions">
          <h2>{testData.title}</h2>
          <div className="instructions-box">
            <h3>📋 テストの注意事項</h3>
            <ul>
              <li>各問題について、できるだけ詳しく回答してください</li>
              <li>分からない場合は「分かりません」と記入してください</li>
              <li>回答は自動保存されます</li>
              <li>すべての問題に回答してから「回答を提出」ボタンを押してください</li>
            </ul>
          </div>
        </div>

        <div className="questions-container">
          {testData.questions.map((question, index) => (
            <div key={question.id} className="question-item">
              <div className="question-header">
                <span className="question-number">Q{question.id}.</span>
                <span className="question-text">{question.question}</span>
              </div>
              <div className="answer-area">
                <textarea
                  value={answers[question.id] || ''}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                  placeholder={question.placeholder}
                  className="answer-textarea"
                  rows="6"
                />
                <div className="answer-status">
                  {answers[question.id] && answers[question.id].trim() !== '' ? (
                    <span className="answered">✓ 回答済み</span>
                  ) : (
                    <span className="not-answered">未回答</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 提出ボタン */}
        <div className="submit-section">
          <div className="submit-info">
            <p>
              回答済み: <strong>{answeredCount}</strong> / {testData.questions.length} 問
            </p>
            {answeredCount < testData.questions.length && (
              <p className="warning">
                ⚠️ すべての問題に回答してから提出してください
              </p>
            )}
          </div>
          <button
            className={`submit-button ${answeredCount === testData.questions.length ? 'active' : 'disabled'}`}
            onClick={handleSubmit}
            disabled={answeredCount < testData.questions.length || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="loading-spinner-small"></span>
                採点中...
              </>
            ) : (
              '📝 回答を提出'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestPage; 