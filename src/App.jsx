import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage";
import OtpVerify from "./components/OTP/OtpVerify";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from './pages/ResetPasswordPage'
import VerifyResetPassword from "./components/OTP/VerifyResetPassword";
import ProfilePage from "./pages/ProfilePage";
import Dashboard from './components/Home/Dashboard'
import Page404 from "./pages/Page404";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={
             <ProtectedRoutes>
             <Dashboard/>
            </ProtectedRoutes>
          }/>
          <Route path="/verifyemail" element={<OtpVerify />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/verify-otp" element={<VerifyResetPassword />} />
          <Route path="/reset-password" element={
            <ResetPasswordPage />} />
          <Route path="/get-profile" element={
            <ProtectedRoutes>
            <ProfilePage />
            </ProtectedRoutes>
            } />
          <Route path="/update-profile" element={
             <ProtectedRoutes>
            <ProfilePage />
            </ProtectedRoutes>
            
            } />
            <Route path="*" element={<Page404/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
