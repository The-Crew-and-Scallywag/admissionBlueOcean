import React, { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

const PieChart = ({ studentInfo, filteredStudents }) => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const [selected, setSelected] = useState("All");
  const [breakdown, setBreakdown] = useState("All");

  const handleSelect = (e) => {
    setSelected(e.target.value);
  };

  const handleBreakdown = (e) => {
    setBreakdown(e.target.value);
  };

  const passed =
    selected === "All"
      ? studentInfo.filter((student) => student.results).length
      : filteredStudents.filter((student) => student.results).length;

  const total =
    selected === "All" ? studentInfo.length : filteredStudents.length;
  const failed = total - passed;

  const data = {
    labels: ["Passed", "Failed"],
    datasets: [
      {
        data: [passed, failed],
        backgroundColor: ["#36A2EB", "#FF6384"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384"],
        borderColor: ["#0A0B0B", "#0A0B0B"],
        color: "#666",
      },
    ],
  };

  const studentBreakdown = breakdown === "All" ? studentInfo : filteredStudents;

  return (
    <div className="flex flex-col custom:flex-row w-full">
      <div className="flex flex-col justify-center items-center my-2 p-2 bg-bg rounded-lg shadow-black shadow-lg">
        <h2 className="text-white/70 text-xl font-bold text-center tracking-wide my-2">
          Student Results:{" "}
          <select
            placeholder="Select Students"
            className="text-md m-2 rounded-md bg-bg/70 text-white/50 p-1 shadow-md shadow-black focus:ring-1 focus:ring-accent text-lg tracking-wider ml-2 cursor-pointer transition-all duration-300 ease-in-out"
            value={selected}
            onChange={handleSelect}
          >
            <option value="All">All</option>
            <option value="Assigned">Assigned</option>
          </select>
        </h2>
        <div className="h-full">
          <Pie data={data} />
        </div>
      </div>
      <div className="custom:ml-2 my-2 bg-bg rounded-md shadow-black shadow-lg w-full">
        <h2 className="text-white/70 text-xl font-bold text-center tracking-wide my-2">
          Breakdown:
          <select
            placeholder="Select Students"
            className="text-md m-2 rounded-md bg-bg/70 text-white/50 p-1 shadow-md shadow-black focus:ring-1 focus:ring-accent text-lg tracking-wider ml-2 cursor-pointer transition-all duration-300 ease-in-out"
            value={breakdown}
            onChange={handleBreakdown}
          >
            <option value="All">All</option>
            <option value="Assigned">Assigned</option>
          </select>
        </h2>
        <ul className="grid grid-cols-2 p-2 items-center">
          <li className="text-white/70 text-2xl font-bold p-2">
            Total Students:{" "}
            <label className="text-accent text-md">
              {
                studentBreakdown.reduce((acc, student) => {
                  if (!acc.includes(student.s_first_name)) {
                    acc.push(student.s_first_name);
                  }
                  return acc;
                }, []).length
              }
            </label>
          </li>
          <li className="text-white/70 text-2xl font-bold p-2">
            Total Interviews:{" "}
            <label className="text-accent text-md">
              {studentBreakdown.length}
            </label>
          </li>
          <li className="text-white/70 text-2xl font-bold p-2">
            Passed:{" "}
            <label className="text-accent text-md">
              {studentBreakdown.filter((student) => student.results).length}
            </label>
          </li>
          <li className="text-white/70 text-2xl font-bold p-2">
            Failed:{" "}
            <label className="text-red-400 text-md">
              {studentBreakdown.filter((student) => !student.results).length}
            </label>
          </li>
          <li className="text-white/70 text-2xl font-bold p-2">
            Pass Rate:{" "}
            <label className="text-accent text-md">
              {Math.round(
                (studentBreakdown.filter((student) => student.results).length /
                  studentBreakdown.length) *
                  100
              )}
              %
            </label>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PieChart;
