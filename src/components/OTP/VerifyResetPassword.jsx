import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../helper/CustomButton";
import { verifyOtp } from "../../api/api";

const VerifyResetPassword = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await verifyOtp(otp);
      console.log("OTP verification successful");
      navigate("/reset-password");
    } catch (error) {
      console.error("OTP verification failed:", error);
      setError("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-bold text-center">Verify OTP</h2>
        <form onSubmit={handleSubmit} className="space-y-4" method="post">
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
            {error && <p className="mt-2 text-red-500">{error}</p>}
          </div>
          <div className="flex justify-center">
            <CustomButton type="submit" label="Verify OTP" className="w-full" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyResetPassword;
