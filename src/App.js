import { useState } from 'react';
import './App.css';

function App() {
  const [tit, setTit] = useState('');
  const [info, setInfo] = useState('');
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('Todo'); 
  const [isEditing, setIsEditing] = useState(null); 
  const [editTit, setEditTit] = useState(''); 
  const [editinfo, setEditInfo] = useState(''); 

  const addTask = () => {
    if (tit.trim() && info.trim()) {
      const newTask = {
        tit,
        info,
        completed: false,
      };
      setTasks([...tasks, newTask]); 
      setTit(''); 
      setInfo(''); 
    }
  };

  const Completion = (i) => {
    const updatedTasks = tasks.map((task, k) =>
      k === i ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const startEdit = (i) => {
    setIsEditing(i);
    setEditTit(tasks[i].tit);
    setEditInfo(tasks[i].info);
  };

  const updateTask = (i) => {
    const updatedTasks = tasks.map((task, k) =>
      k === i? { ...task, tit: editTit, info: editinfo} : task
    );
    setTasks(updatedTasks);
    setIsEditing(null); 
  };

  const filteredTasks = tasks.filter((task) =>
    filter === 'Todo' ? !task.completed : task.completed
  );

  return (
    <div className='App'>
      <h1>Daily Routine</h1>
      <div className='T1'>
        <div className='T2'>
          <div className='T3'>
            <label>Title</label>
            <input
              type='text'
              placeholder='title'
              value={tit}
              onChange={(input) => setTit(input.target.value)}
            />
          </div>
          <div className='T3'>
            <label>Description</label>
            <input
              type='text'
              placeholder='Description'
              value={info}
              onChange={(input) => setInfo(input.target.value)}
            />
          </div>
          <div className='T3'>
            <button type='button' className='B2' onClick={addTask}>
            Append
            </button>
          </div>
          <div className='B1'>
            <button onClick={() => setFilter('Todo')}>Todo</button>
            <button onClick={() => setFilter('Completed')}>Completed</button>
          </div>
          <div className='T4'>
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task, index) => (
                <div key={index} className='T2'>
                  {isEditing === index ? (
                    <div>
                      <input
                        type='text'
                        value={editTit}
                        onChange={(input) => setEditTit(input.target.value)}
                      />
                      <input
                        type='text'
                        value={editinfo}
                        onChange={(input) => setEditInfo(input.target.value)}
                      />
                      <button onClick={() => updateTask(index)}>
                        Update
                      </button>
                    </div>
                  ) : (
                    <div>
                      <h2>{task.tit}</h2>
                      <h6>{task.info}</h6>
                      <button
                        onClick={() => Completion(index)}
                        className={task.completed ? 'completed' : ''}
                      >
                        {task.completed ? 'Todo' : 'Completed'}
                      </button>
                      <button onClick={() => startEdit(index)}>
                        Update
                      </button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p>No task</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
