import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const UpdateEmployee = () => {
  const { id } = useParams(); // Get ID from URL
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm(); // Use reset to populate fields with data
  const [uploading, setUploading] = useState(false);
  const [imageURL, setImageURL] = useState("");

  // Fetch the user details by ID on component mount
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/user/${id}`)
      .then((response) => {
        const employeeData = response.data;
        // Pre-populate the form fields with fetched data
        reset({
          f_Name: employeeData.f_Name,
          f_Email: employeeData.f_Email,
          f_Mobile: employeeData.f_Mobile,
          f_Designation: employeeData.f_Designation,
          f_gender: employeeData.f_gender,
          f_Course: employeeData.f_Course,
          f_isAdmin: employeeData.f_isAdmin ? "true" : "false", // Convert boolean to string
        });
        setImageURL(employeeData.f_Image); // If there's an image, set it
      })
      .catch((error) => {
        console.error("Failed to fetch employee data:", error);
        toast.error("Failed to fetch employee data");
      });
  }, [id, reset]);

  // Handle Image Upload
  const uploadImage = (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "admin-panel");
    data.append("cloud_name", "dwvlyul7c");

    setUploading(true);

    fetch("https://api.cloudinary.com/v1_1/dwvlyul7c/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setImageURL(data.url);
        setUploading(false);
      })
      .catch((err) => {
        console.error(err);
        setUploading(false);
      });
  };

  // Handle form submission
  const handleEmployeeSubmit = (data) => {
    if (imageURL) {
      data.f_Image = imageURL; // Use the Base64 string or URL
    }

    // Convert f_isAdmin to boolean
    data.f_isAdmin = data.f_isAdmin === "true"; // Convert string to boolean

    axios
      .put(`http://localhost:3000/api/v1/user/${id}`, data) // Send PUT request to update the employee
      .then((response) => {
        toast.success(response.data.message, {
          icon: "🎉",
          duration: 3000,
        });
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to update employee");
      });
  };

  return (
    <div className="container mx-auto font-mono mt-8">
      <Toaster />
      <div>
        <form
          onSubmit={handleSubmit(handleEmployeeSubmit)}
          className="flex bg-gray-100 text-black w-full min-h-[60vh] justify-around border border-gray-400 rounded-xl p-7 flex-col gap-y-4"
        >
          <h1 className="text-center text-2xl font-semibold">
            Update Employee
          </h1>

          {/* Name */}
          <input
            {...register("f_Name")}
            className="rounded-xl p-3 text-black w-full"
            type="text"
            placeholder="Name"
          />

          {/* Email */}
          <input
            {...register("f_Email")}
            className="rounded-xl p-3 text-black w-full"
            type="email"
            placeholder="Email"
          />

          {/* Mobile Number */}
          <input
            {...register("f_Mobile")}
            className="rounded-xl p-3 text-black w-full"
            type="text"
            placeholder="Mobile No"
          />

          {/* Designation */}
          <input
            {...register("f_Designation")}
            className="rounded-xl p-3 text-black w-full"
            type="text"
            placeholder="Designation"
          />

          {/* Gender */}
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                {...register("f_gender")}
                type="radio"
                value="M"
                className="form-radio"
              />
              Male
            </label>
            <label className="flex items-center gap-2">
              <input
                {...register("f_gender")}
                type="radio"
                value="F"
                className="form-radio"
              />
              Female
            </label>
          </div>

          {/* Is Admin */}
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                {...register("f_isAdmin")}
                type="radio"
                value="false"
                className="form-radio"
              />
              Normal
            </label>
            <label className="flex items-center gap-2">
              <input
                {...register("f_isAdmin")}
                type="radio"
                value="true"
                className="form-radio"
              />
              Admin
            </label>
          </div>

          {/* Course */}
          <input
            {...register("f_Course")}
            className="rounded-xl p-3 text-black w-full"
            type="text"
            placeholder="Course"
          />

          {/* Image Upload */}
          <input
            type="file"
            onChange={(e) => uploadImage(e.target.files[0])}
            className="rounded-xl p-3 text-black w-full"
          />
          {uploading && <p className="text-center">Uploading...</p>}
          {imageURL && (
            <p className="text-center text-green-600">
              Image uploaded successfully!
            </p>
          )}

          {/* Submit Button */}
          <button
            className="bg-green-500 font-semibold text-2xl p-4 text-white rounded-xl hover:bg-green-700"
            type="submit"
            disabled={uploading}
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateEmployee;
