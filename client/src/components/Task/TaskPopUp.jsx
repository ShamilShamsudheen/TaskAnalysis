import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, editTask } from '../../actions/taskActions';

const TaskPopup = ({ show, onClose, initialData, isEdit, isView }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'TODO',
  });

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user.userId);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSubmit = { ...formData, userId };

    try {
      if (isEdit && initialData._id) {
        dispatch(editTask(initialData._id, dataToSubmit));
      } else {
        dispatch(addTask(dataToSubmit));
      }
      onClose();
    } catch (err) {
      console.error(err);
      alert('An error occurred. Please try again.');
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      {!isView ? (
        <div className="bg-white p-6 rounded-lg w-1/3">
          <h2 className="text-2xl font-bold mb-4">{isEdit ? 'Edit Task' : 'Add New Task'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="text"
              placeholder="Task Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
            <textarea
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Task Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
            <select
              className="w-full p-2 border border-gray-300 rounded"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="TODO">TODO</option>
              <option value="IN PROGRESS">IN PROGRESS</option>
              <option value="DONE">DONE</option>
            </select>
            <div className="flex justify-between">
              <button
                type="button"
                className="bg-gray-500 text-white p-2 rounded"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white p-2 rounded"
              >
                {isEdit ? 'Save Changes' : 'Add Task'}
              </button>
            </div>
          </form>
        </div>
      ): (
        <div className="bg-white p-6 rounded-lg w-1/3">
          <h1 className="text-2xl font-bold mb-2">{formData.title}</h1>
          <p className="mb-4">{formData.description}</p>
          <p className="text-xs text-gray-500 mb-6">Created At: {new Date(formData.createdAt).toLocaleString()}</p>
          <button
            type="button"
            className="bg-blue-600 text-white p-2 rounded w-full"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskPopup;
