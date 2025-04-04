// src/pages/Home.jsx
import { useNavigate } from 'react-router-dom';
import { ShootingStars } from '../components/ui/shooting-stars';
import { StarsBackground } from '../components/ui/stars-background';
import { SparklesCore } from '../components/ui/sparkles';

const Home = () => {
  const navigate = useNavigate();
  const handleGetStartedClick = () => {
    navigate('/editor');
  };

  return (
    <div className="font-mono min-h-[40rem] h-screen bg-black flex flex-col items-center justify-center relative w-full overflow-hidden px-4">
      <h2 className="relative z-10 flex flex-col items-center gap-2 text-center max-w-5xl mx-auto mb-6">
        <span className="font-medium text-5xl sm:text-7xl md:text-9xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white">
          DCC
        </span>
        <span className="font-medium text-xl sm:text-2xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white">
          You Design! <br /> We Code!
        </span>
      </h2>
      <button onClick={handleGetStartedClick} className='bg-purple-800 text-white rounded-4xl px-5 py-3 mb-2 hover:bg-purple-300 z-30'>
        Get Started
      </button>
      
      <div className="w-full max-w-[40rem] h-40 relative">
        {/* Gradients */}
        <div className="absolute inset-x-[10%] sm:inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-[80%] sm:w-3/4 blur-sm" />
        <div className="absolute inset-x-[10%] sm:inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-[80%] sm:w-3/4" />
        <div className="absolute inset-x-[30%] sm:inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-[40%] sm:w-1/4 blur-sm" />
        <div className="absolute inset-x-[30%] sm:inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-[40%] sm:w-1/4" />

        {/* Core component */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />

        {/* Radial Gradient to prevent sharp edges */}
        <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]" />
      </div>
      
      <ShootingStars className="absolute inset-0" />
      <StarsBackground className="absolute inset-0" />
      
      <p className="text-white text-center text-sm sm:text-base w-full max-w-xl mt-6 px-4">
        Sketch it, dream it, design it—we'll handle the rest. From concept to code, we make sure it just works. Because beauty and functionality should go hand in hand.
      </p>
    </div>
  );
};

export default Home;
