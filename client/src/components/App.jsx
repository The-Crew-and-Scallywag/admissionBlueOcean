import React, { useContext, useEffect } from "react";
import Navbar from "./Nav-Footer/Navbar.jsx";
import Dashboard from "./Dashboard/Dashboard.jsx";
import Footer from "./Nav-Footer/Footer.jsx";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Login from "./Login/Login.jsx";
import Interview from "./Interview/Interview.jsx";
import InterviewSelector from "./Interview/InterviewSelector.jsx";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token && location.pathname !== "/interview/:id") {
      navigate("/login");
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen min-w-screen relative">
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/interview" element={<InterviewSelector />} />
          <Route exact path="/interview/:id" element={<Interview />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
