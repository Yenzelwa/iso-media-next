// NotFoundPage.tsx
import React from "react";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 text-red-600">404</h1>
        <h3 className="text-2xl font-semibold mb-2">Page not found!</h3>
        <p className="text-gray-400 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/">
          <span className="inline-block bg-red-700 hover:bg-red-600 text-white px-6 py-3 rounded-md transition duration-300">
            Go back home
          </span>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
