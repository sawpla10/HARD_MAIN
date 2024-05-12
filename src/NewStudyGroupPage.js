import React, { useState, useEffect } from 'react';

const NewStudyGroupPage = () => {
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태
  const [studyGroups, setStudyGroups] = useState([]); // 스터디 그룹 목록 상태

  // 로컬 스토리지에서 스터디 그룹 목록을 불러와 초기화
  useEffect(() => {
    const savedStudyGroups = localStorage.getItem('studyGroups');
    if (savedStudyGroups) {
      setStudyGroups(JSON.parse(savedStudyGroups));
    }
  }, []);

  // 검색어 입력 시 상태 업데이트
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // 실제 검색 로직을 수행하여 일치하는 스터디 그룹 필터링
  const filteredStudyGroups = studyGroups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: '#FFF8DC', padding: '20px' }}>
      <h2>새로운 스터디 그룹 찾기</h2>
      {/* 검색 입력란 */}
      <input
        type="text"
        placeholder="스터디 그룹 검색"
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginBottom: '10px' }}
      />

      {/* 검색 결과 표시 */}
      <ul>
        {filteredStudyGroups.map(group => (
          <li key={group.id}>{group.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default NewStudyGroupPage;
