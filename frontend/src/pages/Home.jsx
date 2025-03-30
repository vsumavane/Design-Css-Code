// src/pages/Home.jsx
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to AI Code Generator</h1>
        <p className="text-lg mb-6">Design and generate clean HTML/CSS code.</p>
        <button
          onClick={() => navigate('/editor')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Launch Editor
        </button>
      </div>
    </div>
  );
};

export default Home;
