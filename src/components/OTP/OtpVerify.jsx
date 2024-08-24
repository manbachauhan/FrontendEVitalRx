// src/pages/OtpVerify.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../helper/CustomButton";
import { verifyEmail } from "../../api/api"; // Import the verifyEmail function

const OtpVerify = () => {
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await verifyEmail(otp); // Use verifyEmail function from api
      console.log("OTP verification successful");
      setSuccessMessage("OTP verified successfully!"); 
      setErrorMessage(""); 
      navigate("/"); 
      window.location.reload();
    } catch (error) {
      console.error("OTP verification failed:", error);
      setSuccessMessage(""); 
      setErrorMessage("Invalid OTP. Please try again."); 
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-bold text-center">Verify OTP</h2>
        {successMessage && (
          <div className="p-4 mb-4 text-green-800 bg-green-200 rounded-md">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="p-4 mb-4 text-red-800 bg-red-200 rounded-md">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">Enter OTP</label>
            <input
              type="text"
              value={otp}
              onChange={handleOtpChange}
              className="p-2 border border-gray-300 rounded-md"
              placeholder="Enter OTP"
              maxLength="6" 
            />
          </div>
          <div className="flex justify-center">
            <CustomButton type="submit" label="Verify OTP" className="w-full" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default OtpVerify;
