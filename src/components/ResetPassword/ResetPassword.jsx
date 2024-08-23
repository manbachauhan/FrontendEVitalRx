import React, { useState } from "react";
import CustomButton from "../helper/CustomButton";
import { resetPassword } from "../../api/api"; // Import the resetPassword function
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  // const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // const handleEmailChange = (e) => setEmail(e.target.value);
  const handleNewPasswordChange = (e) => setNewPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await resetPassword({ newPassword });
      setMessage(response.message);
      if (response.success) {
        navigate("/login"); // Redirect to login page after successful password reset
      }
      setLoading(false);
    } catch (error) {
      setMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-sm">
        <h2 className="mb-6 text-2xl font-bold text-center">Reset Password</h2>
        <form className="space-y-4" onSubmit={handleSubmit} method="post">
          {/* OTP */}
          <div className="flex flex-col">
            {/* <label className="font-medium">Email</label>
            <input
              type="text"
              value={email}
              // onChange={handleOtpChange}
              className="p-2 border border-gray-300 rounded-md"
              // placeholder="Enter OTP"
              // required
              disabled
            /> */}
          </div>

          {/* New Password */}
          <div className="flex flex-col">
            <label className="font-medium">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={handleNewPasswordChange}
              className="p-2 border border-gray-300 rounded-md"
              placeholder="Enter new password"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col">
            <label className="font-medium">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="p-2 border border-gray-300 rounded-md"
              placeholder="Confirm new password"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <CustomButton
              type="submit"
              label={loading ? "Resetting..." : "Reset Password"}
              disabled={loading}
            />
          </div>

          {/* Message */}
          {message && (
            <p
              className={`text-center ${
                message.includes("success") ? "text-green-500" : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
