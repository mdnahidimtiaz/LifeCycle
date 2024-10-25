import { useState } from 'react';
import './App.css';

function App() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('Todo'); 
  const [isEditing, setIsEditing] = useState(null); 
  const [editTitle, setEditTitle] = useState(''); 
  const [editDescription, setEditDescription] = useState(''); 

  const addTask = () => {
    if (title.trim() && description.trim()) {
      const newTask = {
        title,
        description,
        completed: false,
      };
      setTasks([...tasks, newTask]); 
      setTitle(''); 
      setDescription(''); 
    }
  };

  const toggleCompletion = (i) => {
    const updatedTasks = tasks.map((task, k) =>
      k === i ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const startEditing = (i) => {
    setIsEditing(i);
    setEditTitle(tasks[i].title);
    setEditDescription(tasks[i].description);
  };

  const updateTask = (i) => {
    const updatedTasks = tasks.map((task, k) =>
      k === i? { ...task, title: editTitle, description: editDescription } : task
    );
    setTasks(updatedTasks);
    setIsEditing(null); 
  };

  const filteredTasks = tasks.filter((task) =>
    filter === 'Todo' ? !task.completed : task.completed
  );

  return (
    <div className='APP'>
      <h1>Daily Routine</h1>
      <div className='todo-w'>
        <div className='todo-i'>
          <div className='todo-i-i'>
            <label>Title</label>
            <input
              type='text'
              placeholder='Task title'
              value={title}
              onChange={(input) => setTitle(input.target.value)}
            />
          </div>
          <div className='todo-i-i'>
            <label>Description</label>
            <input
              type='text'
              placeholder='Description'
              value={description}
              onChange={(input) => setDescription(input.target.value)}
            />
          </div>
          <div className='todo-i-i'>
            <button type='button' className='primarybtn' onClick={addTask}>
              Add
            </button>
          </div>
          <div className='btn-area'>
            <button onClick={() => setFilter('Todo')}>Todo</button>
            <button onClick={() => setFilter('Completed')}>Completed</button>
          </div>
          <div className='todo-l'>
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task, index) => (
                <div key={index} className='todo-i'>
                  {isEditing === index ? (
                    <div>
                      <input
                        type='text'
                        value={editTitle}
                        onChange={(input) => setEditTitle(input.target.value)}
                      />
                      <input
                        type='text'
                        value={editDescription}
                        onChange={(input) => setEditDescription(input.target.value)}
                      />
                      <button onClick={() => updateTask(index)}>
                        Update
                      </button>
                    </div>
                  ) : (
                    <div>
                      <h3>{task.title}</h3>
                      <p>{task.description}</p>
                      <button
                        onClick={() => toggleCompletion(index)}
                        className={task.completed ? 'completed' : ''}
                      >
                        {task.completed ? 'Mark as Todo' : 'Mark as Completed'}
                      </button>
                      <button onClick={() => startEditing(index)}>
                        Update
                      </button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p>No tasks found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;