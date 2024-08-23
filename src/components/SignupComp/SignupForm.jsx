import axios from "axios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import SignupImg from "../../assets/img/signup.png";
import CustomButton from "../helper/CustomButton";
import { signup } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Yup schema for validation
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  phone: yup.string().required("Phone number is required"),
  dob: yup.date().required("Date of Birth is required"),
  gender: yup.string().required("Gender is required"),
  address: yup.string().required("Address is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const SignupForm = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log("data", data);
    try {
      const result = await signup(data); 
      console.log("Signup successful:", result);
      setSuccessMessage("You have successfully signed up!"); 
      setErrorMessage(""); 
      navigate("/verifyemail"); 
      reset(); 
    } catch (error) {
      setSuccessMessage(""); 
      if (
        error.response &&
        error.response.data.message === "User already exists"
      ) {
        setErrorMessage("User already exists. Please log in."); 
        navigate("/login"); 
      } else {
        setErrorMessage("Signup failed: Please try again."); 
      }
      console.error("Signup failed:", error.message);
    }
  };

  return (
    <div className="py-8">
      <div className="container mx-auto">
        <div className="flex flex-col items-center p-5 mt-20 shadow-2xl md:flex-row">
          <div className="w-full mt-4 md:w-1/2 md:mt-0">
            <img src={SignupImg} alt="signup" className="w-full h-auto" />
          </div>
          <div className="w-full mt-4 md:w-1/2 md:mt-0">
            <h2 className="mb-6 text-3xl font-bold text-center md:text-left">
              Explore the World
            </h2>
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
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4"
              method="post"
            >
              <div className="flex flex-col lg:flex-row lg:space-x-4">
                <div className="flex flex-col w-full">
                  <label className="font-medium">Name</label>
                  <input
                    type="text"
                    {...register("name")}
                    className="p-2 border border-gray-300 rounded-md"
                  />
                  <p className="text-red-500">{errors.name?.message}</p>
                </div>
                <div className="flex flex-col w-full">
                  <label className="font-medium">Phone</label>
                  <input
                    type="text"
                    {...register("phone")}
                    className="p-2 border border-gray-300 rounded-md"
                  />
                  <p className="text-red-500">{errors.phone?.message}</p>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row lg:space-x-4">
                <div className="flex flex-col w-full">
                  <label className="font-medium">Date of Birth</label>
                  <input
                    type="date"
                    {...register("dob")}
                    className="p-2 border border-gray-300 rounded-md"
                  />
                  <p className="text-red-500">{errors.dob?.message}</p>
                </div>
                <div className="flex flex-col w-full">
                  <label className="font-medium">Gender</label>
                  <select
                    {...register("gender")}
                    className="p-2 border border-gray-300 rounded-md"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  <p className="text-red-500">{errors.gender?.message}</p>
                </div>
              </div>
              <div className="flex flex-col w-full">
                <label className="font-medium">Address</label>
                <textarea
                  {...register("address")}
                  className="p-2 border border-gray-300 rounded-md"
                  rows="3"
                ></textarea>
                <p className="text-red-500">{errors.address?.message}</p>
              </div>
              <div className="flex flex-col lg:flex-row lg:space-x-4">
                <div className="flex flex-col w-full">
                  <label className="font-medium">Email</label>
                  <input
                    type="email"
                    {...register("email")}
                    className="p-2 border border-gray-300 rounded-md"
                  />
                  <p className="text-red-500">{errors.email?.message}</p>
                </div>
                <div className="flex flex-col w-full">
                  <label className="font-medium">Password</label>
                  <input
                    type="password"
                    {...register("password")}
                    className="p-2 border border-gray-300 rounded-md"
                  />
                  <p className="text-red-500">{errors.password?.message}</p>
                </div>
              </div>
              <div className="flex justify-center">
                <CustomButton type="submit" label="Signup" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
