import React from "react";
import Navbar from "./Nav-Footer/Navbar.jsx";
import Dashboard from "./Dashboard/Dashboard.jsx";
import Footer from "./Nav-Footer/Footer.jsx";
import { Routes, Route } from "react-router-dom";
import Login from "./Login/Login.jsx";
import Interview from "./Interview/Interview.jsx";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen min-w-screen relative">
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/Interview" element={<Interview />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
