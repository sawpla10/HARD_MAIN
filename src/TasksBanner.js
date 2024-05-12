import React, { useState, useEffect } from 'react';

const TasksBanner = ({ studyGroup }) => {
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([]);

  // 해당 스터디 그룹의 과제 가져오기
  useEffect(() => {
    const storedTasks = localStorage.getItem(`tasks_${studyGroup.id}`);
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, [studyGroup]);

  // 새로운 과제 추가
  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      const updatedTasks = [...tasks, { name: newTask, completed: false }];
      setTasks(updatedTasks);
      // 해당 스터디 그룹의 과제를 로컬 스토리지에 저장
      localStorage.setItem(`tasks_${studyGroup.id}`, JSON.stringify(updatedTasks));
      setNewTask('');
    }
  };

  // 과제 삭제
  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    // 해당 스터디 그룹의 과제를 로컬 스토리지에서 삭제
    localStorage.setItem(`tasks_${studyGroup.id}`, JSON.stringify(updatedTasks));
  };

  // 과제 체크 토글
  const handleToggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
    // 해당 스터디 그룹의 과제를 로컬 스토리지에 업데이트
    localStorage.setItem(`tasks_${studyGroup.id}`, JSON.stringify(updatedTasks));
  };

  return (
    <div style={{ backgroundColor: '#FFA07A', padding: '10px', marginBottom: '20px' }}>
      <h3>과제 현황</h3>
      {/* 과제 추가 폼 */}
      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="새로운 과제 추가"
        />
        <button onClick={handleAddTask}>추가</button>
      </div>
      {/* 과제 목록 */}
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleTask(index)}
            />
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.name}
            </span>
            <button onClick={() => handleDeleteTask(index)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksBanner;
