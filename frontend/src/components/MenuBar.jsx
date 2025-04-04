// src/components/MenuBar.jsx
import React from 'react';

const MenuBar = () => {
  return (
    <div className="flex justify-between items-center bg-red-900 text-white px-4 py-2">
      {/* Left Side: Menu Options */}
      <div className="flex space-x-4">
        <button className="hover:bg-red-700 px-3 py-1 rounded">File</button>
        <button className="hover:bg-red-700 px-3 py-1 rounded">Edit</button>
        <button className="hover:bg-red-700 px-3 py-1 rounded">View</button>
        <button className="hover:bg-red-700 px-3 py-1 rounded">Help</button>
      </div>

      {/* Right Side: User Panel */}
      <div className="flex items-center space-x-2">
        <div className="w-6 h-6 bg-white rounded-full"></div>
        <div className="text-sm">User Name</div>
      </div>
    </div>
  );
};

export default MenuBar;
