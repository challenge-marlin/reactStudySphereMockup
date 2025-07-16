import React from 'react';
import './RecentActivity.css';

const RecentActivity = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'lesson':
        return '📚';
      case 'assignment':
        return '📝';
      case 'test':
        return '📊';
      default:
        return '📋';
    }
  };

  const getActivityTypeLabel = (type) => {
    switch (type) {
      case 'lesson':
        return 'レッスン';
      case 'assignment':
        return '課題';
      case 'test':
        return 'テスト';
      default:
        return '活動';
    }
  };

  const getStatusColor = (status) => {
    if (status === '完了' || status === '提出済み' || status.includes('点')) {
      return '#27ae60';
    } else if (status === '進行中') {
      return '#f39c12';
    } else {
      return '#95a5a6';
    }
  };

  return (
    <div className="recent-activity">
      <div className="activity-list">
        {activities.map((activity, index) => (
          <div key={index} className="activity-item">
            <div className="activity-icon">
              {getActivityIcon(activity.type)}
            </div>
            <div className="activity-content">
              <div className="activity-title">{activity.title}</div>
              <div className="activity-meta">
                <span className="activity-type">
                  {getActivityTypeLabel(activity.type)}
                </span>
                <span className="activity-date">{activity.date}</span>
              </div>
              {activity.course && (
                <div className="activity-course">
                  📖 {activity.course}
                </div>
              )}
              {activity.status && (
                <div 
                  className="activity-status"
                  style={{ color: getStatusColor(activity.status) }}
                >
                  {activity.status}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <button className="view-all-button">すべての活動を見る</button>
    </div>
  );
};

export default RecentActivity; 