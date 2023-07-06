import React from "react";
import Welcome from "./Welcome";
import StudentInfo from "./StudentInfo";

const Dashboard = () => {
  return (
    <div className="flex flex-col md:flex-row w-full mx-auto justify-between">
      <Welcome />
      <StudentInfo />
    </div>
  );
};

export default Dashboard;
