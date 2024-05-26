const Loader = () => {
    return (
      <div className="flex justify-center items-center">
      <div className="w-12 h-6 relative animate-pulse">
      <div className="absolute top-0 left-0 w-3 h-6 bg-lightred  animate-loader-bar delay-150"></div>
      <div className="absolute top-0 left-4 w-3 h-6 bg-orange  animate-loader-bar delay-200"></div>
      <div className="absolute top-0 left-8 w-3 h-6 bg-yellow  animate-loader-bar delay-250"></div>
      <div className="absolute top-0 left-12 w-3 h-6 bg-green  animate-loader-bar delay-300"></div>
    </div>
      </div>

    );
  };
  
  export default Loader;
  