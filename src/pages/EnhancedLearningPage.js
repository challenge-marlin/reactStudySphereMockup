import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './EnhancedLearningPage.css';

const EnhancedLearningPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [currentLesson, setCurrentLesson] = useState(1);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [videoLoading, setVideoLoading] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const [textContent, setTextContent] = useState('');
  const [textLoading, setTextLoading] = useState(true);
  const [displayMode, setDisplayMode] = useState('text'); // 'text' or 'markdown'
  // 動画時間機能を削除
  const [textScrollPosition, setTextScrollPosition] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const textContainerRef = useRef(null);
  const videoRef = useRef(null);

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
        setTextLoading(true);
      }
    }
  }, [searchParams]);

  // レッスンデータ（動画URLとテキストファイルの対応）
  const lessonData = {
    1: {
      title: "第1回　Windows11の基本操作とソフトウェアの活用",
      videoUrl: "https://www.youtube.com/watch?v=j4yNkF1w6L8",
      textFile: "/doc/text-samples/ITリテラシー・AIの基本1Windows 11の基本操作とソフトウェアの活用.md",
      description: "コンピュータの基本構造とWindows 11の操作方法を学びます"
    },
    2: {
      title: "第2回　インターネットの基礎と安全な利用",
      videoUrl: "https://www.youtube.com/watch?v=AtDQST1SQ5A",
      textFile: "/doc/text-samples/ITリテラシー・AIの基本1Windows 11の基本操作とソフトウェアの活用.md",
      description: "インターネットの仕組みと安全な利用方法を学びます"
    },
    3: {
      title: "第3回　AIの仕組みや基本用語を学ぶ",
      videoUrl: "https://www.youtube.com/watch?v=QkJCPOWwdwI",
      textFile: "/doc/text-samples/ITリテラシー・AIの基本1Windows 11の基本操作とソフトウェアの活用.md",
      description: "AIの基本概念と用語について理解を深めます"
    },
    4: {
      title: "第4回　AIの活用例と実践体験",
      videoUrl: "https://www.youtube.com/watch?v=75UHkx4WZh0",
      textFile: "/doc/text-samples/ITリテラシー・AIの基本1Windows 11の基本操作とソフトウェアの活用.md",
      description: "実際のAI活用事例を体験します"
    },
    5: {
      title: "第5回　簡単なプログラミングとAIアシスタント活用",
      videoUrl: "https://www.youtube.com/watch?v=vQqMk3gFZJ0",
      textFile: "/doc/text-samples/ITリテラシー・AIの基本1Windows 11の基本操作とソフトウェアの活用.md",
      description: "プログラミングの基礎とAIアシスタントの活用方法を学びます"
    },
    6: {
      title: "第6回　AIの活用例と実践体験",
      videoUrl: "",
      textFile: "/doc/text-samples/ITリテラシー・AIの基本1Windows 11の基本操作とソフトウェアの活用.md",
      description: "総合的なAI活用の実践演習を行います"
    }
  };

  const currentLessonData = lessonData[currentLesson];

  // テキストファイルを読み込む
  useEffect(() => {
    const loadTextContent = async () => {
      try {
        setTextLoading(true);
        const response = await fetch(currentLessonData.textFile);
        if (response.ok) {
          const content = await response.text();
          setTextContent(content);
        } else {
          setTextContent('テキストファイルの読み込みに失敗しました。');
        }
      } catch (error) {
        console.error('テキストファイル読み込みエラー:', error);
        setTextContent('テキストファイルの読み込みに失敗しました。');
      } finally {
        setTextLoading(false);
      }
    };

    loadTextContent();
  }, [currentLessonData.textFile]);

  // 動画時間機能を削除 - シンプルなiframe実装に変更

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
    setChatMessages([]);
    setVideoLoading(true);
    setVideoError(false);
    setTextLoading(true);
    setTextScrollPosition(0);
  };

  // テキスト表示モード切り替え・ボタン削除
  // PDFダウンロードボタンを追加

  // MarkdownをHTMLに変換して表示する関数 - react-markdownを使用
  const renderMarkdown = (markdown) => {
    // 見出しのIDを生成する関数
    const generateId = (text) => {
      if (!text) return '';
      
      const textStr = text.toString();
      
      // Markdownの {#id} 形式をチェック
      const idMatch = textStr.match(/\{#([^}]+)\}$/);
      if (idMatch) {
        return idMatch[1];
      }
      
      // 日本語の見出しを英数字に変換するマッピング
      const japaneseToEnglish = {
        '第1章': 'chapter-1',
        '第2章': 'chapter-2', 
        '第3章': 'chapter-3',
        '第4章': 'chapter-4',
        '第5章': 'chapter-5',
        'コンピュータの基本構造と役割': 'computer-basics',
        'Windows 11の基本操作': 'windows-11-basics',
        'ソフトウェアの基本操作': 'software-basics',
        '外付けハードウェアデバイスの使用方法': 'external-devices',
        'Q&Aセッション': 'qa-session',
        'はじめに': 'introduction',
        'まとめ': 'summary',
        '総論': 'conclusion'
      };
      
      // マッピングに一致する場合は変換
      for (const [japanese, english] of Object.entries(japaneseToEnglish)) {
        if (textStr.includes(japanese)) {
          return english;
        }
      }
      
      // マッピングにない場合は、英数字のみを抽出してIDを生成
      return textStr
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // 特殊文字を削除
        .replace(/\s+/g, '-') // スペースをハイフンに変換
        .replace(/-+/g, '-') // 連続するハイフンを1つに
        .replace(/^-|-$/g, '') // 先頭と末尾のハイフンを削除
        .replace(/[^\w-]/g, '') // 英数字とハイフン以外を削除
        || 'section-' + Math.random().toString(36).substr(2, 9); // フォールバック
    };

    return (
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({node, ...props}) => <h1 id={generateId(props.children)} style={{color: '#2c3e50', fontSize: '24px', fontWeight: '700', margin: '25px 0 15px 0', paddingBottom: '8px', borderBottom: '2px solid #667eea'}} {...props} />,
          h2: ({node, ...props}) => <h2 id={generateId(props.children)} style={{color: '#2c3e50', fontSize: '20px', fontWeight: '700', margin: '25px 0 15px 0', paddingBottom: '8px', borderBottom: '2px solid #667eea'}} {...props} />,
          h3: ({node, ...props}) => <h3 id={generateId(props.children)} style={{color: '#34495e', fontSize: '16px', fontWeight: '600', margin: '20px 0 10px 0'}} {...props} />,
          h4: ({node, ...props}) => <h4 id={generateId(props.children)} style={{color: '#34495e', fontSize: '14px', fontWeight: '600', margin: '15px 0 8px 0'}} {...props} />,
          p: ({node, ...props}) => <p style={{margin: '10px 0', lineHeight: '1.6'}} {...props} />,
          ul: ({node, ...props}) => <ul style={{margin: '15px 0', paddingLeft: '20px'}} {...props} />,
          ol: ({node, ...props}) => <ol style={{margin: '15px 0', paddingLeft: '20px'}} {...props} />,
          li: ({node, ...props}) => <li style={{margin: '8px 0', lineHeight: '1.6'}} {...props} />,
          blockquote: ({node, ...props}) => <blockquote style={{borderLeft: '4px solid #667eea', margin: '15px 0', padding: '10px 20px', backgroundColor: '#f8f9fa', fontStyle: 'italic'}} {...props} />,
          code: ({node, inline, ...props}) => inline ? 
            <code style={{backgroundColor: '#f1f3f4', padding: '2px 4px', borderRadius: '3px', fontFamily: 'monospace', fontSize: '0.9em'}} {...props} /> :
            <code style={{display: 'block', backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '5px', fontFamily: 'monospace', fontSize: '0.9em', overflow: 'auto'}} {...props} />,
          pre: ({node, ...props}) => <pre style={{backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '5px', overflow: 'auto', margin: '15px 0'}} {...props} />,
          a: ({node, href, ...props}) => {
            if (href && href.startsWith('#')) {
              return (
                <a 
                  style={{color: '#667eea', textDecoration: 'none', cursor: 'pointer'}} 
                  onClick={(e) => {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    if (targetElement && textContainerRef.current) {
                      const containerTop = textContainerRef.current.offsetTop;
                      const elementTop = targetElement.offsetTop;
                      const scrollTop = elementTop - containerTop - 20;
                      
                      // スムーズスクロールを実行
                      textContainerRef.current.scrollTo({
                        top: Math.max(0, scrollTop),
                        behavior: 'smooth'
                      });
                      
                      // デバッグ用のログ
                      console.log('スクロール実行:', {
                        targetId,
                        elementTop,
                        containerTop,
                        scrollTop
                      });
                    } else {
                      console.log('要素が見つからないか、コンテナが存在しません:', {
                        targetId,
                        targetElement: !!targetElement,
                        containerRef: !!textContainerRef.current
                      });
                    }
                  }}
                  {...props}
                />
              );
            }
            return <a style={{color: '#667eea', textDecoration: 'none'}} target="_blank" rel="noopener noreferrer" href={href} {...props} />;
          },
          strong: ({node, ...props}) => <strong style={{fontWeight: '700', color: '#2c3e50'}} {...props} />,
          em: ({node, ...props}) => <em style={{fontStyle: 'italic', color: '#34495e'}} {...props} />,
          hr: ({node, ...props}) => <hr style={{border: 'none', borderTop: '2px solid #e9ecef', margin: '20px 0'}} {...props} />,
          table: ({node, ...props}) => <table style={{width: '100%', borderCollapse: 'collapse', margin: '15px 0'}} {...props} />,
          th: ({node, ...props}) => <th style={{border: '1px solid #dee2e6', padding: '8px 12px', backgroundColor: '#f8f9fa', fontWeight: '600'}} {...props} />,
          td: ({node, ...props}) => <td style={{border: '1px solid #dee2e6', padding: '8px 12px'}} {...props} />,
        }}
      >
        {markdown}
      </ReactMarkdown>
    );
  };

  // テキストの特定の位置にスクロール
  const scrollToTextPosition = (position) => {
    if (textContainerRef.current) {
      textContainerRef.current.scrollTop = position;
    }
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
    <div className="enhanced-learning-page">
      {/* ヘッダー */}
      <div className="enhanced-learning-header">
        <div className="header-left">
          <button 
            className="back-button"
            onClick={() => navigate('/student/dashboard')}
          >
            ← ダッシュボードに戻る
          </button>
          <h1>学習画面（改善版） - {currentLessonData.title}</h1>
          <span className="lesson-description">{currentLessonData.description}</span>
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

      {/* 3カラムレイアウト */}
      <div className="enhanced-learning-content">
        {/* 左カラム: 動画 */}
        <div className="video-column">
          <div className="video-container">
            <div className="section-header">
              <h3>動画学習</h3>
              <div className="video-controls">
                <span className="video-info-text">動画学習</span>
              </div>
            </div>
            {currentLessonData.videoUrl ? (
              <>
                <div className="video-info">
                  <p className="video-title">{currentLessonData.title}</p>
                  <p className="video-url">URL: {currentLessonData.videoUrl}</p>
                </div>
                <div className="enhanced-video-player-container">
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
                    <div className="enhanced-video-iframe-container">
                      <iframe
                        src={`https://www.youtube.com/embed/${getYouTubeVideoId(currentLessonData.videoUrl)}?modestbranding=1&rel=0`}
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

        {/* 中央カラム: テキスト */}
        <div className="text-column">
          <div className="text-container">
            <div className="section-header">
              <h3>教材テキスト</h3>
              <div className="text-controls">
                <a
                  className="pdf-download-button"
                  href="/doc/pdf-samples/ITリテラシー・AIの基本_第1回.pdf"
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  📄 PDFダウンロード
                </a>
                <button
                  className="scroll-to-top-button"
                  onClick={() => {
                    if (textContainerRef.current) {
                      textContainerRef.current.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                      });
                    }
                  }}
                >
                  ⬆️ 最上部に戻る
                </button>
              </div>
            </div>
            <div className="text-viewer" ref={textContainerRef}>
              {textLoading ? (
                <div className="text-loading">
                  <p>テキストを読み込み中...</p>
                  <div className="loading-spinner"></div>
                </div>
              ) : (
                <div className="markdown-content">
                  {renderMarkdown(textContent)}
                </div>
              )}
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

export default EnhancedLearningPage; 