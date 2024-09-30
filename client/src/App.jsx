import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import CreateUser from "./components/CreateUser";
import NotFound from "./components/NotFound"; // Import NotFound component
import LoginAdmin from "./components/LoginAdmin";
import UpdateEmployee from "./components/UpdateCard";
const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/admin-login" element={<LoginAdmin />} />
        <Route path="/update/:id" element={<UpdateEmployee />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
