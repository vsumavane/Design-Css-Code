import React from 'react';
import {
  FaMousePointer,
  FaSquare,
  FaTextHeight,
  FaUndo,
  FaRedo,
  FaSearchPlus,
  FaSearchMinus,
} from 'react-icons/fa';

const Toolbar = () => {
  return (
    <div className="flex flex-col items-center space-y-4 bg-gray-800 text-white p-2 h-full w-14">
      {/* Select Tool */}
      <button className="p-2 hover:bg-gray-700 rounded">
        <FaMousePointer size={20} />
      </button>
      {/* Rectangle Tool */}
      <button className="p-2 hover:bg-gray-700 rounded">
        <FaSquare size={20} />
      </button>
      {/* Text Tool */}
      <button className="p-2 hover:bg-gray-700 rounded">
        <FaTextHeight size={20} />
      </button>
      <hr className="border-t border-gray-600 w-full" />
      {/* Undo */}
      <button className="p-2 hover:bg-gray-700 rounded">
        <FaUndo size={20} />
      </button>
      {/* Redo */}
      <button className="p-2 hover:bg-gray-700 rounded">
        <FaRedo size={20} />
      </button>
      <hr className="border-t border-gray-600 w-full" />
      {/* Zoom In */}
      <button className="p-2 hover:bg-gray-700 rounded">
        <FaSearchPlus size={20} />
      </button>
      {/* Zoom Out */}
      <button className="p-2 hover:bg-gray-700 rounded">
        <FaSearchMinus size={20} />
      </button>
    </div>
  );
};

export default Toolbar;
