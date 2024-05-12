import React, { useState, useEffect } from 'react';

const ScheduleBanner = ({ studyGroup }) => {
  const [newSchedule, setNewSchedule] = useState('');
  const [schedules, setSchedules] = useState([]);

  // 로컬 스토리지에서 해당 스터디 그룹의 일정 가져오기
  useEffect(() => {
    const storedSchedules = localStorage.getItem(`schedules_${studyGroup.id}`);
    if (storedSchedules) {
      setSchedules(JSON.parse(storedSchedules));
    }
  }, [studyGroup]);

  // 새로운 일정 추가
  const handleAddSchedule = () => {
    if (newSchedule.trim() !== '') {
      const updatedSchedules = [...schedules, newSchedule];
      setSchedules(updatedSchedules);
      // 로컬 스토리지에 해당 스터디 그룹의 일정 저장
      localStorage.setItem(`schedules_${studyGroup.id}`, JSON.stringify(updatedSchedules));
      setNewSchedule('');
    }
  };

  // 일정 삭제
  const handleDeleteSchedule = (index) => {
    const updatedSchedules = [...schedules];
    updatedSchedules.splice(index, 1);
    setSchedules(updatedSchedules);
    // 로컬 스토리지에서 해당 스터디 그룹의 일정 삭제
    localStorage.setItem(`schedules_${studyGroup.id}`, JSON.stringify(updatedSchedules));
  };

  return (
    <div style={{ backgroundColor: '#E0FFFF', padding: '10px', marginBottom: '20px' }}>
      <h3>일정 관리</h3>
      {/* 일정 추가 폼 */}
      <div>
        <input
          type="text"
          value={newSchedule}
          onChange={(e) => setNewSchedule(e.target.value)}
          placeholder="날짜와 시간을 포함한 일정 추가"
        />
        <button onClick={handleAddSchedule}>추가</button>
      </div>
      {/* 일정 목록 */}
      <ul>
        {schedules.map((schedule, index) => (
          <li key={index}>
            {schedule}
            <button onClick={() => handleDeleteSchedule(index)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScheduleBanner;
