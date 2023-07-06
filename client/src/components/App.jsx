import React from "react";
import Navbar from "./Nav-Footer/Navbar.jsx";
import Dashboard from "./Dashboard/Dashboard.jsx";
import { Routes, Route } from "react-router-dom";
import Editor from "./Editor.jsx";

const App = () => {
  return (
    <div className="h-full w-full">
      <Navbar />
      <div className="max-w-[2560px] mx-auto">
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
        </Routes>
        <Editor />
      </div>
    </div>
  );
};

export default App;
