import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = ({ students, studentInfo }) => {
  // Calculate pass and fail rates for each month of the year
  const passRates = [];
  const failRates = [];
  for (let month = 0; month < 12; month++) {
    const studentsInMonth = studentInfo.filter((student) => {
      const studentMonth = new Date(student.interview_date).getMonth();
      return studentMonth === month;
    });
    const passedInMonth = studentsInMonth.filter(
      (student) => student.results
    ).length;
    const failedInMonth = studentsInMonth.length - passedInMonth;
    const passRate =
      studentsInMonth.length > 0
        ? (passedInMonth / studentsInMonth.length) * 100
        : 0;
    const failRate =
      studentsInMonth.length > 0
        ? (failedInMonth / studentsInMonth.length) * 100
        : 0;
    passRates.push(passRate.toFixed(2));
    failRates.push(failRate.toFixed(2));
  }

  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Pass Rate",
        data: passRates,
        backgroundColor: "#36A2EB",
        hoverBackgroundColor: "#36A2EB",
      },
      {
        label: "Fail Rate",
        data: failRates,
        backgroundColor: "#FF6384",
        hoverBackgroundColor: "#FF6384",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: "Rate (%)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Month",
        },
      },
    },
  };

  return (
    <div className="custom:h-[400px] bg-bg rounded-lg shadow-lg shadow-black">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
