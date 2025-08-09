import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import errorAnimation from '../../assets/error.json'; // Adjust path

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center p-4">
      <Player
        autoplay
        loop
        src={errorAnimation}
        style={{ height: '300px', width: '300px' }}
      />
      <h1 className="text-4xl font-bold text-red-600 mt-6">Oops! Page Not Found</h1>
      <p className="mt-2 text-gray-500">The page you're looking for doesn't exist or was moved.</p>
      <a
        href="/"
        className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
      >
        Go Back Home
      </a>
    </div>
  );
};

export default ErrorPage;
