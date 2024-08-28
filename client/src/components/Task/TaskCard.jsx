import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../constant'; // Ensure this path is correct

const TaskCard = ({ task, onDelete, onEdit, onView }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TASK,
    item: { id: task._id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag} // Attach drag ref to the div
      className={`w-full border-2 rounded-md bg-blue-200 p-2 ${isDragging ? 'opacity-50' : ''}`} // Apply opacity if dragging
    >
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
