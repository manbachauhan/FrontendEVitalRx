import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("token"); 
  console.log("isauthenticated",isAuthenticated)

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoutes;
