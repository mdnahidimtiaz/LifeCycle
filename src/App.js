import { useState } from 'react';
import './App.css';

function App() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('Todo'); 
  const [isEditing, setIsEditing] = useState(null); // For tracking which task is being edited
  const [editTitle, setEditTitle] = useState(''); // For updating task title
  const [editDescription, setEditDescription] = useState(''); // For updating task description

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

  const toggleCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const startEditing = (index) => {
    setIsEditing(index);
    setEditTitle(tasks[index].title);
    setEditDescription(tasks[index].description);
  };

  const updateTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, title: editTitle, description: editDescription } : task
    );
    setTasks(updatedTasks);
    setIsEditing(null); // Stop editing after update
  };

  const filteredTasks = tasks.filter((task) =>
    filter === 'Todo' ? !task.completed : task.completed
  );

  return (
    <div className='APP'>
      <h1>Daily Routine</h1>
      <div className='todo-wrapper'>
        <div className='todo-input'>
          <div className='todo-input-item'>
            <label>Title</label>
            <input
              type='text'
              placeholder='Task title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className='todo-input-item'>
            <label>Description</label>
            <input
              type='text'
              placeholder='Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className='todo-input-item'>
            <button type='button' className='primarybtn' onClick={addTask}>
              Add
            </button>
          </div>
          <div className='btn-area'>
            <button onClick={() => setFilter('Todo')}>Todo</button>
            <button onClick={() => setFilter('Completed')}>Completed</button>
          </div>
          <div className='todo-list'>
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task, index) => (
                <div key={index} className='todo-item'>
                  {isEditing === index ? (
                    <div>
                      <input
                        type='text'
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                      />
                      <input
                        type='text'
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
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
