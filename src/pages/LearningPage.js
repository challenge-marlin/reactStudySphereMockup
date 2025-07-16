import React, { useState, useRef, useEffect } from 'react';
// import { Document, Page, pdfjs } from 'react-pdf';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './LearningPage.css';

// eslint-disable-next-line no-unused-vars

const LearningPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [currentLesson, setCurrentLesson] = useState(1);
  // const [numPages, setNumPages] = useState(null);
  // const [pageNumber, setPageNumber] = useState(1);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [videoLoading, setVideoLoading] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // YouTube動画IDを抽出する関数
  const getYouTubeVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return match[2];
    }
    return null;
  };

  // URLパラメータからレッスン番号を取得
  useEffect(() => {
    const lessonParam = searchParams.get('lesson');
    if (lessonParam) {
      const lessonNumber = parseInt(lessonParam);
      if (lessonNumber >= 1 && lessonNumber <= 6) {
        setCurrentLesson(lessonNumber);
        setVideoLoading(true);
        setVideoError(false);
      }
    }
  }, [searchParams]);

  // レッスンデータ（動画URLとPDFファイルの対応）
  const lessonData = {
    1: {
      title: "第1回　Windows11の基本操作とソフトウェアの活用",
      videoUrl: "https://www.youtube.com/watch?v=j4yNkF1w6L8",
      pdfFile: "/doc/pdf-samples/ITリテラシー・AIの基本_第1回.pdf"
    },
    2: {
      title: "第2回　インターネットの基礎と安全な利用",
      videoUrl: "https://www.youtube.com/watch?v=AtDQST1SQ5A",
      pdfFile: "/doc/pdf-samples/ITリテラシー・AIの基本_第2回.pdf"
    },
    3: {
      title: "第3回　AIの仕組みや基本用語を学ぶ",
      videoUrl: "https://www.youtube.com/watch?v=QkJCPOWwdwI",
      pdfFile: "/doc/pdf-samples/ITリテラシー・AIの基本_第3回.pdf"
    },
    4: {
      title: "第4回　AIの活用例と実践体験",
      videoUrl: "https://www.youtube.com/watch?v=75UHkx4WZh0",
      pdfFile: "/doc/pdf-samples/ITリテラシー・AIの基本_第4回.pdf"
    },
    5: {
      title: "第5回　簡単なプログラミングとAIアシスタント活用",
      videoUrl: "https://www.youtube.com/watch?v=vQqMk3gFZJ0",
      pdfFile: "/doc/pdf-samples/ITリテラシー・AIの基本_第5回.pdf"
    },
    6: {
      title: "第6回　AIの活用例と実践体験",
      videoUrl: "",
      pdfFile: "/doc/pdf-samples/ITリテラシー・AIの基本_第6回.pdf"
    }
  };

  const currentLessonData = lessonData[currentLesson];

  // PDF読み込み完了時の処理（一時的に無効化）
  // const onDocumentLoadSuccess = ({ numPages }) => {
  //   setNumPages(numPages);
  //   setPageNumber(1);
  // };

  // チャットメッセージ送信
  const handleSendMessage = () => {
    if (chatInput.trim()) {
      const newMessage = {
        id: Date.now(),
        text: chatInput,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString()
      };
      setChatMessages([...chatMessages, newMessage]);
      setChatInput('');

      // AIの応答をシミュレート
      setTimeout(() => {
        const aiResponse = {
          id: Date.now() + 1,
          text: `「${currentLessonData.title}」についてのご質問ですね。どのような点でお困りでしょうか？`,
          sender: 'ai',
          timestamp: new Date().toLocaleTimeString()
        };
        setChatMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  // レッスン切り替え
  const changeLesson = (lessonNumber) => {
    setCurrentLesson(lessonNumber);
    // setPageNumber(1);
    setChatMessages([]);
    setVideoLoading(true);
    setVideoError(false);
  };

  // 成果物アップロード処理
  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      uploadDate: new Date().toLocaleString(),
      status: 'uploaded'
    }));
    
    setUploadedFiles(prev => [...prev, ...newFiles]);
    setShowUploadModal(false);
    
    // 成功メッセージを表示
    alert(`${files.length}個のファイルがアップロードされました！`);
  };

  // ファイル削除処理
  const handleFileDelete = (fileId) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  return (
    <div className="learning-page">
      {/* ヘッダー */}
      <div className="learning-header">
        <div className="header-left">
          <button 
            className="back-button"
            onClick={() => navigate('/student/dashboard')}
          >
            ← ダッシュボードに戻る
          </button>
          <h1>学習画面 - {currentLessonData.title}</h1>
        </div>
        <div className="lesson-selector">
          <label>レッスン選択: </label>
          <select 
            value={currentLesson} 
            onChange={(e) => changeLesson(parseInt(e.target.value))}
          >
            {Object.keys(lessonData).map(lessonNum => (
              <option key={lessonNum} value={lessonNum}>
                {lessonData[lessonNum].title}
              </option>
            ))}
          </select>
          <button 
            className="upload-button"
            onClick={() => setShowUploadModal(true)}
          >
            📁 成果物アップロード
          </button>
          <button 
            className="test-button"
            onClick={() => navigate(`/student/test?lesson=${currentLesson}`)}
          >
            📝 学習効果テスト
          </button>
        </div>
      </div>

      {/* 2カラムレイアウト */}
      <div className="learning-content">
        {/* 左カラム: 動画 + PDF */}
        <div className="left-column">
          {/* 上: 動画 */}
          <div className="video-section">
            <div className="video-container">
              <div className="section-header">
                <h3>動画学習</h3>
              </div>
              {currentLessonData.videoUrl ? (
                <>
                  <div className="video-info">
                    <p className="video-title">{currentLessonData.title}</p>
                    <p className="video-url">URL: {currentLessonData.videoUrl}</p>
                  </div>
                  <div className="learning-video-player-container">
                    {videoLoading && !videoError && (
                      <div className="video-loading">
                        <p>動画を読み込み中...</p>
                        <div className="loading-spinner"></div>
                      </div>
                    )}
                    {videoError && (
                      <div className="video-fallback">
                        <p>動画の読み込みに失敗しました。以下のリンクをクリックしてください：</p>
                        <a 
                          href={currentLessonData.videoUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="video-link"
                        >
                          YouTubeで開く
                        </a>
                      </div>
                    )}
                    {!videoError && (
                      <div className="learning-video-iframe-container">
                        <iframe
                          src={`https://www.youtube.com/embed/${getYouTubeVideoId(currentLessonData.videoUrl)}?modestbranding=1&rel=0&enablejsapi=1`}
                          width="100%"
                          height="100%"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          title="YouTube video player"
                          onLoad={() => {
                            console.log('iframe動画が読み込まれました');
                            setVideoLoading(false);
                            setVideoError(false);
                          }}
                          onError={() => {
                            console.error('iframe動画読み込みエラー');
                            setVideoError(true);
                            setVideoLoading(false);
                          }}
                        />
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="no-video">
                  <p>このレッスンには動画がありません</p>
                </div>
              )}
            </div>
          </div>

          {/* 下: PDF */}
          <div className="pdf-section">
            <div className="pdf-container">
              <div className="section-header">
                <h3>教材PDF</h3>
              </div>
              <div className="pdf-viewer">
                <iframe
                  src={currentLessonData.pdfFile}
                  width="100%"
                  height="500px"
                  title="PDF教材"
                  style={{ border: '1px solid #ddd', borderRadius: '4px' }}
                  onError={(error) => {
                    console.error('PDF読み込みエラー:', error);
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 右カラム: チャット */}
        <div className="chat-column">
          <div className="chat-container">
            <h3>AI学習アシスタント</h3>
            <div className="chat-messages">
              {chatMessages.map(message => (
                <div 
                  key={message.id} 
                  className={`chat-message ${message.sender}`}
                >
                  <div className="message-content">
                    {message.text}
                  </div>
                  <div className="message-time">
                    {message.timestamp}
                  </div>
                </div>
              ))}
            </div>
            <div className="chat-input-container">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="質問を入力してください..."
                className="chat-input"
              />
              <button 
                onClick={handleSendMessage}
                className="send-button"
              >
                送信
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 成果物アップロードモーダル */}
      {showUploadModal && (
        <div className="upload-modal-overlay">
          <div className="upload-modal">
            <div className="upload-modal-header">
              <h3>成果物アップロード</h3>
              <button 
                className="close-button"
                onClick={() => setShowUploadModal(false)}
              >
                ×
              </button>
            </div>
            <div className="upload-modal-content">
              <div className="upload-area">
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif,.mp4,.mov,.avi"
                  id="file-upload"
                  style={{ display: 'none' }}
                />
                <label htmlFor="file-upload" className="upload-label">
                  <div className="upload-icon">📁</div>
                  <p>ファイルを選択またはドラッグ&ドロップ</p>
                  <span className="upload-hint">
                    対応形式: PDF, Word, テキスト, 画像, 動画
                  </span>
                </label>
              </div>
              
              {uploadedFiles.length > 0 && (
                <div className="uploaded-files">
                  <h4>アップロード済みファイル</h4>
                  {uploadedFiles.map(file => (
                    <div key={file.id} className="uploaded-file-item">
                      <div className="file-info">
                        <span className="file-name">{file.name}</span>
                        <span className="file-size">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </span>
                        <span className="file-date">{file.uploadDate}</span>
                      </div>
                      <button 
                        className="delete-button"
                        onClick={() => handleFileDelete(file.id)}
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearningPage; 