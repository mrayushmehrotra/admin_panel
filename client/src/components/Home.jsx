import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import { Toaster } from "react-hot-toast";
const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/all-users"
        );
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p className="text-center font-semibold">Loading...</p>;

  return (
    <>
      <Toaster />
      <div className="container mx-auto p-5">
        <div className="flex flex-col gap-4 mt-5">
          {data && data.length > 0 ? (
            data.map((user) => (
              <Card
                key={user._id}
                id={user._id}
                name={user.f_Name}
                email={user.f_Email}
                mobile={user.f_Mobile}
                designation={user.f_Designation}
                course={user.f_Course}
                gender={user.f_gender}
                image={user.f_Image}
                isAdmin={user.f_isAdmin}
                createdDate={user.f_Createdate}
              />
            ))
          ) : (
            <div className="flex justify-center items-center ">
              <p>No users found.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
