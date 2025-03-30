import MenuBar from '../components/MenuBar';
import Toolbar from '../components/Toolbar';

const Editor = () => {
  return (
    <div className="flex flex-col h-screen">
      <MenuBar />
      <div className="flex flex-1">
        {/* Toolbar on the Left */}
        <div className="w-14 bg-gray-900">
          <Toolbar />
        </div>

        {/* Main Artboard Area */}
        <div className="flex-1 flex justify-center items-center bg-white">
          <div className="w-3/4 h-3/4 border-2 border-gray-300">
            {/* Artboard Placeholder */}
            <h2 className="text-gray-500 text-center mt-4">Artboard Area</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
