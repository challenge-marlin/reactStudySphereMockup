import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './TestResultPage.css';

const TestResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [resultData, setResultData] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // サンプル模範解答
  const sampleAnswers = {
    1: "ニューラルネットワークは主に3つの層から構成されています。入力層では外部から得られた情報が数値として取り込まれ、隠れ層では多数の人工ニューロンが情報を処理し、出力層で最終的な予測結果が得られます。",
    2: "活性化関数は、ニューラルネットワークが複雑なパターンを学習できるようにするための鍵となる部分です。ReLU、シグモイド関数、tanh関数などがあります。ReLUは計算が軽く高速で学習が進むため、ディープラーニングでよく使われます。",
    3: "誤差逆伝播法は、ニューラルネットワークの学習過程で誤差を出発点に各重みやバイアスを調整し、モデルの予測精度を向上させる手法です。誤差は出力層から始まり、隠れ層を通して逆方向に伝播されます。",
    4: "過学習とは、学習用のデータに対しては高い精度で答えられるものの、未知のデータでは正しく機能しなくなる状態です。防ぐためには、データを訓練用、検証用、テスト用に分けたり、ドロップアウトやデータ拡張を行うことが有効です。",
    5: "CNNは、視覚情報の処理に長けた人間の脳の構造にヒントを得たアルゴリズムで、畳み込み層とプーリング層を通じて特徴を抽出し、全結合層で分類を行います。畳み込み層ではフィルターを使って特徴を抽出し、プーリング層で情報を圧縮します。",
    6: "ベクトル化とは、言葉を数値に変換するプロセスで、コンピューターが扱える形にします。単語の意味や使われ方の特徴を数値として捉え、コンピューターが言葉の意味を理解できるようにします。",
    7: "トランスフォーマーは、文章内の単語同士の関係性を効率的に分析する技術で、特に長文の意味理解に優れています。ChatGPTのような対話型AIに応用され、文脈や意図をくみ取って自然な返答を生成します。",
    8: "ディープラーニングは、隠れ層の数が多く、より複雑で微細な特徴を捉えることができるため、大規模なデータセットを処理する能力に優れています。これにより、医療画像の解析や自動運転車の識別など高度な処理が可能です。",
    9: "画像認識技術は、スマートフォンの顔認証機能、自動運転車の歩行者や信号の検知、医療分野でのX線画像やMRIスキャンの解析に応用されています。これにより、個人認証や疾患の早期発見が可能になっています。",
    10: "AIは人の力を補うサポーターであり、共に支え合うことで新しい価値や可能性が生まれます。AIの活用により効率が向上し、人間は創造性や感性を活かした活動に集中できるようになります。これにより、より良い社会や未来が実現されると考えます。"
  };

  // サンプルフィードバック
  const sampleFeedback = {
    1: "解答がありません。ニューラルネットワークの基本構造について説明してください。",
    2: "解答がありません。活性化関数の役割や種類について説明してください。",
    3: "回答がありません。誤差逆伝播法について説明してください。",
    4: "解答がありません。過学習の定義と防止策について説明してください。",
    5: "解答がありません。基本的な仕組みについて説明してください。",
    6: "解答がありません。次回は問題に対する具体的な説明を心がけましょう。",
    7: "解答がありません。トランスフォーマー技術の特徴や応用例について説明してください。",
    8: "解答がありません。ディープラーニングの特徴や利点について具体的に説明してください。",
    9: "解答がありません。具体例を3つ挙げて説明してください。",
    10: "解答がありません。AIと人間の協力についての考えを述べてください。"
  };

  useEffect(() => {
    if (location.state) {
      const { lessonNumber, lessonTitle, answers, testData } = location.state;
      
      // モックアップ用の結果データを生成
      const mockResult = {
        lessonNumber,
        lessonTitle,
        testData,
        answers,
        correctAnswers: 0,
        totalQuestions: 10,
        score: 0,
        grade: "もう少し理解度を深めて再試験を行って下さい",
        gradeEmoji: "📘",
        results: []
      };

      // 各問題の結果を生成
      testData.questions.forEach(question => {
        const userAnswer = answers[question.id] || "生徒の回答";
        const correctAnswer = sampleAnswers[question.id];
        const feedback = sampleFeedback[question.id];
        const isCorrect = false; // モックアップなので全て不正解

        mockResult.results.push({
          questionId: question.id,
          question: question.question,
          userAnswer,
          correctAnswer,
          feedback,
          isCorrect,
          score: 0
        });
      });

      setResultData(mockResult);
    } else {
      // データがない場合はダッシュボードに戻る
      navigate('/student/dashboard');
    }
  }, [location.state, navigate]);

  const handleRetakeTest = () => {
    navigate(`/student/test?lesson=${resultData.lessonNumber}`);
  };

  const handleGoToCertificate = () => {
    navigate('/student/certificate', {
      state: {
        lessonNumber: resultData.lessonNumber,
        lessonTitle: resultData.lessonTitle,
        score: resultData.score
      }
    });
  };

  const handleBackToDashboard = () => {
    navigate('/student/dashboard');
  };

  if (!resultData) {
    return (
      <div className="test-result-page">
        <div className="result-loading">
          <p>結果を読み込み中...</p>
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="test-result-page">
      {/* ヘッダー */}
      <div className="result-header">
        <div className="header-left">
          <button 
            className="back-button"
            onClick={handleBackToDashboard}
          >
            ← ダッシュボードに戻る
          </button>
          <h1>テスト結果</h1>
          <span className="lesson-info">
            {resultData.lessonTitle}
          </span>
        </div>
        <div className="result-summary">
          <div className="grade-display">
            <span className="grade-emoji">{resultData.gradeEmoji}</span>
            <span className="grade-text">{resultData.grade}</span>
          </div>
          <div className="score-display">
            <span className="score-text">
              正答数：{resultData.correctAnswers} / {resultData.totalQuestions}
            </span>
          </div>
        </div>
      </div>

      {/* 結果詳細 */}
      <div className="result-content">
        <div className="result-overview">
          <h2>出題範囲：カリキュラム1・第{resultData.lessonNumber}回・第2章</h2>
          <div className="overview-stats">
            <div className="stat-item">
              <span className="stat-label">正答数</span>
              <span className="stat-value">{resultData.correctAnswers}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">総問題数</span>
              <span className="stat-value">{resultData.totalQuestions}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">正答率</span>
              <span className="stat-value">{Math.round((resultData.correctAnswers / resultData.totalQuestions) * 100)}%</span>
            </div>
          </div>
        </div>

        {/* 問題別結果 */}
        <div className="question-results">
          <h3>問題別結果</h3>
          <div className="results-navigation">
            {resultData.results.map((result, index) => (
              <button
                key={result.questionId}
                className={`nav-button ${currentQuestion === index ? 'active' : ''} ${result.isCorrect ? 'correct' : 'incorrect'}`}
                onClick={() => setCurrentQuestion(index)}
              >
                Q{result.questionId}
              </button>
            ))}
          </div>

          <div className="current-question-result">
            {resultData.results[currentQuestion] && (
              <div className="question-result-item">
                <div className="question-header">
                  <span className="question-number">Q{resultData.results[currentQuestion].questionId}.</span>
                  <span className="question-text">{resultData.results[currentQuestion].question}</span>
                </div>
                
                <div className="answer-comparison">
                  <div className="answer-section">
                    <h4>あなたの解答</h4>
                    <div className="answer-content user-answer">
                      {resultData.results[currentQuestion].userAnswer || "回答がありません"}
                    </div>
                  </div>
                  
                  <div className="answer-section">
                    <h4>模範解答</h4>
                    <div className="answer-content correct-answer">
                      {resultData.results[currentQuestion].correctAnswer}
                    </div>
                  </div>
                </div>

                <div className="result-feedback">
                  <div className="score-indicator">
                    <span className={`score-icon ${resultData.results[currentQuestion].isCorrect ? 'correct' : 'incorrect'}`}>
                      {resultData.results[currentQuestion].isCorrect ? '✅' : '❌'}
                    </span>
                    <span className="score-text">
                      {resultData.results[currentQuestion].isCorrect ? '正解' : '不正解'}（{resultData.results[currentQuestion].score}点）
                    </span>
                  </div>
                  <div className="feedback-text">
                    💬 {resultData.results[currentQuestion].feedback}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* アクションボタン */}
        <div className="action-buttons">
          <button 
            className="retake-button"
            onClick={handleRetakeTest}
          >
            🔁 同じ範囲でもう一度受ける
          </button>
          <button 
            className="certificate-button"
            onClick={handleGoToCertificate}
          >
            🏆 合格証明書を見る
          </button>
          <button 
            className="dashboard-button"
            onClick={handleBackToDashboard}
          >
            🏠 最初に戻る
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestResultPage; 