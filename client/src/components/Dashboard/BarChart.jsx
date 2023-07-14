import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

const BarChart = ({ students, studentInfo }) => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  console.log(studentInfo);

  const passed = studentInfo.filter((student) => student.results).length;
  const failed = studentInfo.length - passed;

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
  return (
    <div className="flex flex-row">
      <div className="flex flex-col justify-center items-center my-2 p-2 bg-bg rounded-lg shadow-black shadow-lg">
        <h2 className="text-white/70 text-xl font-bold text-center tracking-wide my-2">
          Student Results{" "}
          <select
            placeholder="Select Students"
            className="text-md m-2 rounded-md bg-bg/70 text-white/50 p-1 shadow-md shadow-black focus:ring-1 focus:ring-accent text-lg tracking-wider ml-2 cursor-pointer transition-all duration-300 ease-in-out"
          >
            <option value="All">All</option>
            <option value="Assigned">Assigned</option>
          </select>
        </h2>
        <div className="h-full">
          <Pie data={data} />
        </div>
      </div>
    </div>
  );
};

export default BarChart;
