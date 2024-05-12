import React, { useState, useEffect } from 'react';

const ManageStudyGroupPage = () => {
  // 로컬 스토리지에서 스터디 그룹 목록을 불러오기
  const savedStudyGroups = localStorage.getItem('studyGroups');
  const initialStudyGroups = savedStudyGroups ? JSON.parse(savedStudyGroups) : [];
  const [studyGroups, setStudyGroups] = useState(initialStudyGroups);

  // 스터디 그룹이 변경될 때마다 로컬 스토리지에 저장하기
  useEffect(() => {
    localStorage.setItem('studyGroups', JSON.stringify(studyGroups));
  }, [studyGroups]);

  // 새로운 스터디 그룹 추가하기
  const addStudyGroup = () => {
    const groupName = prompt('추가할 스터디 그룹의 이름을 입력하세요:');
    if (groupName) {
      const newGroup = {
        id: Date.now(), // 고유한 ID를 생성하기 위해 현재 시간을 사용 (실제로는 더 안전한 방법을 사용해야 함)
        name: groupName,
        isJoined: false // 새로 생성된 그룹은 가입되지 않은 상태로 설정
      };
      setStudyGroups([...studyGroups, newGroup]);
    }
  };

  // 스터디 그룹 삭제하기
  const deleteStudyGroup = (id) => {
    if (window.confirm('정말로 이 스터디 그룹을 삭제하시겠습니까?')) {
      const updatedGroups = studyGroups.filter(group => group.id !== id);
      setStudyGroups(updatedGroups);
    }
  };

  // 스터디 그룹 가입하기
  const joinStudyGroup = (id) => {
    const updatedGroups = studyGroups.map(group =>
      group.id === id ? { ...group, isJoined: true } : group
    );
    setStudyGroups(updatedGroups);
  };

  // 스터디 그룹 탈퇴하기
  const leaveStudyGroup = (id) => {
    const updatedGroups = studyGroups.map(group =>
      group.id === id ? { ...group, isJoined: false } : group
    );
    setStudyGroups(updatedGroups);
  };

  return (
    <div style={{ backgroundColor: '#FFF8DC', padding: '20px' }}>
      <h2>스터디 그룹 관리</h2>
      {/* 새로운 스터디 그룹 추가 버튼 */}
      <button onClick={addStudyGroup}>새로운 스터디 그룹 추가하기</button>

      {/* 스터디 그룹 목록 */}
      <ul>
        {studyGroups.map(group => (
          <li key={group.id}>
            {group.name}{' '}
            {group.isJoined ? (
              <button onClick={() => leaveStudyGroup(group.id)}>탈퇴</button>
            ) : (
              <button onClick={() => joinStudyGroup(group.id)}>가입</button>
            )}{' '}
            <button onClick={() => deleteStudyGroup(group.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageStudyGroupPage;
