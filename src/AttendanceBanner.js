import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';

const AttendanceBanner = ({ studyGroup }) => {
  const [attendanceDates, setAttendanceDates] = useState([]);

  useEffect(() => {
    const storedAttendanceDates = JSON.parse(localStorage.getItem(`attendanceDates_${studyGroup.id}`));
    if (storedAttendanceDates) {
      setAttendanceDates(storedAttendanceDates);
    }
  }, [studyGroup]);

  const updateAttendanceDates = (newAttendanceDates) => {
    setAttendanceDates(newAttendanceDates);
    localStorage.setItem(`attendanceDates_${studyGroup.id}`, JSON.stringify(newAttendanceDates));
  };

  const handleDateClick = (date) => {
    const dateString = date.toISOString().split('T')[0];

    let updatedAttendanceDates;
    if (attendanceDates.includes(dateString)) {
      updatedAttendanceDates = attendanceDates.filter(attendDate => attendDate !== dateString);
    } else {
      updatedAttendanceDates = [...attendanceDates, dateString];
    }
    updateAttendanceDates(updatedAttendanceDates);
  };

  return (
    <div style={{ backgroundColor: '#FFD700', padding: '10px', marginBottom: '20px' }}>
      <h3>출석 현황</h3>
      <Calendar
        onClickDay={handleDateClick}
        value={new Date()}
        tileContent={({ date }) => {
          const dateString = date.toISOString().split('T')[0];
          const isAttended = attendanceDates.includes(dateString);
          if (isAttended) {
            return <p>출석</p>;
          }
        }}
      />
    </div>
  );
};

export default AttendanceBanner;
