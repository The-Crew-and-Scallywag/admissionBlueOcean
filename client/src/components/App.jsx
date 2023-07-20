import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Nav-Footer/Navbar.jsx";
import Dashboard from "./Dashboard/Dashboard.jsx";
import Footer from "./Nav-Footer/Footer.jsx";
import axios from "axios";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  useParams,
} from "react-router-dom";
import Login from "./Login/Login.jsx";
import Interview from "./Interview/Interview.jsx";
import InterviewSelector from "./Interview/InterviewSelector.jsx";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const [interviewId, setInterviewId] = useState(null);

  const getInterviewId = (number) => {
    setInterviewId(number);
  };

  useEffect(() => {
    if (!token && !location.pathname.startsWith("/interview")) {
      navigate("/login");
    }
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen min-w-screen relative">
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/" element={<Dashboard />} />
          <Route
            exact
            path="/interview"
            element={<InterviewSelector getInterviewId={getInterviewId} />}
          />
          <Route
            exact
            path="/interview/:id"
            element={<Interview interviewId={interviewId} />}
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
