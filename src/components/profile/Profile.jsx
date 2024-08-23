import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomButton from "../helper/CustomButton";
import { getProfile, updateProfile } from "../../api/api";
import { useNavigate } from "react-router-dom";

// Yup schema for validation
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  phone: yup.string().required("Phone number is required"),
  dob: yup.date().required("Date of Birth is required"),
  gender: yup.string().required("Gender is required"),
  address: yup.string().required("Address is required"),
});

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProfile();
          console.log(data.user);
        setProfileData(data.user);
        // Populate form with existing data
        reset({
          name: data.user.name,
          phone: data.user.phone,
          dob: data.user.dob.split("T")[0], // format date to yyyy-mm-dd
          gender: data.user.gender,
          address: data.user.address,
          email: data.user.email,
        });
      } catch (error) {
        console.error("Failed to fetch profile:", error.message);
      }
    };

    fetchData();
  }, [reset]);

  const onSubmit = async (data) => {
    try {
      await updateProfile(data); 
      setSuccessMessage("Profile updated successfully!");
      setErrorMessage("");
      navigate("/get-profile");
    } catch (error) {
         setSuccessMessage(""); 
         setErrorMessage("Failed to update profile. Please try again.");
      console.error("Update failed:", error.message);
    }
  };

  return (
    <div className="py-8">
      <div className="container mx-auto">
        <div className="flex items-center p-5 mt-20 shadow-2xl md:flex-row">
          <div className="w-full mt-4 md:w-full md:mt-0">
            <h2 className="mb-6 text-3xl font-bold text-center md:text-left">
              Edit Your Profile
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
                    readOnly
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <CustomButton type="submit" label="Update Profile" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
