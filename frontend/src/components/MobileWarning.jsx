const MobileWarning = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-purple-700 via-pink-600 to-red-500 p-4">
      <div className="bg-black bg-opacity-70 backdrop-blur-lg rounded-xl border border-white border-opacity-20 shadow-2xl p-8 max-w-lg mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-white mb-4 tracking-tight">
          Desktop View Recommended
        </h2>
        <p className="text-lg text-white mb-3 leading-relaxed">
          This site is optimized for desktop viewing. Some features may not work correctly on mobile
          devices.
        </p>
        <p className="text-lg text-white font-medium">
          For the best experience, please visit us on a desktop or laptop computer.
        </p>
      </div>
    </div>
  );
};

export default MobileWarning;
