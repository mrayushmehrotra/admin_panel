import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";

const CreateEmployee = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [uploading, setUploading] = useState(false);
  const [imageURL, setImageURL] = useState("");

  // Handle Image Upload
  const uploadImage = (file) => {
    const data = new FormData();
    data.append("file", file); // Using the file passed to the function
    data.append("upload_preset", "admin-panel");
    data.append("cloud_name", "dwvlyul7c");

    setUploading(true); // Set uploading state to true

    fetch("https://api.cloudinary.com/v1_1/dwvlyul7c/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setImageURL(data.url); // Corrected to use setImageURL
        setUploading(false); // Set uploading state to false
      })
      .catch((err) => {
        console.error(err);
        setUploading(false); // Ensure uploading is set to false on error
      });
  };

  // Handle form submission
  const handleEmployeeSubmit = (data) => {
    if (imageURL) {
      data.f_Image = imageURL; // Use f_Image to match the backend
    }

    // Convert f_isAdmin to boolean
    data.f_isAdmin = data.f_isAdmin === "true"; // Convert string to boolean

    // Add f_sno using UUID
    data.f_sno = uuid();

    console.log(data);
    axios
      .post("http://localhost:3000/api/v1/create-user", data)
      .then((response) => {
        console.log(response);
        toast.success(response.data.message, {
          icon: "🎉",
          duration: 3000,
        });
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
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
            Create Employee
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
                value="Male"
                className="form-radio"
              />
              Male
            </label>
            <label className="flex items-center gap-2">
              <input
                {...register("f_gender")}
                type="radio"
                value="Female"
                className="form-radio"
              />
              Female
            </label>
          </div>
          {/* check is admin  */}
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

          {/* Password */}
          <input
            {...register("f_Pwd")}
            className="rounded-xl p-3 text-black w-full"
            type="password"
            placeholder="Password"
          />

          {/* Image Upload */}
          <div className="">
            <input
              {...register("f_Image")}
              className="rounded-xl p-3 text-black w-full hidden"
              type="text"
              value={imageURL}
              placeholder="Image URL"
              readOnly
            />
          </div>

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
            disabled={uploading} // Disable while the image is uploading
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEmployee;
