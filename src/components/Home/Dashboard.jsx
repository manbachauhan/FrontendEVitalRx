import React from "react";
import { NavLink } from "react-router-dom";

// Ho
const Dashboard = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 rounded-lg">
        <h1 className="mb-4 text-3xl font-extrabold text-center text-blue-600">
          Welcome to Dashboard
        </h1>
        <p className="mb-6 text-center text-gray-700 text-md">
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

export default Dashboard;
