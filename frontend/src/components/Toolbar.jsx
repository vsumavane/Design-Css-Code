import React from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedTool } from '../redux/toolsSlice';
import { FaSquare, FaTextHeight, FaMousePointer, FaCircle } from 'react-icons/fa';

const Toolbar = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center space-y-4 bg-gray-800 text-white p-2 h-full w-14">
      <button
        onClick={() => dispatch(setSelectedTool('select'))}
        className="p-2 hover:bg-gray-700 rounded"
      >
        <FaMousePointer size={20} />
      </button>
      <button
        onClick={() => dispatch(setSelectedTool('rectangle'))}
        className="p-2 hover:bg-gray-700 rounded"
      >
        <FaSquare size={20} />
      </button>
      <button
        onClick={() => dispatch(setSelectedTool('circle'))}
        className="p-2 hover:bg-gray-700 rounded"
      >
        <FaCircle size={20} />
      </button>
      <button
        onClick={() => dispatch(setSelectedTool('text'))}
        className="p-2 hover:bg-gray-700 rounded"
      >
        <FaTextHeight size={20} />
      </button>
    </div>
  );
};

export default Toolbar;
