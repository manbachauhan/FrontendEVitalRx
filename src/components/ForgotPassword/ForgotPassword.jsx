import React, { useState } from "react";
import CustomButton from "../helper/CustomButton";
import { forgotPassword } from "../../api/api";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // Added to handle message type (success or error)
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setMessageType("");

    try {
      const response = await forgotPassword(email);
      if (response.success) {
        setMessage("A reset link has been sent to your email.");
        setMessageType("success");
        navigate("/verify-otp");
      } else {
        setMessage(response.message);
        setMessageType("error");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center">Forgot Password</h2>
        <p className="px-2 mb-4 text-center text-gray-600 md:px-10">
          Enter your email address to receive a password reset OTP.
        </p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="flex justify-center">
            <CustomButton
              type="submit"
              label={loading ? "Sending..." : "Submit"}
              disabled={loading}
              className="w-full"
            />
          </div>
          {message && (
            <div
              className={`p-4 mb-4 rounded-md ${
                messageType === "success"
                  ? "text-green-800 bg-green-200"
                  : "text-red-800 bg-red-200"
              }`}
            >
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
