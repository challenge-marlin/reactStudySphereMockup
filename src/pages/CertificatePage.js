import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './CertificatePage.css';

const CertificatePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [certificateData, setCertificateData] = useState(null);
  const [isPrinting, setIsPrinting] = useState(false);

  useEffect(() => {
    if (location.state) {
      const { lessonNumber, lessonTitle, score } = location.state;
      
      // モックアップ用の証明書データを生成
      const mockCertificate = {
        lessonNumber,
        lessonTitle,
        score,
        studentName: "田中 太郎",
        studentId: "STU001",
        completionDate: new Date().toLocaleDateString('ja-JP', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        certificateId: `CERT-${lessonNumber}-${Date.now()}`,
        instructorName: "山田 指導員",
        organization: "スタディスフィア東京校"
      };
      
      setCertificateData(mockCertificate);
    } else {
      // データがない場合はダッシュボードに戻る
      navigate('/student/dashboard');
    }
  }, [location.state, navigate]);

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 100);
  };

  const handleBackToDashboard = () => {
    navigate('/student/dashboard');
  };

  const handleBackToResults = () => {
    navigate(-1);
  };

  if (!certificateData) {
    return (
      <div className="certificate-page">
        <div className="certificate-loading">
          <p>証明書を準備中...</p>
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="certificate-page">
      {/* ヘッダー */}
      <div className="certificate-header">
        <div className="header-left">
          <button 
            className="back-button"
            onClick={handleBackToResults}
          >
            ← 結果に戻る
          </button>
          <h1>合格証明書</h1>
          <span className="lesson-info">
            {certificateData.lessonTitle}
          </span>
        </div>
        <div className="header-actions">
          <button 
            className="print-button"
            onClick={handlePrint}
            disabled={isPrinting}
          >
            {isPrinting ? '印刷中...' : '🖨️ 印刷'}
          </button>
          <button 
            className="dashboard-button"
            onClick={handleBackToDashboard}
          >
            🏠 ダッシュボード
          </button>
        </div>
      </div>

      {/* 証明書本体 */}
      <div className="certificate-container">
        <div className="certificate-paper">
          {/* 装飾的な背景要素 */}
          <div className="certificate-border">
            <div className="corner-decoration top-left"></div>
            <div className="corner-decoration top-right"></div>
            <div className="corner-decoration bottom-left"></div>
            <div className="corner-decoration bottom-right"></div>
          </div>

          {/* 証明書内容 */}
          <div className="certificate-content">
            {/* ヘッダー部分 */}
            <div className="certificate-header-section">
              <div className="organization-logo">
                <div className="logo-circle">
                  <span className="logo-text">SS</span>
                </div>
              </div>
              <div className="organization-info">
                <h2 className="organization-name">スタディスフィア東京校</h2>
                <p className="organization-subtitle">Study Sphere Tokyo Campus</p>
                <p className="organization-address">
                  〒100-0001 東京都千代田区千代田1-1-1<br />
                  TEL: 03-1234-5678
                </p>
              </div>
            </div>

            {/* メインタイトル */}
            <div className="certificate-title">
              <h1>修了証明書</h1>
              <p className="title-subtitle">Certificate of Completion</p>
            </div>

            {/* 証明書本文 */}
            <div className="certificate-body">
              <p className="certificate-text">
                この証明書は、下記の方が
                <span className="highlight">{certificateData.lessonTitle}</span>
                の学習を修了したことを証明します。
              </p>

              <div className="student-info">
                <div className="info-row">
                  <span className="info-label">氏名</span>
                  <span className="info-value">{certificateData.studentName}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">生徒ID</span>
                  <span className="info-value">{certificateData.studentId}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">修了日</span>
                  <span className="info-value">{certificateData.completionDate}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">テスト結果</span>
                  <span className="info-value score">{certificateData.score}点</span>
                </div>
              </div>

              <p className="certificate-text">
                上記の学習内容を理解し、効果テストに合格したことを確認いたします。
                今後の学習活動においても、この知識を活用していただくことを期待いたします。
              </p>
            </div>

            {/* 署名部分 */}
            <div className="certificate-signature">
              <div className="signature-section">
                <div className="signature-line"></div>
                <p className="signature-name">{certificateData.instructorName}</p>
                <p className="signature-title">指導員</p>
              </div>
              <div className="signature-section">
                <div className="signature-line"></div>
                <p className="signature-name">スタディスフィア東京校</p>
                <p className="signature-title">代表者</p>
              </div>
            </div>

            {/* 証明書ID */}
            <div className="certificate-id">
              <p>証明書ID: {certificateData.certificateId}</p>
            </div>

            {/* 装飾的な要素 */}
            <div className="certificate-seal">
              <div className="seal-circle">
                <span className="seal-text">合格</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* アクションボタン */}
      <div className="certificate-actions">
        <button 
          className="download-button"
          onClick={handlePrint}
        >
          📥 PDFでダウンロード
        </button>
        <button 
          className="share-button"
          onClick={() => alert('共有機能は開発中です')}
        >
          📤 共有する
        </button>
      </div>

      {/* 印刷時のスタイル */}
      <style jsx>{`
        @media print {
          .certificate-header,
          .certificate-actions {
            display: none !important;
          }
          .certificate-page {
            background: white !important;
            padding: 0 !important;
          }
          .certificate-container {
            margin: 0 !important;
          }
          .certificate-paper {
            box-shadow: none !important;
            border: 2px solid #2c3e50 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default CertificatePage; 