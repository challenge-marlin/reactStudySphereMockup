import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './HomeSupportStudentDetailPage.css';
import { generateDailyReportPDF, generateWeeklyReportPDF, generateMonthlyReportPDF } from '../utils/pdfGenerator';
import DailyReportTab from '../components/DailyReportTab';
import UnifiedReportsList from '../components/UnifiedReportsList';

const StudentDetailPage = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [reports, setReports] = useState({
    daily: [],
    weekly: [],
    monthly: []
  });

  // 生徒データを取得
  useEffect(() => {
    const mockStudents = [
      { 
        id: 'student001', 
        name: '末吉　元気', 
        email: 'sueyoshi@example.com', 
        instructorId: 'instructor001',
        instructorName: '佐藤指導員',
        locationId: 'location001',
        locationName: '東京本校',
        recipientNumber: '123456789012',
        lastLogin: '2024-01-15',
        status: 'active',
        loginToken: 'f9Ul-7OlL-OPZE',
        joinDate: '2024-01-01',
        canStudyAtHome: true,
        tags: ['佐藤指導員', 'ITリテラシー・AIの基本', '東京本校', '中級者', '必修科目', '初級コース']
      }
    ];

    const foundStudent = mockStudents.find(s => s.id === studentId);
    setStudent(foundStudent);

    // モック報告書データ
    const mockReports = {
      daily: [
        {
          id: 'daily001',
          date: '2024-01-15',
          temperature: '36.2',
          healthCondition: 'good',
          healthNotes: '体調は良好です。',
          plannedWork: 'ITリテラシー・AIの基本の学習を進めます。',
          actualWork: 'HTML/CSS基礎学習とレスポンシブデザイン実習を行い、基本概念を理解しました。',
          thoughts: '学習が順調に進んでいます。',
          nextGoal: '次回はより高度な内容に挑戦したいと思います。'
        },
        {
          id: 'daily002',
          date: '2024-01-14',
          temperature: '36.5',
          healthCondition: 'normal',
          healthNotes: '少し疲れ気味ですが、作業は可能です。',
          plannedWork: 'AIの基本概念について学習します。',
          actualWork: 'AIの基本概念とChatGPTの使い方について学習しました。',
          thoughts: 'AIの可能性を実感できました。',
          nextGoal: '実際のプロジェクトでAIを活用してみたい。'
        }
      ],
      weekly: [
        {
          id: 'weekly001',
          period: '2024-01-08 - 2024-01-14',
          evaluationDate: '2024-01-14',
          overallProgress: 85,
          achievements: ['HTML基礎完了', 'CSS基本概念理解'],
          challenges: ['CSS Gridの応用'],
          nextWeekPlan: 'JavaScript基礎学習開始',
          instructorNotes: '順調に進捗している'
        }
      ],
      monthly: [
        {
          id: 'monthly001',
          period: '2024-01-01 - 2024-01-31',
          evaluationDate: '2024-01-31',
          overallProgress: 75,
          skillImprovements: ['HTML/CSS基礎スキル習得', 'Webデザイン基礎理解'],
          workHabits: '規則正しい学習習慣が身についた',
          goals: 'JavaScript習得とポートフォリオ作成',
          instructorEvaluation: '着実にスキルアップしている'
        }
      ]
    };

    setReports(mockReports);
  }, [studentId]);

  if (!student) {
    return <div className="loading">生徒情報を読み込み中...</div>;
  }

  const handleBack = () => {
    navigate('/instructor/home-support-evaluations');
  };

  // 報告書の保存
  const handleSaveReport = (reportData, type) => {
    const newReport = {
      id: reportData.id || `${type}_${Date.now()}`,
      ...reportData
    };
    
    setReports(prev => ({
      ...prev,
      [type]: prev[type].filter(r => r.id !== newReport.id).concat(newReport)
    }));
    
    console.log(`${type}報告書を保存:`, newReport);
  };

  // 日次報告書の保存（後方互換性）
  const handleSaveDailyReport = (reportData) => {
    handleSaveReport(reportData, 'daily');
  };

  // 日次報告書の編集
  const handleEditDailyReport = (reportId) => {
    const report = reports.daily.find(r => r.id === reportId);
    if (report) {
      console.log('日次報告書を編集:', report);
    }
  };

  // 報告書の削除
  const handleDeleteReport = (reportId, type) => {
    setReports(prev => ({
      ...prev,
      [type]: prev[type].filter(r => r.id !== reportId)
    }));
    
    console.log(`${type}報告書を削除:`, reportId);
  };

  // 日次報告書の削除（後方互換性）
  const handleDeleteDailyReport = (reportId) => {
    handleDeleteReport(reportId, 'daily');
  };

  // 報告書詳細ページへの遷移
  const handleNavigateToReport = (type, date, report) => {
    setSelectedReport({ type, date, report });
  };

  // 報告書一覧に戻る
  const handleBackToReports = () => {
    setSelectedReport(null);
  };

  const handleCreateReport = (type) => {
    // 報告書作成モーダルを開く
    console.log(`${type}報告書を作成します`);
  };

  const handleEditReport = (type, reportId) => {
    // 報告書編集モーダルを開く
    console.log(`${type}報告書を編集します: ${reportId}`);
  };

  const handleDownloadPDF = (type, reportId) => {
    // PDFダウンロード機能
    let report;
    switch (type) {
      case 'daily':
        report = reports.daily.find(r => r.id === reportId);
        if (report) generateDailyReportPDF(report, student);
        break;
      case 'weekly':
        report = reports.weekly.find(r => r.id === reportId);
        if (report) generateWeeklyReportPDF(report, student);
        break;
      case 'monthly':
        report = reports.monthly.find(r => r.id === reportId);
        if (report) generateMonthlyReportPDF(report, student);
        break;
      default:
        console.log(`${type}報告書をPDFでダウンロードします: ${reportId}`);
    }
  };

  // 統合リスト用のPDF出力機能
  const handleDownloadPDFFromList = (report) => {
    try {
      switch (report.type) {
        case 'daily':
          generateDailyReportPDF(report, student);
          break;
        case 'weekly':
          generateWeeklyReportPDF(report, student);
          break;
        case 'monthly':
          generateMonthlyReportPDF(report, student);
          break;
        default:
          console.log(`未知の報告書タイプ: ${report.type}`);
      }
    } catch (error) {
      console.error('PDF生成エラー:', error);
      alert('PDFの生成に失敗しました。');
    }
  };

  return (
    <div className="home-support-student-detail">
      <div className="hs-page-header">
        <button className="hs-back-btn" onClick={handleBack}>
          ← 在宅支援管理に戻る
        </button>
        <h1>📋 {student.name} の詳細管理</h1>
      </div>

      {/* 生徒基本情報 */}
      <div className="hs-student-info-card">
        <div className="hs-info-header">
          <h2>👤 基本情報</h2>
        </div>
        <div className="hs-info-grid">
          <div className="hs-info-item">
            <label>氏名:</label>
            <span>{student.name}</span>
          </div>
          <div className="hs-info-item">
            <label>メール:</label>
            <span>{student.email}</span>
          </div>
          <div className="hs-info-item">
            <label>担当指導員:</label>
            <span>{student.instructorName}</span>
          </div>
          <div className="hs-info-item">
            <label>拠点:</label>
            <span>{student.locationName}</span>
          </div>
          <div className="hs-info-item">
            <label>利用開始日:</label>
            <span>{student.joinDate}</span>
          </div>
          <div className="hs-info-item">
            <label>受給者証番号:</label>
            <span className="hs-recipient-number">{student.recipientNumber}</span>
          </div>
          <div className="hs-info-item">
            <label>最終ログイン:</label>
            <span>{student.lastLogin}</span>
          </div>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="hs-main-content">
        {!selectedReport ? (
          <div className="hs-unified-reports-container">
            <UnifiedReportsList 
              student={student}
              reports={reports}
              onNavigateToReport={handleNavigateToReport}
              onDownloadPDF={handleDownloadPDFFromList}
            />
          </div>
        ) : (
          <div className="hs-report-detail">
            <div className="hs-report-detail-header">
              <button 
                className="hs-back-to-list-btn"
                onClick={handleBackToReports}
              >
                ← 報告書一覧に戻る
              </button>
              <h3>
                {selectedReport.type === 'daily' && '📝 日次報告書'}
                {selectedReport.type === 'weekly' && '📅 週次報告書'}
                {selectedReport.type === 'monthly' && '📈 月次報告書'}
                {' - '}{selectedReport.date}
              </h3>
            </div>
            
            {selectedReport.type === 'daily' && (
              <DailyReportTab 
                student={student}
                reports={reports.daily || []}
                onSave={handleSaveDailyReport}
                onEdit={handleEditDailyReport}
                onDelete={handleDeleteDailyReport}
                onDownloadPDF={(report) => handleDownloadPDF('daily', report.id)}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDetailPage; 