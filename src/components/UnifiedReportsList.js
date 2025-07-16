import React, { useState, useEffect } from 'react';
import './UnifiedReportsList.css';
import WeeklyEvaluationDetail from './WeeklyEvaluationDetail';
import MonthlyEvaluationDetail from './MonthlyEvaluationDetail';

const UnifiedReportsList = ({ student, reports, onNavigateToReport, onDownloadPDF }) => {
  const [filterType, setFilterType] = useState('all'); // all, daily, weekly, monthly
  const [sortBy, setSortBy] = useState('date'); // date, type, status
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredReports, setFilteredReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  // 統合された報告書リストを作成
  const createUnifiedReports = () => {
    const unified = [];
    
    // 日次報告書を追加
    if (reports.daily) {
      reports.daily.forEach(report => {
        unified.push({
          ...report,
          type: 'daily',
          typeLabel: '日次報告書',
          typeIcon: '📝',
          status: report.id ? 'completed' : 'pending'
        });
      });
    }
    
    // 週次報告書を追加
    if (reports.weekly) {
      reports.weekly.forEach(report => {
        unified.push({
          ...report,
          type: 'weekly',
          typeLabel: '週次報告書',
          typeIcon: '📅',
          status: report.id ? 'completed' : 'pending'
        });
      });
    }
    
    // 月次報告書を追加
    if (reports.monthly) {
      reports.monthly.forEach(report => {
        unified.push({
          ...report,
          type: 'monthly',
          typeLabel: '月次報告書',
          typeIcon: '📈',
          status: report.id ? 'completed' : 'pending'
        });
      });
    }
    
    return unified;
  };

  // フィルタリングとソート
  useEffect(() => {
    let filtered = createUnifiedReports();
    
    // タイプでフィルタリング
    if (filterType !== 'all') {
      filtered = filtered.filter(report => report.type === filterType);
    }
    
    // 検索でフィルタリング
    if (searchTerm) {
      filtered = filtered.filter(report => 
        report.date.includes(searchTerm) ||
        report.typeLabel.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (report.actualWork && report.actualWork.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (report.thoughts && report.thoughts.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // ソート
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date) - new Date(a.date);
        case 'type':
          return a.typeLabel.localeCompare(b.typeLabel);
        case 'status':
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
    });
    
    setFilteredReports(filtered);
  }, [reports, filterType, sortBy, searchTerm]);

  // 報告書のステータスを取得
  const getReportStatus = (report) => {
    if (report.status === 'completed') {
      return { label: '作成済み', class: 'completed' };
    }
    
    const today = new Date();
    const reportDate = new Date(report.date);
    const daysDiff = (today - reportDate) / (1000 * 60 * 60 * 24);
    
    if (daysDiff > 7) {
      return { label: '期限切れ', class: 'expired' };
    } else if (daysDiff > 3) {
      return { label: '要作成', class: 'urgent' };
    } else {
      return { label: '未作成', class: 'pending' };
    }
  };

  // 報告書をクリックした時の処理
  const handleReportClick = (report) => {
    if (report.type === 'weekly' || report.type === 'monthly') {
      setSelectedReport(report);
      setShowDetail(true);
    } else {
      onNavigateToReport(report.type, report.date, report);
    }
  };

  // 詳細表示を閉じる
  const handleCloseDetail = () => {
    setShowDetail(false);
    setSelectedReport(null);
  };

  // 週次・月次評価を保存
  const handleSaveEvaluation = (evaluationData) => {
    console.log('評価データを保存:', evaluationData);
    // 実際の実装では、ここでAPIを呼び出してデータを保存
    handleCloseDetail();
  };

  // 週次・月次評価を削除
  const handleDeleteEvaluation = (reportId) => {
    console.log('評価を削除:', reportId);
    // 実際の実装では、ここでAPIを呼び出してデータを削除
    handleCloseDetail();
  };

  // 新規作成ボタンの処理
  const handleCreateNew = (type) => {
    const today = new Date().toISOString().split('T')[0];
    onNavigateToReport(type, today, null);
  };

  return (
    <div className="unified-reports-list">
      <div className="reports-header">
        <h3>📋 報告書一覧</h3>
        <div className="header-actions">
          <div className="filter-controls">
            <select 
              value={filterType} 
              onChange={(e) => setFilterType(e.target.value)}
              className="filter-select"
            >
              <option value="all">すべて</option>
              <option value="daily">日次報告書</option>
              <option value="weekly">週次報告書</option>
              <option value="monthly">月次報告書</option>
            </select>
            
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="date">日付順</option>
              <option value="type">種類順</option>
              <option value="status">ステータス順</option>
            </select>
          </div>
          
          <input
            type="text"
            placeholder="日付または内容で検索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="quick-actions">
        <button 
          className="create-btn daily"
          onClick={() => handleCreateNew('daily')}
        >
          ➕ 日次報告書作成
        </button>
        <button 
          className="create-btn weekly"
          onClick={() => handleCreateNew('weekly')}
        >
          ➕ 週次報告書作成
        </button>
        <button 
          className="create-btn monthly"
          onClick={() => handleCreateNew('monthly')}
        >
          ➕ 月次報告書作成
        </button>
      </div>

      <div className="reports-container">
        {filteredReports.length === 0 ? (
          <div className="no-reports">
            <div className="no-reports-icon">📄</div>
            <p>該当する報告書が見つかりません。</p>
            <div className="no-reports-actions">
              <button 
                className="create-first-btn"
                onClick={() => handleCreateNew('daily')}
              >
                最初の報告書を作成
              </button>
            </div>
          </div>
        ) : (
          <div className="reports-grid">
            {filteredReports.map((report, index) => {
              const status = getReportStatus(report);
              return (
                <div 
                  key={`${report.type}-${report.date}-${index}`} 
                  className={`report-card ${status.class}`}
                  onClick={() => handleReportClick(report)}
                >
                  <div className="report-header">
                    <div className="report-type">
                      <span className="type-icon">{report.typeIcon}</span>
                      <span className="type-label">{report.typeLabel}</span>
                    </div>
                    <div className={`status-badge ${status.class}`}>
                      {status.label}
                    </div>
                  </div>
                  
                  <div className="report-date">
                    {report.date}
                  </div>
                  
                  <div className="report-summary">
                    {report.type === 'daily' && (
                      <>
                        <div className="summary-item">
                          <span className="label">体温:</span>
                          <span className="value">{report.temperature || '--'}℃</span>
                        </div>
                        <div className="summary-item">
                          <span className="label">体調:</span>
                          <span className="value">
                            {report.healthCondition === 'good' ? '良好' : 
                             report.healthCondition === 'normal' ? '普通' : '悪い'}
                          </span>
                        </div>
                        <div className="summary-item">
                          <span className="label">作業実績:</span>
                          <span className="value">
                            {report.actualWork ? 
                              (report.actualWork.length > 30 ? 
                                report.actualWork.substring(0, 30) + '...' : 
                                report.actualWork) : 
                              '未入力'}
                          </span>
                        </div>
                      </>
                    )}
                    
                    {report.type === 'weekly' && (
                      <>
                        <div className="summary-item">
                          <span className="label">期間:</span>
                          <span className="value">{report.period}</span>
                        </div>
                        <div className="summary-item">
                          <span className="label">進捗:</span>
                          <span className="value">{report.overallProgress || '--'}%</span>
                        </div>
                        <div className="summary-item">
                          <span className="label">成果:</span>
                          <span className="value">
                            {report.achievements && report.achievements.length > 0 ? 
                              report.achievements[0] : '未入力'}
                          </span>
                        </div>
                      </>
                    )}
                    
                    {report.type === 'monthly' && (
                      <>
                        <div className="summary-item">
                          <span className="label">期間:</span>
                          <span className="value">{report.period}</span>
                        </div>
                        <div className="summary-item">
                          <span className="label">進捗:</span>
                          <span className="value">{report.overallProgress || '--'}%</span>
                        </div>
                        <div className="summary-item">
                          <span className="label">スキル向上:</span>
                          <span className="value">
                            {report.skillImprovements && report.skillImprovements.length > 0 ? 
                              report.skillImprovements[0] : '未入力'}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                  
                  <div className="report-actions">
                    <button 
                      className="view-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReportClick(report);
                      }}
                    >
                      👁️ 表示
                    </button>
                    {report.status === 'completed' && (
                      <button 
                        className="edit-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReportClick(report);
                        }}
                      >
                        ✏️ 編集
                      </button>
                    )}
                    <button 
                      className="pdf-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDownloadPDF && onDownloadPDF(report);
                      }}
                      title={`${report.typeLabel}をPDFでダウンロード`}
                    >
                      📄 PDF
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 週次・月次評価の詳細表示 */}
      {showDetail && selectedReport && (
        <div className="detail-overlay">
          <div className="detail-modal">
            <div className="detail-modal-header">
              <h3>{selectedReport.typeLabel} - {selectedReport.date}</h3>
              <button 
                className="close-detail-btn"
                onClick={handleCloseDetail}
              >
                ×
              </button>
            </div>
            <div className="detail-modal-content">
              {selectedReport.type === 'weekly' && (
                <WeeklyEvaluationDetail
                  student={student}
                  report={selectedReport}
                  onSave={handleSaveEvaluation}
                  onDelete={handleDeleteEvaluation}
                  onDownloadPDF={onDownloadPDF}
                />
              )}
              {selectedReport.type === 'monthly' && (
                <MonthlyEvaluationDetail
                  student={student}
                  report={selectedReport}
                  onSave={handleSaveEvaluation}
                  onDelete={handleDeleteEvaluation}
                  onDownloadPDF={onDownloadPDF}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnifiedReportsList; 