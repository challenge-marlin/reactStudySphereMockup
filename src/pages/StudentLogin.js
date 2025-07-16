import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './StudentLogin.css';

const StudentLogin = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [isValidating, setIsValidating] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // モック学生データ
    const studentTokens = {
      'token123': { 
        id: 'student001', 
        name: '鈴木太郎', 
        instructorId: 'instructor001',
        instructorName: '佐藤指導員'
      },
      'token456': { 
        id: 'student002', 
        name: '田中花子', 
        instructorId: 'instructor001',
        instructorName: '佐藤指導員'
      },
      'token789': { 
        id: 'student003', 
        name: '山田次郎', 
        instructorId: 'instructor002',
        instructorName: '田中指導員'
      },
      'token101': { 
        id: 'student004', 
        name: '佐藤美咲', 
        instructorId: 'instructor003',
        instructorName: '鈴木指導員'
      }
    };

    // トークンの検証（モック）
    setTimeout(() => {
      const studentData = studentTokens[token];
      
      if (studentData) {
        // 学生情報をlocalStorageに保存
        const studentUser = {
          ...studentData,
          role: 'student',
          loginToken: token
        };
        localStorage.setItem('currentUser', JSON.stringify(studentUser));
        
        // 学生ダッシュボードにリダイレクト
        navigate('/student/dashboard');
      } else {
        setError('無効なログインURLです。指導員に正しいURLを確認してください。');
        setIsValidating(false);
      }
    }, 1500); // ローディング体験のため
  }, [token, navigate]);

  const sampleStudentLinks = [
    { url: `${process.env.PUBLIC_URL}/student/login/token123`, label: '生徒1: token123' },
    { url: `${process.env.PUBLIC_URL}/student/login/token456`, label: '生徒2: token456' },
    { url: `${process.env.PUBLIC_URL}/student/login/token789`, label: '生徒3: token789' },
    { url: `${process.env.PUBLIC_URL}/student/login/token101`, label: '生徒4: token101' },
  ];

  const SampleStudentLinks = () => (
    <div className="sample-student-links" style={{ marginTop: 32, padding: 16, background: '#f8f8f8', borderRadius: 8 }}>
      <h3 style={{ marginBottom: 8 }}>サンプル生徒ログインURL</h3>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {sampleStudentLinks.map(link => (
          <li key={link.url} style={{ marginBottom: 4 }}>
            <a href={link.url}>{link.label} ({link.url})</a>
          </li>
        ))}
      </ul>
      <div style={{ fontSize: '0.9em', color: '#888', marginTop: 8 }}>
        ※上記URLをクリックすると該当生徒としてログインできます（モック動作）
      </div>
    </div>
  );

  if (isValidating) {
    return (
      <div className="student-login">
        <div className="login-container">
          <div className="student-loading-spinner">
            <div className="student-spinner"></div>
            <p>ログイン中...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="student-login">
        <div className="login-container">
          <div className="error-message">
            <h2>ログインエラー</h2>
            <p>{error}</p>
            <button onClick={() => navigate('/')} className="back-button">
              ログイン画面に戻る
            </button>
          </div>
          <SampleStudentLinks />
        </div>
      </div>
    );
  }

  // ログイン成功時は即リダイレクトされるため何も表示しない
  return (
    <div className="student-login">
      <div className="login-container">
        <SampleStudentLinks />
      </div>
    </div>
  );
};

export default StudentLogin; 