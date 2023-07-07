import React from "react";
import Navbar from "./Nav-Footer/Navbar.jsx";
import Dashboard from "./Dashboard/Dashboard.jsx";
import Footer from "./Nav-Footer/Footer.jsx";
import { Routes, Route } from "react-router-dom";
import Interview from "./Interview/interview.jsx";

const App = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-[2560px] mx-auto overflow-auto">
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/interview" element={<Interview />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
