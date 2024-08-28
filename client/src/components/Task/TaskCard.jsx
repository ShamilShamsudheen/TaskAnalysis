import React from 'react';

const TaskCard = ({ task, onDelete, onEdit, onView }) => {
  return (
    <div className='w-full border-2 rounded-md bg-blue-200 p-2'>
      <h2 className='font-bold'>{task.title}</h2>
      <p className='font-normal text-sm'>{task.description}</p>
      <p className='mt-6 text-xs font-sans'>Created At: {new Date(task.createdAt).toLocaleString()}</p>
      <div className='flex justify-end space-x-2 w-full p-2'>
        <button className='bg-blue-400 text-white rounded-md p-1 text-xs' onClick={() => onEdit(task)}>Edit</button>
        <button className='bg-red-400 text-white rounded-md p-1 text-xs' onClick={() => onDelete(task._id)}>Delete</button>
        <button className='bg-blue-600 text-white rounded-md p-1 text-xs' onClick={() => onView(task)}>View</button>
      </div>
    </div>
  );
};

export default TaskCard;
