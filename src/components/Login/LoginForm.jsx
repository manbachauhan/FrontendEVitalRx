import React, { useState } from "react";
import SignupImg from "../../assets/img/signup.png";
import CustomButton from "../helper/CustomButton";
import { NavLink, useNavigate } from "react-router-dom";
import { login } from "../../api/api";
import LoadingOverlay from "../Loading/LoadingOverlay";


const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errormsg, seterrormsg] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    seterrormsg("");
    setLoading(true);

    try {
      const result = await login(email, password);

      if (result.success) {
        setSuccess("Login successful!");
        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 1000);
      } else {
        seterrormsg(result.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      seterrormsg(
        error.message || "An unexpected error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-8">
      <div className="container mx-auto">
        <div className="flex flex-col items-center max-w-full p-5 mx-auto shadow-2xl mt-28 md:flex-row">
          <div className="w-full mt-4 md:w-1/2 md:mt-0">
            <img src={SignupImg} alt="Login" className="w-full h-auto" />
          </div>

          <div className="w-full mt-4 md:w-1/2 md:mt-0">
            <h2 className="mb-6 text-3xl font-bold text-center md:text-left">
              Login
            </h2>

            {success && (
              <div className="p-4 mb-4 text-green-800 bg-green-200 rounded-md">
                {success}
              </div>
            )}
            {errormsg && (
              <div className="p-4 mb-4 text-red-800 bg-red-200 rounded-md">
                {errormsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col w-full">
                <label className="font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                  className="p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="font-medium">Password</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="flex justify-center">
                <CustomButton type="submit" label="Login" />
              </div>

              <div className="flex justify-center mt-4">
                <NavLink
                  to="/forgot-password"
                  className="text-blue-500 hover:underline"
                >
                  Forgot Password?
                </NavLink>
              </div>

              <div className="flex justify-center mt-2">
                <p>
                  Don't have an account?{" "}
                  <NavLink
                    to="/signup"
                    className="text-blue-500 hover:underline"
                  >
                    Sign Up
                  </NavLink>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      {loading && <LoadingOverlay />}
    </div>
  );
};

export default LoginForm;
