const Loader = () => {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
        <span className="ml-4 text-blue-500 font-medium">Loading...</span>
      </div>
    );
  };
  
export default Loader;
  