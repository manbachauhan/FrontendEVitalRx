import React from "react";

const Home = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 rounded-lg">
        <h1 className="mb-4 text-4xl font-extrabold text-center text-blue-600">
          Welcome to Home
        </h1>
        <p className="mb-6 text-lg text-center text-gray-700">
          Explore the world of possibilities with our application. Discover new
          features, manage your account, and more.
        </p>
        <div className="flex justify-center">
          <NavLink
            to="/"
            className="px-6 py-3 text-white transition duration-300 bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700"
          >
            Get Started
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Home;
