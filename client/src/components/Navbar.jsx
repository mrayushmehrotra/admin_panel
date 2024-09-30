import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [trueSession, settrueSession] = useState(false);
  useEffect(() => {
    const session = localStorage.getItem("authToken");
    if (session != null || "") {
      settrueSession(true);
      navigate("/");
    }
  }, []);

  const logoutFunc = () => {
    localStorage.clear();
  };

  return (
    <div className="container mx-auto text-xl font-[Arial] font-semibold flex items-center justify-between p-7">
      <h1>
        <Link
          to="/"
          className="hover:bg-slate-300 rounded-xl p-4 transition duration-1000 ease-in-out"
        >
          LOGO
        </Link>
      </h1>
      <div className="flex items-center gap-4">
        <Link to="/create-user">
          <div className="bg-slate-900 p-4 text-white rounded-full transition duration-50 ease-in-out hover:bg-white hover:border-black hover:border hover:text-black flex items-center">
            <button className=" hover:text-black">
              <i class="ri-add-circle-line"></i>
            </button>
          </div>
        </Link>
        <div className="bg-slate-900 p-4 text-white rounded-xl transition duration-50 ease-in-out hover:bg-white hover:border-black hover:border hover:text-black flex items-center">
          <i className="ri-sticky-note-add-line  mr-2 transition duration-50 ease-in-out hover:text-black"></i>
          <Link onClick={() => logoutFunc()} to="/admin-login">
            <button className="transition duration-1000 ease-in-out hover:text-black">
              {trueSession ? "logout" : "login"}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
