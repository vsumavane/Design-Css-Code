import MenuBar from "../components/MenuBar";


const Editor = () => {
  return (
    <div className="h-screen w-full flex flex-col">
      <MenuBar />
      <div className="flex-1 bg-gray-100">
        {/* Main content area */}
        <h1 className="text-center mt-10">Welcome to the Editor!</h1>
      </div>
    </div>
  );
};

export default Editor;
