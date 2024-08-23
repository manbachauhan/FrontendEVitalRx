import React from "react";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-gray-800">404</h1>
        <p className="mb-8 text-xl text-gray-600">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link to="/">
          <button className="px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700">
            Go Back Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Page404;
