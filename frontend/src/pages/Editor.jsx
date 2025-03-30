import React from 'react';
import Toolbar from '../components/Toolbar';
import Artboard from '../components/Artboard';
import LayersPanel from '../components/LayersPanel';
import MenuBar from '../components/MenuBar';

const Editor = () => {
  return (
    <div className="flex flex-col h-screen">
      <MenuBar />
      <div className="flex flex-1">
        <div className="w-14 bg-gray-900">
          <Toolbar />
        </div>
        <div className="flex-1 flex justify-center items-center bg-gray-100 relative">
          <Artboard />
        </div>
        <LayersPanel />
      </div>
    </div>
  );
};

export default Editor;
