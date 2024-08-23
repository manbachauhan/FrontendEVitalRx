import React, { useEffect, useState, useRef } from "react";
import CustomButton from "../helper/CustomButton";
import { isLoggedIn, getCurrentUser } from "../../api/api"; // Adjust import paths as needed
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    console.log("Checking login status...");
    if (isLoggedIn()) {
      const currentUser = getCurrentUser();
      console.log("Logged in user:", currentUser);
      setUser(currentUser);
    } else {
      console.log("User not logged in");
      setUser(null);
    }
  }, []);

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <header className="fixed z-10 w-full bg-white shadow-md">
      <div className="container px-4 mx-auto">
        <nav className="flex items-center justify-between py-4">
          <div className="text-lg font-semibold">MyWebApp</div>
          <div className="flex items-center">
            {user ? (
              <div className="relative flex items-center ml-4 space-x-4">
                <span
                  className="px-4 py-1 text-lg font-medium border-2 rounded-lg cursor-pointer"
                  onClick={toggleDropdown}
                >
                  <i className="fa-solid fa-user"></i> &nbsp; {user.name} &nbsp;
                  <i className="fa-solid fa-caret-down"></i>
                </span>
                {dropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 w-48 bg-white border border-gray-200 rounded-lg shadow-lg mt-7 top-2 left-1"
                  >
                    <button
                      onClick={() => navigate("/")}
                      className="block w-full px-6 py-2 text-left text-gray-700 hover:bg-gray-100"
                    >
                      <i className="fa-solid fa-house"></i> &nbsp; Home
                    </button>
                    <button
                      onClick={() => navigate("/get-profile")}
                      className="block w-full px-6 py-2 text-left text-gray-700 hover:bg-gray-100"
                    >
                      <i className="fa-solid fa-user"></i> &nbsp; Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full px-6 py-2 text-left text-gray-700 hover:bg-gray-100"
                    >
                      <i className="fa-solid fa-arrow-right-from-bracket"></i>{" "}
                      &nbsp; Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex ml-4 space-x-4">
                <CustomButton
                  type="button"
                  label="Login"
                  className="rounded-full"
                  onClick={() => navigate("/login")}
                />
                <CustomButton
                  type="button"
                  label="Signup"
                  className="rounded-full"
                  onClick={() => navigate("/signup")}
                />
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
