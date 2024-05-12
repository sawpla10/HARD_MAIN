import React, { useState, useEffect } from 'react';
import axios from 'axios'; //flask와 웹페이지를 연결하기위해서 사용
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CurrentStudyGroupPage from './CurrentStudyGroupPage';
import NewStudyGroupPage from './NewStudyGroupPage';
import ManageStudyGroupPage from './ManageStudyGroupPage';
import StudyGroupDetailPage from './StudyGroupDetailPage'; // 스터디 그룹 상세 페이지 컴포넌트 import


// 사용자 정보를 담을 상태
const userInfo = {
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true', // 로그인 상태를 로컬 스토리지에서 가져옴
  username: localStorage.getItem('username') || '', // 저장된 아이디를 가져옴
  password: ''
};

// Wrapper 컴포넌트
const Wrapper = ({ children }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#F5F5DC' }}>
      {children}
    </div>
  );
};

// 로그인 컴포넌트
const LoginBanner = ({ onLogin }) => {
  const [username, setUsername] = useState(localStorage.getItem('username') || ''); // 저장된 아이디를 가져옴
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const handleLogin = () => {
    // 예: 실제로는 서버에 요청하여 사용자 정보를 확인해야 합니다.
    if (username === 'apple' && password === '1234') {
      localStorage.setItem('isLoggedIn', 'true'); // 로그인 상태를 로컬 스토리지에 저장
      localStorage.setItem('username', username); // 아이디를 로컬 스토리지에 저장
      userInfo.isLoggedIn = true;
      userInfo.username = username;
      userInfo.password = password;
      onLogin(); // 로그인 상태 업데이트
    } else {
      setLoginError(true);
    }
  };

  return (
    <div style={{ flex: '0 0 200px', border: '1px solid #ccc', padding: '10px', marginRight: '10px', backgroundColor: '#F5F5DC' }}>
      {!userInfo.isLoggedIn ? (
        <div>
          <h2>로그인</h2>
          <input type="text" placeholder="아이디" value={username} onChange={e => setUsername(e.target.value)} />
          <input type="password" placeholder="비밀번호" value={password} onChange={e => setPassword(e.target.value)} />
          <button style={{ backgroundColor: '#4682B4', color: 'white' }} onClick={handleLogin}>로그인</button>
          {loginError && <div>아이디 또는 비밀번호가 올바르지 않습니다.</div>}
        </div>
      ) : null}
    </div>
  );
};

// 사용자 정보 컴포넌트
const UserInfo = ({ onLogout }) => {
  // 로그아웃 버튼 클릭 시 로그아웃 처리 후 로그인 화면으로 돌아가기 위한 함수
  const handleLogout = () => {
    // 사용자 정보 초기화
    userInfo.isLoggedIn = false;
    userInfo.username = '';
    userInfo.password = '';
    localStorage.removeItem('isLoggedIn'); // 로컬 스토리지에서 로그인 상태 제거
    localStorage.removeItem('username'); // 로컬 스토리지에서 아이디 제거
    // 로그아웃 처리
    onLogout();
  };

  return (
    <div style={{ display: 'flex', width: '90%', marginBottom: '20px' }}>
      <div style={{ flex: 1, border: '1px solid #ccc', padding: '10px', marginRight: '10px', height: '100%', backgroundColor: '#F5F5DC' }}>
        <div style={{ border: '1px solid #ccc', padding: '10px', height: '100%' }}>
          {userInfo.isLoggedIn ? (
            <div>
              <h2>내 정보</h2>
              <p>아이디: {userInfo.username}</p>
              <button style={{ backgroundColor: '#FFF8DC', color: 'black' }} onClick={handleLogout}>로그아웃</button>
            </div>
          ) : (
            <div>로그인을 해주세요</div>
          )}
        </div>
        <div style={{ flex: 1, border: '1px solid #ccc', padding: '10px', height: '100%', minHeight: '125px', backgroundColor: '#F5F5DC' }}></div>
      </div>
      <div style={{ flex: 2.5, border: '1px solid #ccc', padding: '10px', marginBottom: '20px', backgroundColor: '#F5F5DC' }}>
        <PopularStudyGroups />
      </div>
    </div>
  );
};
/*
// 사용자 맞춤 스터디 그룹 컴포넌트
const CustomStudyGroups = () => {
  // 사용자 맞춤 스터디 그룹들 배열
  const customGroups = [
    { id: 1, title: '맞춤 스터디 그룹 1' },
    { id: 2, title: '맞춤 스터디 그룹 2' },
    { id: 3, title: '맞춤 스터디 그룹 3' },
    { id: 4, title: '맞춤 스터디 그룹 4' },
    { id: 5, title: '맞춤 스터디 그룹 5' },
    { id: 6, title: '맞춤 스터디 그룹 6' },
    // 추가적인 사용자 맞춤 스터디 그룹들을 필요한 만큼 배열에 추가할 수 있습니다
  ];

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', flex: 1, marginRight: '100px', backgroundColor: '#F5F5DC' }}>
      <StudyBanner title="사용자 맞춤 스터디 그룹" />
      {/* 사용자 맞춤 스터디 그룹들을 동적으로 표시 */ /*}*/
      
      /*<div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {customGroups.map(group => (
          <StudyBanner key={group.id} title={group.title} style={{ flex: '0 0 calc(20% - 10px)', marginRight: '10px', marginBottom: '10px', backgroundColor: '#FFF8DC' }} />
        ))}
      </div>
    </div>
  );
};
*/

// 새로 추가한 부분
// 사용자 맞춤 스터디 그룹 컴포넌트
const CustomStudyGroups = () => {
  const [customGroups, setCustomGroups] = useState([]);

  // 컴포넌트가 마운트된 후 서버로부터 맞춤 스터디 그룹 데이터를 불러옵니다.
  useEffect(() => {
    const fetchGroups = async () => {
      axios.get('http://localhost:5000/similarity')
      .then(response => {
        console.log(response.data);  // 서버로부터 받은 데이터를 콘솔에 출력
        // 여기서 response.data를 원하는 대로 처리하면 됩니다.
      })
      .catch(error => console.error('Error:', error));
    };

    fetchGroups();
  }, []);

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', flex: 1, marginRight: '100px', backgroundColor: '#F5F5DC' }}>
      <StudyBanner title="사용자 맞춤 스터디 그룹" />
      {/* 사용자 맞춤 스터디 그룹들을 동적으로 표시 */}
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {customGroups.map(group => (
          <StudyBanner key={group.id} title={group.title} style={{ flex: '0 0 calc(20% - 10px)', marginRight: '10px', marginBottom: '10px', backgroundColor: '#FFF8DC' }} />
        ))}
      </div>
    </div>
  );
};


// 인기 스터디 그룹 컴포넌트
const PopularStudyGroups = () => {
  // 인기 스터디 그룹들 배열
  const popularGroups = [
    { id: 1, title: '인기 스터디 그룹 1' },
    { id: 2, title: '인기 스터디 그룹 2' },
    { id: 3, title: '인기 스터디 그룹 3' },
    { id: 4, title: '인기 스터디 그룹 4' },
    { id: 5, title: '인기 스터디 그룹 5' },
    { id: 6, title: '인기 스터디 그룹 6' },
    // 추가적인 인기 스터디 그룹들을 필요한 만큼 배열에 추가할 수 있습니다
  ];

  return (
    <div style={{ padding: '10px', marginBottom: '20px', width: '80%', backgroundColor: '#F5F5DC' }}>
      <StudyBanner title="인기 스터디 그룹" />
      {/* 인기 스터디 그룹들을 동적으로 표시 */}
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {popularGroups.map(group => (
          <StudyBanner key={group.id} title={group.title} style={{ flex: '1', margin: '0 2.5%', border: '1px solid #ccc', backgroundColor: '#FFF8DC' }} />
        ))}
      </div>
    </div>
  );
};

// 스터디 관련 배너 컴포넌트
const StudyBanner = ({ title }) => {
  return <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '30px', backgroundColor: '#FFF8DC' }}><h3>{title}</h3></div>;
};

// 스터디 그룹 관련 컴포넌트
const StudyGroups = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid #ccc', padding: '10px', marginBottom: '20px', width: '25%', backgroundColor: '#F5F5DC' }}>
      <Link to="/current_study_group"><StudyBanner title="현재 진행중인 스터디 그룹" /></Link>
      <Link to="/new_study_group"><StudyBanner title="새로운 스터디 그룹 찾기" /></Link>
      <Link to="/manage_study_group"><StudyBanner title="스터디 그룹 관리" /></Link>
    </div>
  );
};


// 메인 앱 컴포넌트
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(userInfo.isLoggedIn);

  // 컴포넌트가 마운트될 때 한 번만 실행되는 부분
  useEffect(() => {
    // 로그인 상태가 변경될 때 로컬 스토리지에 반영
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  // 로그인 상태 업데이트 함수
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // 로그아웃 상태 업데이트 함수
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Wrapper>
        <div>
          {isLoggedIn ? (
            <>
              <UserInfo onLogout={handleLogout} />
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <StudyGroups style={{ flex: 1, marginRight: '10px' }} />
                <CustomStudyGroups style={{ flex: 1 }} />
              </div>
              <Routes>
                <Route path="/current_study_group" element={<CurrentStudyGroupPage />} />
                <Route path="/new_study_group" element={<NewStudyGroupPage />} />
                <Route path="/manage_study_group" element={<ManageStudyGroupPage />} />
                <Route path="/study_group/:id" element={<StudyGroupDetailPage />} />
                {/* 다른 경로에 대한 처리도 추가할 수 있습니다 */}
              </Routes>
            </>
          ) : (
            <LoginBanner onLogin={handleLogin} />
          )}
        </div>
      </Wrapper> 
    </Router>
  );
};


export default App;