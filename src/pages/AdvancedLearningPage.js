import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import mermaid from 'mermaid';
import './AdvancedLearningPage.css';

const AdvancedLearningPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [currentLesson, setCurrentLesson] = useState(1);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [videoLoading, setVideoLoading] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const [textContent, setTextContent] = useState('');
  const [textLoading, setTextLoading] = useState(true);
  const [noteMode, setNoteMode] = useState('txt'); // 'txt', 'md'
  const [noteContent, setNoteContent] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const textContainerRef = useRef(null);
  const noteContainerRef = useRef(null);

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

  // Mermaid初期化
  useEffect(() => {
    mermaid.initialize({ 
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose'
    });
  }, []);

  // ノートモード切り替え時の処理
  useEffect(() => {
    if (noteMode === 'md' && noteContainerRef.current) {
      renderMermaidInNote();
    }
  }, [noteMode, noteContent]);

  // ノート内のMermaid描画
  const renderMermaidInNote = async () => {
    if (noteContainerRef.current) {
      const mermaidBlocks = noteContainerRef.current.querySelectorAll('pre code.language-mermaid');
      for (let i = 0; i < mermaidBlocks.length; i++) {
        const block = mermaidBlocks[i];
        const mermaidCode = block.textContent;
        try {
          const { svg } = await mermaid.render(`mermaid-note-${i}`, mermaidCode);
          const mermaidDiv = document.createElement('div');
          mermaidDiv.className = 'mermaid-diagram';
          mermaidDiv.innerHTML = svg;
          block.parentNode.replaceWith(mermaidDiv);
        } catch (error) {
          console.error('Mermaid描画エラー:', error);
          const errorDiv = document.createElement('div');
          errorDiv.className = 'mermaid-error';
          errorDiv.innerHTML = '<p style="color: red;">図表の描画に失敗しました。構文を確認してください。</p>';
          block.parentNode.replaceWith(errorDiv);
        }
      }
    }
  };

  // プレースホルダーテキスト取得
  const getPlaceholder = (mode) => {
    switch (mode) {
      case 'txt':
        return `${currentLessonData.title} メモ

重要ポイント:
- 

疑問:
- 

次回確認したいこと:
- `;
      case 'md':
        return `# ${currentLessonData.title}

## 重要なポイント
- ポイント1
- ポイント2

## 疑問点
> ここに疑問を書いてください

## 学習メモ
1. 覚えておきたいこと
2. 次回確認したいこと

## フローチャート例
\`\`\`mermaid
graph TD
    A[開始] --> B[学習]
    B --> C[理解]
    C --> D[実践]
    
    E[疑問] --> F[解決]
    F --> G[定着]
\`\`\``;
      default:
        return '';
    }
  };

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

      // AIの応答をシミュレート（ノート内容を参照）
      setTimeout(() => {
        const aiResponse = {
          id: Date.now() + 1,
          text: `「${currentLessonData.title}」についてのご質問ですね。${noteContent ? 'ノートの内容も参考にして回答いたします。' : ''}どのような点でお困りでしょうか？`,
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
    setNoteContent('');
  };

  // ノート保存
  const saveNote = () => {
    localStorage.setItem(`note-lesson-${currentLesson}`, noteContent);
    alert('ノートを保存しました！');
  };

  // ノートダウンロード
  const downloadNote = () => {
    if (!noteContent.trim()) {
      alert('ノートが空です。ダウンロードする内容を入力してください。');
      return;
    }

    const fileName = `note-lesson-${currentLesson}-${new Date().toISOString().slice(0, 10)}.${noteMode === 'md' ? 'md' : 'txt'}`;
    const blob = new Blob([noteContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    alert('ノートをダウンロードしました！');
  };

  // ノート読み込み
  const loadNote = () => {
    const savedNote = localStorage.getItem(`note-lesson-${currentLesson}`);
    if (savedNote) {
      setNoteContent(savedNote);
    }
  };

  // 初期ノート読み込み
  useEffect(() => {
    loadNote();
  }, [currentLesson]);

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
    <div className="advanced-learning-page">
      {/* ヘッダー */}
      <div className="advanced-learning-header">
        <div className="header-left">
          <button 
            className="back-button"
            onClick={() => navigate('/student/dashboard')}
          >
            ← ダッシュボードに戻る
          </button>
          <h1>学習ページ第3案 - {currentLessonData.title}</h1>
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

      {/* 2x2グリッドレイアウト */}
      <div className="learning-grid">
        {/* 左上: 動画 */}
        <div className="grid-item video-section">
          <div className="section-header">
            <h3>🎥 動画学習</h3>
          </div>
          <div className="video-container">
            {currentLessonData.videoUrl ? (
              <>
                <div className="video-info">
                  <p className="video-title">{currentLessonData.title}</p>
                  <p className="video-url">URL: {currentLessonData.videoUrl}</p>
                </div>
                <div className="advanced-video-player-container">
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
                    <div className="advanced-video-iframe-container">
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

        {/* 右上: AIチャット */}
        <div className="grid-item chat-section">
          <div className="section-header">
            <h3>💬 AI学習アシスタント</h3>
          </div>
          <div className="chat-container">
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

        {/* 左下: テキスト */}
        <div className="grid-item text-section">
          <div className="section-header">
            <h3>📚 教材テキスト</h3>
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
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({node, ...props}) => <h1 id={props.children?.toString().toLowerCase().replace(/\s+/g, '-')} style={{color: '#2c3e50', fontSize: '24px', fontWeight: '700', margin: '25px 0 15px 0', paddingBottom: '8px', borderBottom: '2px solid #667eea'}} {...props} />,
                    h2: ({node, ...props}) => <h2 id={props.children?.toString().toLowerCase().replace(/\s+/g, '-')} style={{color: '#2c3e50', fontSize: '20px', fontWeight: '700', margin: '25px 0 15px 0', paddingBottom: '8px', borderBottom: '2px solid #667eea'}} {...props} />,
                    h3: ({node, ...props}) => <h3 id={props.children?.toString().toLowerCase().replace(/\s+/g, '-')} style={{color: '#34495e', fontSize: '16px', fontWeight: '600', margin: '20px 0 10px 0'}} {...props} />,
                    h4: ({node, ...props}) => <h4 id={props.children?.toString().toLowerCase().replace(/\s+/g, '-')} style={{color: '#34495e', fontSize: '14px', fontWeight: '600', margin: '15px 0 8px 0'}} {...props} />,
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
                                
                                textContainerRef.current.scrollTo({
                                  top: Math.max(0, scrollTop),
                                  behavior: 'smooth'
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
                  {textContent}
                </ReactMarkdown>
              </div>
            )}
          </div>
        </div>

        {/* 右下: マイノート */}
        <div className="grid-item note-section">
          <div className="section-header">
            <h3>📝 マイノート</h3>
            <div className="note-controls">
              <div className="mode-selector">
                <button 
                  className={`mode-button ${noteMode === 'txt' ? 'active' : ''}`}
                  onClick={() => setNoteMode('txt')}
                >
                  📄 編集モード
                </button>
                <button 
                  className={`mode-button ${noteMode === 'md' ? 'active' : ''}`}
                  onClick={() => setNoteMode('md')}
                >
                  📝 表示モード
                </button>
              </div>
              <button className="save-note-button" onClick={downloadNote}>
                📥 ダウンロード
              </button>
            </div>
          </div>
          <div className="note-content" ref={noteContainerRef}>
            {noteMode === 'txt' ? (
              <textarea
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                placeholder={getPlaceholder(noteMode)}
                className="note-textarea"
              />
            ) : (
              <div className="note-markdown-display">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({node, ...props}) => <h1 style={{color: '#2c3e50', fontSize: '18px', fontWeight: '700', margin: '15px 0 10px 0', paddingBottom: '6px', borderBottom: '2px solid #667eea'}} {...props} />,
                    h2: ({node, ...props}) => <h2 style={{color: '#2c3e50', fontSize: '16px', fontWeight: '700', margin: '12px 0 8px 0', paddingBottom: '4px', borderBottom: '1px solid #667eea'}} {...props} />,
                    h3: ({node, ...props}) => <h3 style={{color: '#34495e', fontSize: '14px', fontWeight: '600', margin: '10px 0 6px 0'}} {...props} />,
                    p: ({node, ...props}) => <p style={{margin: '6px 0', lineHeight: '1.5', fontSize: '13px'}} {...props} />,
                    ul: ({node, ...props}) => <ul style={{margin: '8px 0', paddingLeft: '15px', fontSize: '13px'}} {...props} />,
                    ol: ({node, ...props}) => <ol style={{margin: '8px 0', paddingLeft: '15px', fontSize: '13px'}} {...props} />,
                    li: ({node, ...props}) => <li style={{margin: '4px 0', lineHeight: '1.5'}} {...props} />,
                    blockquote: ({node, ...props}) => <blockquote style={{borderLeft: '3px solid #667eea', margin: '8px 0', padding: '6px 12px', backgroundColor: '#f8f9fa', fontStyle: 'italic', fontSize: '12px'}} {...props} />,
                    code: ({node, inline, className, ...props}) => {
                      if (className && className.includes('language-mermaid')) {
                        return <code className={className} {...props} />;
                      }
                      return inline ? 
                        <code style={{backgroundColor: '#f1f3f4', padding: '1px 3px', borderRadius: '2px', fontFamily: 'monospace', fontSize: '11px'}} {...props} /> :
                        <code style={{display: 'block', backgroundColor: '#f8f9fa', padding: '8px', borderRadius: '3px', fontFamily: 'monospace', fontSize: '11px', overflow: 'auto'}} {...props} />;
                    },
                    pre: ({node, ...props}) => <pre style={{backgroundColor: '#f8f9fa', padding: '8px', borderRadius: '3px', overflow: 'auto', margin: '8px 0'}} {...props} />,
                    strong: ({node, ...props}) => <strong style={{fontWeight: '700', color: '#2c3e50'}} {...props} />,
                    em: ({node, ...props}) => <em style={{fontStyle: 'italic', color: '#34495e'}} {...props} />,
                  }}
                >
                  {noteContent}
                </ReactMarkdown>
              </div>
            )}
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

export default AdvancedLearningPage; 