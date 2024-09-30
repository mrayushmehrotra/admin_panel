import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Card = ({
  name,
  email,
  mobile,
  designation,
  course,
  gender,
  image,
  id,
  isAdmin,
  createdDate,
}) => {
  const navigate = useNavigate();

  // Handle update logic
  const handleUpdate = async (e) => {
    navigate(`/update/${e}`);
  };

  // Handle delete logic
  const handleDelete = async (e) => {
    console.log(e);
    try {
      await axios.delete(`http://localhost:3000/api/v1/user/${e}`);
      window.location.reload();
      toast.success("User Deleted", { icon: "🗑️" });
      // Trigger any parent state update to remove this card from UI
    } catch (error) {
      window.location.reload();
      console.error("Failed to delete user:", error);
      toast.error("Failed to delete user");
    }
  };

  return (
    // Table structure when not editing
    <tr className="hover:bg-gray-100 cursor-pointer">
      <td className="py-4 px-9 border-b border-gray-200">{name}</td>
      <td className="py-4 px-9 border-b border-gray-200">{email}</td>
      <td className="py-4 px-9 border-b border-gray-200">{mobile}</td>
      <td className="py-4 px-9 border-b border-gray-200">{designation}</td>
      <td className="py-4 px-9 border-b border-gray-200">{course}</td>
      <td className="py-4 px-9 border-b border-gray-200">{gender}</td>
      <td className="py-4 px-9 border-b border-gray-200">
        <img src={image} alt={name} className="w-10 h-10 rounded-full" />
      </td>
      <td className="py-4 px-9 border-b border-gray-200">
        {isAdmin ? "Yes" : "No"}
      </td>
      <td className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleUpdate(id)}
            className="bg-slate-900 p-4 text-white rounded-full hover:bg-white hover:text-black transition"
          >
            <i className="ri-pencil-line"></i>
          </button>
          <button
            onClick={() => handleDelete(id)}
            className="bg-slate-900 p-4 text-white rounded-full hover:bg-white hover:text-black transition"
          >
            <i className="ri-delete-bin-line"></i>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default Card;
