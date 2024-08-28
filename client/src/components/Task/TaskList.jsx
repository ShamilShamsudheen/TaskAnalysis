import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks, deleteTask, addTask, editTask } from '../../actions/taskActions';
import TaskCard from './TaskCard';
import TaskPopup from '../Task/TaskPopUp';

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);

  const [showPopup, setShowPopup] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isView, setIsView] = useState(false);

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Do you really want to delete this task?')) {
      dispatch(deleteTask(id));
    }
  };

  const handleEdit = (task) => {
    setCurrentTask(task);
    setIsEdit(true);
    setIsView(false);
    setShowPopup(true);
  };

  const handleView = (task) => {
    setCurrentTask(task);
    setIsEdit(false);
    setIsView(true);
    setShowPopup(true);
  };

  const handleAddTask = () => {
    setCurrentTask({ title: '', description: '', status: 'TODO' });
    setIsEdit(false);
    setIsView(false);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setCurrentTask(null);
  };

  const handleSubmitTask = (taskData) => {
    if (isEdit) {
      dispatch(editTask(taskData));
    } else {
      dispatch(addTask(taskData));
    }
    setShowPopup(false);
  };

  const tasksByStatus = {
    TODO: tasks.filter(task => task.status === 'TODO'),
    'IN PROGRESS': tasks.filter(task => task.status === 'IN PROGRESS'),
    DONE: tasks.filter(task => task.status === 'DONE'),
  };

  return (
    <div className="p-4">
      <div className="items-center mb-4">
        <button
          className="bg-blue-500 w-full text-white p-2 rounded"
          onClick={handleAddTask}
        >
          Add Task
        </button>
      </div>
      <div>
        {/* search and sort here  */}
      </div>
      <div className="flex justify-between space-x-4">
        {['TODO', 'IN PROGRESS', 'DONE'].map(status => (
          <div key={status} className="w-1/3 border-2 rounded-md p-2">
            <h3 className="text-md p-1 text-white bg-blue-500 font-bold mb-2">{status}</h3>
            <div className="space-y-4">
              {tasksByStatus[status].map(task => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                  onView={handleView}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <TaskPopup
        show={showPopup}
        onClose={handleClosePopup}
        onSubmit={handleSubmitTask}
        initialData={currentTask}
        isEdit={isEdit}
        isView={isView}
      />
    </div>
  );
};

export default TaskList;
