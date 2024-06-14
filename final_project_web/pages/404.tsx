// pages/404.tsx
import React from 'react';
import Link from 'next/link';

const Custom404 = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-100 to-blue-300">
      <div className="text-center p-10 bg-white rounded-xl shadow-lg">
        <h1 className="text-6xl font-bold text-blue-500">404</h1>
        <h2 className="text-4xl font-bold mt-4">Page Not Found</h2>
        <p className="mt-4 text-gray-600">Oops! The page you are looking for does not exist.</p>
        <Link href="/">
          <a className="mt-6 inline-block bg-blue-500 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-blue-600 transition duration-300">
            Go back to Home
          </a>
        </Link>
        <div className="mt-10">
          <img
            src="/assets/cartoon-error-404-concept-illustration.png"
            alt="404 Error Image"
            className="mx-auto w-64 h-64 object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Custom404;
