import React from 'react';

const LoadingPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 dark:bg-gray-900">
      <div className="text-center">
        {/* DaisyUI loading spinner */}
        <span className="loading loading-spinner loading-lg text-primary dark:text-blue-400"></span>
        
        {/* Optional loading text */}
        <h2 className="mt-4 text-xl font-semibold text-base-content dark:text-gray-100">Loading Service Details...</h2>
        
        {/* Optional progress bar (alternative to spinner) */}
        {/* <progress className="progress progress-primary w-56 mt-4"></progress> */}
        
        {/* You can add more decorative elements */}
        <div className="mt-6 flex justify-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-3 h-3 rounded-full bg-secondary animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-3 h-3 rounded-full bg-accent animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;