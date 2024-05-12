import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ScheduleBanner from './ScheduleBanner';
import AttendanceBanner from './AttendanceBanner';
import TasksBanner from './TasksBanner';
import ProgressBanner from './ProgressBanner'; // ProgressBanner 컴포넌트 import

const StudyGroupDetailPage = () => {
  const { id } = useParams();
  const [studyGroup, setStudyGroup] = useState(null);

  useEffect(() => {
    const savedStudyGroups = localStorage.getItem('studyGroups');
    if (savedStudyGroups) {
      const parsedStudyGroups = JSON.parse(savedStudyGroups);
      const group = parsedStudyGroups.find(group => group.id === parseInt(id));
      setStudyGroup(group);
    }
  }, [id]);

  const saveToLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  if (!studyGroup) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ backgroundColor: '#FFF8DC', padding: '20px' }}>
      <h2>{studyGroup.name}</h2>
      
      {/* ScheduleBanner 컴포넌트 */}
      <ScheduleBanner studyGroup={studyGroup} onSave={saveToLocalStorage} />
      
      {/* ProgressBanner 컴포넌트 */}
      <ProgressBanner studyGroup={studyGroup} onSave={saveToLocalStorage} />
      
      {/* AttendanceBanner 컴포넌트 */}
      <AttendanceBanner studyGroup={studyGroup} onSave={saveToLocalStorage} />
      
      {/* TasksBanner 컴포넌트 */}
      <TasksBanner studyGroup={studyGroup} onSave={saveToLocalStorage} />
    </div>
  );
};

export default StudyGroupDetailPage;
