import React, { useState, useEffect } from 'react';

const ProgressBanner = ({ studyGroup }) => {
  const [chapter, setChapter] = useState('');
  const [section, setSection] = useState('');
  const [progressList, setProgressList] = useState([]);

  useEffect(() => {
    const storedProgressList = localStorage.getItem(`progressList_${studyGroup.id}`);
    if (storedProgressList) {
      setProgressList(JSON.parse(storedProgressList));
    }
  }, [studyGroup]);

  const saveProgressListToLocalStorage = (progressList) => {
    localStorage.setItem(`progressList_${studyGroup.id}`, JSON.stringify(progressList));
  };

  const handleChapterChange = (e) => {
    setChapter(e.target.value);
  };

  const handleSectionChange = (e) => {
    setSection(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProgress = {
      chapter: chapter,
      section: section,
    };
    const updatedProgressList = [...progressList, newProgress];
    setProgressList(updatedProgressList);
    saveProgressListToLocalStorage(updatedProgressList); // 새로운 진도 목록을 로컬 스토리지에 저장
    setChapter('');
    setSection('');
  };

  const handleDelete = (index) => {
    const updatedProgressList = progressList.filter((_, idx) => idx !== index);
    setProgressList(updatedProgressList);
    saveProgressListToLocalStorage(updatedProgressList); // 삭제 후의 진도 목록을 로컬 스토리지에 저장
  };

  return (
    <div style={{ backgroundColor: '#98FB98', padding: '10px', marginBottom: '20px' }}>
      <h3>진도 현황</h3>
      <form onSubmit={handleSubmit}>
        <label>
          챕터:
          <input type="text" value={chapter} onChange={handleChapterChange} />
        </label>
        <label>
          섹션:
          <input type="text" value={section} onChange={handleSectionChange} />
        </label>
        <button type="submit">저장</button>
      </form>
      <div>
        <h3>진도 목록</h3>
        <ul>
          {progressList.map((progress, index) => (
            <li key={index}>
              챕터: {progress.chapter}, 섹션: {progress.section}
              <button onClick={() => handleDelete(index)}>삭제</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProgressBanner;
