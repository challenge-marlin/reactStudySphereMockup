import React, { useState, useEffect } from 'react';
import './StudentManagement.css';

const StudentManagement = ({ teacherId }) => {
  // 管理者画面で作成されたコースデータを取得
  const [availableCourses, setAvailableCourses] = useState([]);
  
  // タグ管理用のstate
  const [showTagModal, setShowTagModal] = useState(false);
  const [newTagName, setNewTagName] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [tagsToAdd, setTagsToAdd] = useState([]);
  const [customTags, setCustomTags] = useState([
    '優秀', '要フォロー', '積極的', '消極的', '欠席が多い', '質問が多い', '理解度高い', '理解度低い'
  ]);
  
  // コースデータを取得する関数
  const fetchCourses = () => {
    // ローカルストレージからコースデータを取得
    const storedCourses = localStorage.getItem('courses');
    if (storedCourses) {
      setAvailableCourses(JSON.parse(storedCourses));
    } else {
      // デフォルトのコースデータ（管理者画面と同じ）
      const defaultCourses = [
        {
          id: 'course001',
          title: 'オフィスソフトの操作・文書作成',
          category: '選択科目',
          description: 'Word、Excel、PowerPointの基本操作を学び、実務で使える文書作成スキルを習得',
          duration: '3ヶ月',
          difficulty: 'beginner',
          totalLessons: 6,
          enrolledStudents: 12,
          completionRate: 85,
          status: 'active',
          createdDate: '2023-06-01',
          lastUpdated: '2024-01-10',
          tags: ['Word', 'Excel', 'PowerPoint', '文書作成', '選択科目'],
          isElective: true,
          prerequisites: [],
          order: 0
        },
        {
          id: 'course002',
          title: 'ITリテラシー・AIの基本',
          category: '必修科目',
          description: 'ITの基礎知識とAIの基本概念を学び、デジタル社会で活躍するための土台を構築',
          duration: '3ヶ月',
          difficulty: 'beginner',
          totalLessons: 6,
          enrolledStudents: 15,
          completionRate: 78,
          status: 'active',
          createdDate: '2023-08-01',
          lastUpdated: '2024-01-12',
          tags: ['IT基礎', 'AI', 'Windows11', 'インターネット', '必修科目'],
          isElective: false,
          prerequisites: [],
          order: 1
        },
        {
          id: 'course003',
          title: 'SNS運用の基礎・画像生成編集',
          category: '必修科目',
          description: 'SNSマーケティングの基礎と画像編集技術を学び、効果的なコンテンツ作成スキルを習得',
          duration: '6ヶ月',
          difficulty: 'intermediate',
          totalLessons: 12,
          enrolledStudents: 8,
          completionRate: 65,
          status: 'active',
          createdDate: '2023-09-01',
          lastUpdated: '2024-01-08',
          tags: ['SNS', 'マーケティング', 'Canva', 'Recraft', 'AI画像生成'],
          isElective: false,
          prerequisites: ['course002'],
          order: 2
        },
        {
          id: 'course004',
          title: 'LP制作(HTML・CSS)',
          category: '必修科目',
          description: 'HTML・CSSを使ったランディングページ制作技術を学び、Web制作の実践スキルを習得',
          duration: '3ヶ月',
          difficulty: 'intermediate',
          totalLessons: 12,
          enrolledStudents: 6,
          completionRate: 72,
          status: 'active',
          createdDate: '2023-10-01',
          lastUpdated: '2024-01-05',
          tags: ['HTML', 'CSS', 'LP制作', 'レスポンシブ', 'Web制作'],
          isElective: false,
          prerequisites: ['course003'],
          order: 3
        },
        {
          id: 'course005',
          title: 'SNS管理代行・LP制作案件対応',
          category: '必修科目',
          description: '実際の案件を想定したSNS管理代行とLP制作の実践的なスキルを習得',
          duration: '3ヶ月',
          difficulty: 'advanced',
          totalLessons: 12,
          enrolledStudents: 4,
          completionRate: 45,
          status: 'active',
          createdDate: '2023-11-01',
          lastUpdated: '2024-01-03',
          tags: ['案件対応', 'プロジェクト管理', 'クライアント対応', '実践'],
          isElective: false,
          prerequisites: ['course004'],
          order: 4
        }
      ];
      setAvailableCourses(defaultCourses);
      localStorage.setItem('courses', JSON.stringify(defaultCourses));
    }
  };

  // コンポーネントマウント時にコースデータを取得
  useEffect(() => {
    fetchCourses();
  }, []);

  // 新規タグを作成する関数
  const createNewTag = () => {
    if (newTagName.trim() && !customTags.includes(newTagName.trim())) {
      setCustomTags([...customTags, newTagName.trim()]);
      setNewTagName('');
    }
  };

  // 生徒の選択状態を切り替える関数
  const toggleStudentSelection = (studentId) => {
    setSelectedStudents(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  // 全生徒を選択/選択解除する関数
  const toggleAllStudents = () => {
    const filteredStudents = getFilteredStudents();
    if (selectedStudents.length === filteredStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(filteredStudents.map(student => student.id));
    }
  };

  // タグを追加/削除する関数
  const toggleTagToAdd = (tag) => {
    setTagsToAdd(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  // 一括タグ付与を実行する関数
  const applyTagsToStudents = () => {
    if (selectedStudents.length === 0) {
      alert('生徒を選択してください。');
      return;
    }
    if (tagsToAdd.length === 0) {
      alert('付与するタグを選択してください。');
      return;
    }

    setStudents(students.map(student => {
      if (selectedStudents.includes(student.id)) {
        // 既存のタグに新しいタグを追加（重複は除外）
        const existingTags = student.tags || [];
        const newTags = [...new Set([...existingTags, ...tagsToAdd])];
        
        return {
          ...student,
          tags: newTags
        };
      }
      return student;
    }));

    // モーダルをリセット
    setSelectedStudents([]);
    setTagsToAdd([]);
    setShowTagModal(false);
    
    alert(`${selectedStudents.length}名の生徒に${tagsToAdd.length}個のタグを付与しました。`);
  };

  // 適切なタグを生成する関数
  const generateTags = (courseTitle, instructorName, locationName, progress) => {
    const tags = [instructorName, courseTitle, locationName];
    
    // 進捗に基づくレベルタグ
    if (progress >= 80) {
      tags.push('上級者');
      if (progress >= 95) tags.push('優秀');
    } else if (progress >= 50) {
      tags.push('中級者');
    } else {
      tags.push('初級者');
    }
    
    // コースの難易度に基づくタグ
    const course = availableCourses.find(c => c.title === courseTitle);
    if (course) {
      switch (course.difficulty) {
        case 'beginner':
          tags.push('初級コース');
          break;
        case 'intermediate':
          tags.push('中級コース');
          break;
        case 'advanced':
          tags.push('上級コース');
          break;
        default:
          tags.push('初級コース');
          break;
      }
      
      // コースカテゴリに基づくタグ
      if (course.category === '必修科目') {
        tags.push('必修科目');
      } else {
        tags.push('選択科目');
      }
    }
    
    return tags;
  };

  const [students, setStudents] = useState([
    { 
      id: 'student001', 
      name: '末吉　元気', 
      email: 'sueyoshi@example.com', 
      class: 'ITリテラシー・AIの基本',
      instructorId: 'instructor001',
      instructorName: '佐藤指導員',
      locationId: 'location001',
      locationName: '東京本校',
      progress: 75,
      lastLogin: '2024-01-15',
      status: 'active',
      loginToken: 'f9Ul-7OlL-OPZE',
      joinDate: '2024-01-01',
      canStudyAtHome: true,
      tags: ['佐藤指導員', 'ITリテラシー・AIの基本', '東京本校', '中級者', '必修科目', '初級コース']
    },
    { 
      id: 'student002', 
      name: '小渕　正明', 
      email: 'obuchi@example.com', 
      class: 'ITリテラシー・AIの基本',
      instructorId: 'instructor002',
      instructorName: '田中指導員',
      locationId: 'location001',
      locationName: '東京本校',
      progress: 25,
      lastLogin: '2024-01-14',
      status: 'active',
      loginToken: 'uEmA-W5hw-tZNz',
      joinDate: '2024-01-03',
      canStudyAtHome: false,
      tags: ['田中指導員', 'ITリテラシー・AIの基本', '東京本校', '初級者', '必修科目', '初級コース']
    },
    { 
      id: 'student003', 
      name: '田中花子', 
      email: 'tanaka.h@example.com', 
      class: 'SNS運用の基礎・画像生成編集',
      instructorId: 'instructor001',
      instructorName: '佐藤指導員',
      locationId: 'location001',
      locationName: '東京本校',
      progress: 60,
      lastLogin: '2024-01-14',
      status: 'active',
      loginToken: 'aBc3-Def6-GhI9',
      joinDate: '2024-01-02',
      canStudyAtHome: true,
      tags: ['佐藤指導員', 'SNS運用の基礎・画像生成編集', '東京本校', '中級者', '必修科目', '中級コース']
    },
    { 
      id: 'student004', 
      name: '鈴木太郎', 
      email: 'suzuki.t@example.com', 
      class: 'オフィスソフトの操作・文書作成',
      instructorId: 'instructor002',
      instructorName: '田中指導員',
      locationId: 'location001',
      locationName: '東京本校',
      progress: 40,
      lastLogin: '2024-01-13',
      status: 'active',
      loginToken: 'xYz1-Abc4-DeF7',
      joinDate: '2024-01-04',
      canStudyAtHome: false,
      tags: ['田中指導員', 'オフィスソフトの操作・文書作成', '東京本校', '初級者', '選択科目', '初級コース']
    },
    { 
      id: 'student005', 
      name: '山田一郎', 
      email: 'yamada.i@example.com', 
      class: 'LP制作(HTML・CSS)',
      instructorId: 'instructor004',
      instructorName: '山田指導員',
      locationId: 'location003',
      locationName: '新宿サテライト',
      progress: 90,
      lastLogin: '2024-01-15',
      status: 'active',
      loginToken: 'mNp2-Qrs5-Tuv8',
      joinDate: '2024-01-01',
      canStudyAtHome: true,
      tags: ['山田指導員', 'LP制作(HTML・CSS)', '新宿サテライト', '上級者', '必修科目', '中級コース']
    },
    { 
      id: 'student006', 
      name: '佐藤美咲', 
      email: 'sato.m@example.com', 
      class: 'SNS管理代行・LP制作案件対応',
      instructorId: 'instructor003',
      instructorName: '鈴木指導員',
      locationId: 'location002',
      locationName: '大阪支校',
      progress: 80,
      lastLogin: '2024-01-14',
      status: 'active',
      loginToken: 'jKl3-Mno6-Pqr9',
      joinDate: '2024-01-02',
      canStudyAtHome: true,
      tags: ['鈴木指導員', 'SNS管理代行・LP制作案件対応', '大阪支校', '上級者', '必修科目', '上級コース']
    },
    { 
      id: 'student007', 
      name: '高橋健太', 
      email: 'takahashi.k@example.com', 
      class: 'SNS運用の基礎・画像生成編集',
      instructorId: 'instructor001',
      instructorName: '佐藤指導員',
      locationId: 'location001',
      locationName: '東京本校',
      progress: 15,
      lastLogin: '2024-01-12',
      status: 'inactive',
      loginToken: 'sT4-uVw7-Xyz0',
      joinDate: '2024-01-06',
      canStudyAtHome: false,
      tags: ['佐藤指導員', 'SNS運用の基礎・画像生成編集', '東京本校', '初級者', '必修科目', '中級コース']
    },
    { 
      id: 'student008', 
      name: '伊藤麻衣', 
      email: 'ito.m@example.com', 
      class: 'SNS管理代行・LP制作案件対応',
      instructorId: 'instructor002',
      instructorName: '田中指導員',
      locationId: 'location001',
      locationName: '東京本校',
      progress: 95,
      lastLogin: '2024-01-15',
      status: 'active',
      loginToken: 'bCd5-Efg8-Hij1',
      joinDate: '2023-12-15',
      canStudyAtHome: true,
      tags: ['田中指導員', 'SNS管理代行・LP制作案件対応', '東京本校', '上級者', '優秀', '必修科目', '上級コース']
    }
  ]);

  // 現在ログイン中の指導員情報を取得
  const getCurrentInstructor = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return currentUser;
  };

  const currentInstructor = getCurrentInstructor();
  
  // フィルタリングされた生徒リストを取得
  const getFilteredStudents = () => {
    let filteredStudents = students;
    
    // ロールベースのフィルタリング（管理者は全生徒、指導員は拠点内生徒）
    if (currentInstructor.role !== 'admin') {
      filteredStudents = filteredStudents.filter(student => 
        student.instructorId === currentInstructor.id || // 自分の生徒
        student.locationId === currentInstructor.locationId // 同一拠点の生徒
      );
    }
    
    // 検索キーワードでフィルタリング
    if (searchTerm) {
      filteredStudents = filteredStudents.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.instructorName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // タグでフィルタリング
    if (selectedTags.length > 0) {
      filteredStudents = filteredStudents.filter(student =>
        selectedTags.every(tag => student.tags?.includes(tag))
      );
    }
    
    // ステータスでフィルタリング
    if (statusFilter !== 'all') {
      filteredStudents = filteredStudents.filter(student =>
        student.status === statusFilter
      );
    }
    
    return filteredStudents;
  };

  const [showAddForm, setShowAddForm] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    locationId: '',
    canStudyAtHome: false
  });
  
  // 一括入力用のstate
  const [bulkInputMode, setBulkInputMode] = useState(false);
  const [bulkInputText, setBulkInputText] = useState('');
  const [bulkLocationId, setBulkLocationId] = useState('');
  const [bulkCanStudyAtHome, setBulkCanStudyAtHome] = useState(false);
  
  // 検索・フィルター関連のstate
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all'); // all, active, inactive
  
  // 全てのタグを取得
  const getAllTags = () => {
    const allTags = new Set();
    students.forEach(student => {
      student.tags?.forEach(tag => allTags.add(tag));
    });
    return Array.from(allTags).sort();
  };

  const generateLoginToken = () => {
    return 'token' + Math.random().toString(36).substr(2, 9);
  };

  // 拠点データを取得する関数
  const getAvailableLocations = () => {
    // ローカルストレージから拠点データを取得
    const storedFacilities = localStorage.getItem('facilities');
    if (storedFacilities) {
      const facilities = JSON.parse(storedFacilities);
      const allLocations = [];
      facilities.forEach(facility => {
        facility.locations.forEach(location => {
          allLocations.push({
            id: location.id,
            name: location.name,
            facilityName: facility.name
          });
        });
      });
      return allLocations;
    } else {
      // デフォルトの拠点データ
      return [
        { id: 'location001', name: '東京本校', facilityName: 'スタディスフィア東京校' },
        { id: 'location002', name: '大阪支校', facilityName: 'スタディスフィア大阪校' },
        { id: 'location003', name: '新宿サテライト', facilityName: 'スタディスフィア東京校' },
        { id: 'location004', name: '池袋教室', facilityName: 'スタディスフィア東京校' },
        { id: 'location005', name: '難波教室', facilityName: 'スタディスフィア大阪校' },
        { id: 'location006', name: '名古屋本校', facilityName: 'スタディスフィア名古屋校' },
        { id: 'location007', name: '福岡本校', facilityName: 'スタディスフィア福岡校' },
        { id: 'location008', name: '天神教室', facilityName: 'スタディスフィア福岡校' },
        { id: 'location009', name: '札幌本校', facilityName: 'スタディスフィア札幌校' },
        { id: 'location010', name: '仙台本校', facilityName: 'スタディスフィア仙台校' }
      ];
    }
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    
    if (bulkInputMode) {
      handleBulkAddStudents();
      return;
    }
    
    const studentId = `student${String(students.length + 1).padStart(3, '0')}`;
    const selectedLocation = getAvailableLocations().find(location => location.id === newStudent.locationId);
    
    const student = {
      id: studentId,
      name: newStudent.name,
      email: newStudent.email,
      class: 'ITリテラシー・AIの基本', // デフォルトクラス
      instructorId: currentInstructor.id,
      instructorName: currentInstructor.name,
      locationId: newStudent.locationId,
      locationName: selectedLocation ? selectedLocation.name : '',
      progress: 0,
      lastLogin: null,
      status: 'active',
      loginToken: generateLoginToken(),
      joinDate: new Date().toISOString().split('T')[0],
      canStudyAtHome: newStudent.canStudyAtHome,
      tags: generateTags('ITリテラシー・AIの基本', currentInstructor.name, selectedLocation ? selectedLocation.name : '', 0)
    };
    
    setStudents([...students, student]);
    setNewStudent({ name: '', email: '', locationId: '', canStudyAtHome: false });
    setShowAddForm(false);
    
    alert('生徒を追加しました。');
  };

  // 一括入力で生徒を追加する関数
  const handleBulkAddStudents = () => {
    if (!bulkInputText.trim()) {
      alert('生徒情報を入力してください。');
      return;
    }
    
    if (!bulkLocationId) {
      alert('拠点を選択してください。');
      return;
    }
    
    const lines = bulkInputText.trim().split('\n').filter(line => line.trim());
    const selectedLocation = getAvailableLocations().find(location => location.id === bulkLocationId);
    const newStudents = [];
    
    lines.forEach((line, index) => {
      const parts = line.split(',').map(part => part.trim());
      if (parts.length >= 2) {
        const name = parts[0];
        const email = parts[1];
        
        if (name && email) {
          const studentId = `student${String(students.length + newStudents.length + 1).padStart(3, '0')}`;
          const student = {
            id: studentId,
            name: name,
            email: email,
            class: 'ITリテラシー・AIの基本', // デフォルトクラス
            instructorId: currentInstructor.id,
            instructorName: currentInstructor.name,
            locationId: bulkLocationId,
            locationName: selectedLocation ? selectedLocation.name : '',
            progress: 0,
            lastLogin: null,
            status: 'active',
            loginToken: generateLoginToken(),
            joinDate: new Date().toISOString().split('T')[0],
            canStudyAtHome: bulkCanStudyAtHome,
            tags: generateTags('ITリテラシー・AIの基本', currentInstructor.name, selectedLocation ? selectedLocation.name : '', 0)
          };
          newStudents.push(student);
        }
      }
    });
    
    if (newStudents.length > 0) {
      setStudents([...students, ...newStudents]);
      setBulkInputText('');
      setBulkLocationId('');
      setBulkCanStudyAtHome(false);
      setBulkInputMode(false);
      setShowAddForm(false);
      
      alert(`${newStudents.length}名の生徒を追加しました。`);
    } else {
      alert('有効な生徒情報が見つかりませんでした。\n形式: 生徒名,メールアドレス');
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewStudent(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };



  const copyLoginUrl = (token) => {
    const loginUrl = `http://localhost:3000/student/login/${token}`;
    navigator.clipboard.writeText(loginUrl);
    alert('ログインURLがクリップボードにコピーされました！');
  };

  // 生徒の進捗を更新する関数（未使用）
  // const updateStudentProgress = (studentId, newProgress) => {
  //   setStudents(students.map(student => {
  //     if (student.id === studentId) {
  //       // 進捗に基づいてタグを再生成
  //       const updatedTags = generateTags(
  //         student.class, 
  //         student.instructorName, 
  //         student.locationName, 
  //         newProgress
  //       );
  //       
  //       return { 
  //         ...student, 
  //         progress: newProgress,
  //         tags: updatedTags
  //       };
  //     }
  //     return student;
  //   }));
  // };

  const toggleStudentStatus = (studentId) => {
    setStudents(students.map(student => 
      student.id === studentId 
        ? { ...student, status: student.status === 'active' ? 'inactive' : 'active' }
        : student
    ));
  };

  const deleteStudent = (studentId) => {
    if (window.confirm('この生徒を削除してもよろしいですか？')) {
      setStudents(students.filter(student => student.id !== studentId));
    }
  };

  const handleViewStudentDetail = (studentId) => {
    // 生徒詳細画面に遷移
    window.location.href = `/instructor/student/${studentId}`;
  };

  const openRecordModal = (studentId) => {
    alert(`${studentId}の在宅記録画面を開きます（実装予定）`);
  };

  // 本日有効ボタン：アクティブな生徒全員にメール送信
  const sendTodayActiveEmails = () => {
    const activeStudents = getFilteredStudents().filter(student => student.status === 'active');
    
    if (activeStudents.length === 0) {
      alert('送信対象の生徒がいません。');
      return;
    }
    
    const confirmMessage = `${activeStudents.length}名の生徒に本日のログインURLをメール送信しますか？\n\n対象生徒:\n${activeStudents.map(s => s.name).join('\n')}`;
    
    if (window.confirm(confirmMessage)) {
      // 実際の実装では、ここでバックエンドAPIを呼び出してメール送信
      alert(`${activeStudents.length}名の生徒にログインURLを送信しました。\n\n送信済み:\n${activeStudents.map(s => `${s.name} (${s.email})`).join('\n')}`);
    }
  };

  // 個別メール再送信
  const resendEmail = (student) => {
    const loginUrl = `http://localhost:3000/student/login/${student.loginToken}`;
    if (window.confirm(`${student.name}さんにログインURLを再送信しますか？\n\nメール: ${student.email}\nURL: ${loginUrl}`)) {
      alert(`${student.name}さんにログインURLを送信しました。`);
    }
  };

  // タグの選択/選択解除
  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  // 全てのフィルターをクリア
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTags([]);
    setStatusFilter('all');
  };

  return (
    <div className="student-management">
      <div className="management-header">
        <div className="header-info">
          <h2>生徒管理</h2>
          {(currentInstructor.role === 'instructor' || currentInstructor.role === 'teacher') && (
            <p className="location-info">
              📍 {currentInstructor.locationName} ({currentInstructor.facilityName})
              <br />
              <small>※同一拠点の他の指導員の生徒も管理できます</small>
            </p>
          )}
        </div>
        <div className="header-actions">
          <button 
            className="bulk-tag-button"
            onClick={() => setShowTagModal(true)}
          >
            🏷️ タグ一括追加
          </button>
          <button 
            className="today-active-button"
            onClick={sendTodayActiveEmails}
          >
            📧 本日有効
          </button>
          <button 
            className="add-student-button"
            onClick={() => setShowAddForm(true)}
          >
            + 新しい生徒を追加
          </button>
        </div>
      </div>

      <div className="filters-section">
        <div className="top-filters">
          <div className="search-bar">
            <input
              type="text"
              placeholder="生徒名、メール、クラス、指導員名で検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button className="clear-filters" onClick={clearFilters}>
              クリア
            </button>
          </div>

          <div className="status-filter">
            <label>ステータス:</label>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">全て</option>
              <option value="active">稼働中</option>
              <option value="inactive">停止中</option>
            </select>
          </div>
        </div>

        <div className="tags-filter">
          <label>タグフィルター:</label>
          <div className="tags-container">
            {getAllTags().map(tag => (
              <button
                key={tag}
                className={`tag-button ${selectedTags.includes(tag) ? 'selected' : ''}`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-summary">
          表示中: {getFilteredStudents().length}名 / 全{students.length}名
          {selectedTags.length > 0 && (
            <span className="selected-tags">
              (選択中のタグ: {selectedTags.join(', ')})
            </span>
          )}
        </div>
      </div>

      {showAddForm && (
        <div className="modal-overlay">
          <div className="add-student-modal">
            <div className="modal-header">
              <h3>新しい生徒を追加</h3>
              <button 
                className="close-button"
                onClick={() => {
                  setShowAddForm(false);
                  setBulkInputMode(false);
                  setBulkInputText('');
                  setBulkLocationId('');
                  setBulkCanStudyAtHome(false);
                }}
              >
                ×
              </button>
            </div>
            
            <div className="input-mode-toggle">
              <button 
                className={`mode-button ${!bulkInputMode ? 'active' : ''}`}
                onClick={() => setBulkInputMode(false)}
              >
                個別入力
              </button>
              <button 
                className={`mode-button ${bulkInputMode ? 'active' : ''}`}
                onClick={() => setBulkInputMode(true)}
              >
                一括入力
              </button>
            </div>
            
            <form onSubmit={handleAddStudent} className="add-student-form">
              {!bulkInputMode ? (
                // 個別入力モード
                <>
                  <div className="form-group">
                    <label htmlFor="name">生徒名</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={newStudent.name}
                      onChange={handleInputChange}
                      required
                      placeholder="生徒の名前を入力"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">メールアドレス</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={newStudent.email}
                      onChange={handleInputChange}
                      required
                      placeholder="メールアドレスを入力"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="location">拠点</label>
                    <select
                      id="location"
                      name="locationId"
                      value={newStudent.locationId}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">拠点を選択</option>
                      {getAvailableLocations().map(location => (
                        <option key={location.id} value={location.id}>
                          {location.name} ({location.facilityName})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="canStudyAtHome">在宅学習可能</label>
                    <input
                      type="checkbox"
                      id="canStudyAtHome"
                      name="canStudyAtHome"
                      checked={newStudent.canStudyAtHome}
                      onChange={handleInputChange}
                    />
                  </div>
                </>
              ) : (
                // 一括入力モード
                <>
                  <div className="form-group">
                    <label htmlFor="bulkInput">生徒情報（1行に1人）</label>
                    <textarea
                      id="bulkInput"
                      value={bulkInputText}
                      onChange={(e) => setBulkInputText(e.target.value)}
                      placeholder="生徒名,メールアドレス&#10;例:&#10;田中太郎,tanaka@example.com&#10;佐藤花子,sato@example.com"
                      rows={8}
                      required
                    />
                    <small className="input-help">
                      形式: 生徒名,メールアドレス（カンマ区切り）
                    </small>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="bulkLocation">拠点</label>
                    <select
                      id="bulkLocation"
                      value={bulkLocationId}
                      onChange={(e) => setBulkLocationId(e.target.value)}
                      required
                    >
                      <option value="">拠点を選択</option>
                      {getAvailableLocations().map(location => (
                        <option key={location.id} value={location.id}>
                          {location.name} ({location.facilityName})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="bulkCanStudyAtHome">在宅学習可能</label>
                    <input
                      type="checkbox"
                      id="bulkCanStudyAtHome"
                      checked={bulkCanStudyAtHome}
                      onChange={(e) => setBulkCanStudyAtHome(e.target.checked)}
                    />
                  </div>
                </>
              )}
              
              <div className="form-actions">
                <button type="button" onClick={() => {
                  setShowAddForm(false);
                  setBulkInputMode(false);
                  setBulkInputText('');
                  setBulkLocationId('');
                  setBulkCanStudyAtHome(false);
                }}>
                  キャンセル
                </button>
                <button type="submit" className="submit-button">
                  {bulkInputMode ? '一括追加' : '追加'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="students-table-container">
        <table className="students-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectedStudents.length === getFilteredStudents().length && getFilteredStudents().length > 0}
                  onChange={toggleAllStudents}
                  className="select-all-checkbox"
                />
              </th>
              <th>利用者名</th>
              <th>タグ</th>
              <th>ログインURL</th>
              <th>状態</th>
              <th>進行度</th>
              <th>合格確認</th>
              <th>成果物確認</th>
              <th>メール送信</th>
              <th>一時停止/再開</th>
              <th>削除</th>
              <th>在宅記録</th>
            </tr>
          </thead>
          <tbody>
            {getFilteredStudents().map(student => (
              <tr key={student.id} className="student-row">
                <td className="student-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedStudents.includes(student.id)}
                    onChange={() => toggleStudentSelection(student.id)}
                    className="student-select-checkbox"
                  />
                </td>
                <td className="student-name">
                  <div className="name-info">
                    <strong 
                      className="student-name-link"
                      onClick={() => handleViewStudentDetail(student.id)}
                      title="生徒詳細を表示"
                    >
                      {student.name}
                    </strong>
                    <small className="teacher-info">
                      担当: {student.instructorName}
                    </small>
                  </div>
                </td>
                <td className="student-tags">
                  <div className="tags-display">
                    {student.tags?.map(tag => (
                      <span key={tag} className="tag-chip">
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="student-token">
                  <div className="token-container">
                    <code className="token-code">{student.loginToken}</code>
                    <button 
                      className="copy-token-btn"
                      onClick={() => copyLoginUrl(student.loginToken)}
                      title="トークンをコピー"
                    >
                      📋
                    </button>
                  </div>
                </td>
                <td className="student-status">
                  <span className={`status-indicator ${student.status}`}>
                    {student.status === 'active' ? '稼働中' : '停止中'}
                  </span>
                </td>
                <td className="student-progress">
                  <div className="name-info">
                    <strong>担当: {student.instructorName}</strong>
                    <br />
                    <small className="teacher-info">
                      {(() => {
                        const course = availableCourses.find(c => c.title === student.class);
                        if (course) {
                          const currentLesson = Math.ceil((student.progress / 100) * course.totalLessons);
                          return `進捗: ${student.progress}% (第${currentLesson}回 / ${course.totalLessons}回)`;
                        }
                        return `進捗: ${student.progress}%`;
                      })()}
                    </small>
                  </div>
                </td>
                <td className="pass-confirmation">
                  <span className={`pass-status ${student.progress >= 75 ? 'passed' : 'not-passed'}`}>
                    {student.progress >= 75 ? '合格' : student.progress > 0 ? '受講中' : '未開始'}
                  </span>
                </td>
                <td className="work-confirmation">
                  <span className={`work-status ${student.progress >= 50 ? 'confirmed' : 'unconfirmed'}`}>
                    {student.progress >= 50 ? '確認済' : student.progress > 0 ? '確認待ち' : '未開始'}
                  </span>
                </td>
                 <td className="email-action">
                   <button 
                     className="action-btn email-btn"
                     onClick={() => resendEmail(student)}
                   >
                     📧 再送信
                   </button>
                 </td>
                 <td className="pause-resume">
                  <button 
                    className={`action-btn ${student.status === 'active' ? 'pause-btn' : 'resume-btn'}`}
                    onClick={() => toggleStudentStatus(student.id)}
                  >
                    {student.status === 'active' ? '停止' : '再開'}
                  </button>
                </td>
                <td className="delete-action">
                  <button 
                    className="action-btn delete-btn"
                    onClick={() => deleteStudent(student.id)}
                  >
                    削除
                  </button>
                </td>
                <td className="home-record">
                  {student.canStudyAtHome ? (
                    <button 
                      className="action-btn record-btn"
                      onClick={() => openRecordModal(student.id)}
                    >
                      在宅学習
                    </button>
                  ) : (
                    <span className="no-home-study">在宅不可</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* タグ一括追加モーダル */}
      {showTagModal && (
        <div className="modal-overlay">
          <div className="tag-modal">
            <div className="modal-header">
              <h3>🏷️ タグ一括追加</h3>
              <button 
                className="close-button"
                onClick={() => {
                  setShowTagModal(false);
                  setSelectedStudents([]);
                  setTagsToAdd([]);
                }}
              >
                ×
              </button>
            </div>
            
            <div className="tag-modal-content">
              {/* 生徒選択セクション */}
              <div className="student-selection-section">
                <h4>📋 生徒選択</h4>
                <div className="student-selection-info">
                  <p>選択中の生徒: <strong>{selectedStudents.length}名</strong></p>
                  <button 
                    className="select-all-btn"
                    onClick={toggleAllStudents}
                  >
                    {selectedStudents.length === getFilteredStudents().length ? '全選択解除' : '全選択'}
                  </button>
                </div>
                
                <div className="student-list">
                  {getFilteredStudents().map(student => (
                    <div 
                      key={student.id} 
                      className={`student-item ${selectedStudents.includes(student.id) ? 'selected' : ''}`}
                      onClick={() => toggleStudentSelection(student.id)}
                    >
                      <input
                        type="checkbox"
                        checked={selectedStudents.includes(student.id)}
                        onChange={() => toggleStudentSelection(student.id)}
                        className="student-checkbox"
                      />
                      <div className="student-info">
                        <span className="student-name">{student.name}</span>
                        <span className="student-instructor">担当: {student.instructorName}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* タグ選択セクション */}
              <div className="tag-selection-section">
                <h4>🏷️ 付与するタグ</h4>
                
                {/* 新規タグ作成 */}
                <div className="new-tag-section">
                  <h5>新規タグ作成</h5>
                  <div className="new-tag-input">
                    <input
                      type="text"
                      value={newTagName}
                      onChange={(e) => setNewTagName(e.target.value)}
                      placeholder="新しいタグ名を入力"
                      onKeyPress={(e) => e.key === 'Enter' && createNewTag()}
                    />
                    <button 
                      className="create-tag-btn"
                      onClick={createNewTag}
                      disabled={!newTagName.trim()}
                    >
                      作成
                    </button>
                  </div>
                </div>

                {/* 既存タグ選択 */}
                <div className="existing-tags-section">
                  <h5>既存タグから選択</h5>
                  <div className="tags-grid">
                    {customTags.map(tag => (
                      <button
                        key={tag}
                        className={`tag-option ${tagsToAdd.includes(tag) ? 'selected' : ''}`}
                        onClick={() => toggleTagToAdd(tag)}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 選択されたタグ表示 */}
                {tagsToAdd.length > 0 && (
                  <div className="selected-tags-display">
                    <h5>選択中のタグ</h5>
                    <div className="selected-tags-list">
                      {tagsToAdd.map(tag => (
                        <span key={tag} className="selected-tag">
                          {tag}
                          <button 
                            className="remove-tag-btn"
                            onClick={() => toggleTagToAdd(tag)}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="modal-actions">
              <button 
                className="cancel-btn"
                onClick={() => {
                  setShowTagModal(false);
                  setSelectedStudents([]);
                  setTagsToAdd([]);
                }}
              >
                キャンセル
              </button>
              <button 
                className="apply-tags-btn"
                onClick={applyTagsToStudents}
                disabled={selectedStudents.length === 0 || tagsToAdd.length === 0}
              >
                {selectedStudents.length > 0 && tagsToAdd.length > 0 
                  ? `${selectedStudents.length}名に${tagsToAdd.length}個のタグを付与`
                  : 'タグを付与'
                }
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentManagement; 