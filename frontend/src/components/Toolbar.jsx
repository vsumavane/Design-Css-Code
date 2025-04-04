import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedTool } from '../redux/toolsSlice';
import { FaSquare, FaTextHeight, FaMousePointer, FaCircle, FaPen } from 'react-icons/fa';
// import { Tooltip } from 'react-tooltip';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const Toolbar = () => {
  const dispatch = useDispatch();
  const selectedTool = useSelector(state => state.tools.selectedTool);

  const tools = [
    { id: 'select', icon: <FaMousePointer size={22} />, label: 'Select Tool' },
    { id: 'rectangle', icon: <FaSquare size={22} />, label: 'Rectangle Tool' },
    { id: 'circle', icon: <FaCircle size={22} />, label: 'Circle Tool' },
    { id: 'text', icon: <FaTextHeight size={22} />, label: 'Text Tool' },
    { id: 'pen', icon: <FaPen size={22} />, label: 'Pen Tool' },
  ];

  return (
    <div className="flex flex-col items-center space-y-3 bg-gradient-to-b from-gray-900 to-gray-800 text-white p-3 h-full w-16 shadow-lg">
      {tools.map((tool) => (
        <div key={tool.id} className="w-full">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => dispatch(setSelectedTool(tool.id))}
                  className={`w-full p-2.5 rounded-md transition-all duration-200 ${
                    selectedTool === tool.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'hover:bg-gray-700 text-gray-300 hover:text-white'
                  }`}
                >
                  {tool.icon}
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{tool.label}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ))}
      <div className="w-full h-px bg-gray-700 my-2"></div>
    </div>
  );
};

export default Toolbar;
