// BlogDetail.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
const BlogDetail = () => {
  const { id } = useParams(); // Get blog ID from URL
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/post/${id}`
        );
        setBlog(response.data);
        setTitle(response.data.title);
        setDescription(response.data.description);
      } catch (error) {
        console.error("Error fetching blog details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/v1/post/${id}`,
        {
          title,
          description,
        }
      );
      toast.success("Updated Post", { icon: "✍️" });
      console.log("Blog updated:", response.data);
      setBlog(response.data);
    } catch (error) {
      console.error("Failed to update blog:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/post/${id}`);
      console.log("Blog deleted.");

      navigate("/"); // Redirect to home page after deletion
      toast.success("Blog Deleted", {
        icon: "🗑️",
      });
    } catch (error) {
      console.error("Failed to delete blog:", error);
    }
  };

  if (loading) return <p className="text-center font-semibold">Loading...</p>;
  if (!blog)
    return <p className="text-center font-semibold">404, Blog not found.</p>;

  return (
    <div className="container gap-6 mx-auto p-5 relative  ">
      <Toaster />
      <div
        onClick={() => navigate("/")}
        className="bg-black p-4 w-fit rounded-full mb-6  "
      >
        <i class="ri-arrow-left-line text-white text-4xl  "></i>
      </div>
      <h1 className="text-4xl font-bold mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-stone-400 rounded-lg p-2 w-full"
        />
      </h1>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border border-stone-400  rounded-lg p-2 w-full h-48"
      />
      <div className="mt-4 flex gap-4">
        <button
          onClick={handleUpdate}
          className="bg-blue-500 text-white p-4 font-semibold rounded-lg hover:bg-blue-600"
        >
          Update
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white p-4 rounded-lg font-semibold hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default BlogDetail;
