import axios from "axios";

// Set up the base URL for Axios
const api = axios.create({
  baseURL: "https://evitalrx-backend-d62z.onrender.com/api/auth",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// Function to make the signup API call
export const signup = async (userData) => {
  try {
    const response = await api.post("/signup", userData);

    const { token, user } = response.data; 

    // Store token and user data in localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      throw new Error("User already exists");
    } else {
      throw error.response ? error.response.data : error.message;
    }
  }
};


// Function to make the login API call
export const login = async (email ,password) => {
 
  try {
   
    const response = await api.post(
      "/login",
     { email,
      password}
    );
  
   const{token ,user}=response.data
   localStorage.setItem("token", token);
   localStorage.setItem("user", JSON.stringify(user));
  
    return response.data;
  } catch (error) {
    console.log(error)
    throw new Error(
      error.response?.data?.message || "An unexpected error occurred."
    );
  }
};
// Function to verify Email through OTP
export const verifyEmail = async (token) => {
  try {
    const response = await api.post("/verify-email", { token });
    console.log("r",response.data)
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Function to check if a user is logged in
export const isLoggedIn = () => {
  const token = localStorage.getItem("token");
  console.log("toke",token)
  return !!token; // Returns true if the token exists
};

// Function to get the current user
export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// forgot the password 

export const forgotPassword = async (email) => {
 
  try {

    const response = await api.post("/forgot-password", { email });
    console.log("res",response.data)
    return response.data;
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data.message
      : error.message;
    throw new Error(errorMessage);
  }
};
// verify otp
export const verifyOtp = async (otp) => {
  
  try {

    const response = await api.post("/verify-otp", { otp });
    console.log("res", response);
    return response.data;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw error.response?.data || error.message;
  }
};
// reset -password api 

export const resetPassword = async ({ newPassword }) => {
  try {
    const response = await api.post("/reset-password", {  newPassword });
    return response.data;
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data.message
      : error.message;
    throw new Error(errorMessage);
  }
};


// get Profile function

export const getProfile = async () => {
  try {
    const response = await api.get("/get-profile");
    console.log("reso",response) // Adjust the URL as needed
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch profile");
  }
};

// update profile function

export const updateProfile = async (profileData) => {
  try {
    const response = await api.put("/update-profile", profileData); // Adjust the URL as needed
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update profile"
    );
  }
};