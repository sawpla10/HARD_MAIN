// CurrentStudyGroupPage.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CurrentStudyGroupPage = () => {
  const [joinedStudyGroups, setJoinedStudyGroups] = useState([]);

  useEffect(() => {
    const savedStudyGroups = localStorage.getItem('studyGroups');
    if (savedStudyGroups) {
      const parsedStudyGroups = JSON.parse(savedStudyGroups);
      const filteredJoinedGroups = parsedStudyGroups.filter(group => group.isJoined);
      setJoinedStudyGroups(filteredJoinedGroups);
    }
  }, []);

  return (
    <div style={{ backgroundColor: '#FFF8DC', padding: '20px' }}>
      <h2>현재 진행중인 스터디 그룹</h2>
      <ul>
        {joinedStudyGroups.map(group => (
          <li key={group.id}>
            {/* 스터디 그룹 상세 페이지로 이동하는 링크 */}
            <Link to={`/study_group/${group.id}`}>
              {group.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CurrentStudyGroupPage;
