import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const LineGraph = ({ students, studentInfo, filteredStudents }) => {
  // Arrays to store data for the line chart
  const monthlyData = [];
  const passRates = [];
  const failRates = [];

  // Array of month labels
  const monthLabels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Calculate the number of interviews, pass rates, and fail rates for each month
  for (let month = 0; month < 12; month++) {
    const studentsInMonth = studentInfo.filter((student) => {
      const studentMonth = new Date(student.interview_date).getMonth();
      return studentMonth === month;
    });

    const passedInMonth = studentsInMonth.filter(
      (student) => student.results === "true"
    ).length;
    const failedInMonth = studentsInMonth.filter(
      (student) => student.results === "false"
    ).length;

    // Push the number of interviews for the month to the 'monthlyData' array
    monthlyData.push(studentsInMonth.length);

    // Calculate pass and fail rates and push them to 'passRates' and 'failRates' arrays
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

  // Data object for the line chart
  const data = {
    labels: monthLabels,
    datasets: [
      {
        label: "Interviews",
        data: monthlyData,
        borderColor: "#FFCE56",
        backgroundColor: "rgba(255,206,86,0.2)",
        pointBorderColor: "#FFCE56",
        pointBackgroundColor: "#FFF",
        pointBorderWidth: 1,
        yAxisID: "interviews",
      },
      {
        label: "Pass Rate",
        data: passRates,
        borderColor: "#36A2EB",
        backgroundColor: "rgba(54,162,235,0.2)",
        pointBorderColor: "#36A2EB",
        pointBackgroundColor: "#FFF",
        pointBorderWidth: 1,
        yAxisID: "rates",
      },
      {
        label: "Fail Rate",
        data: failRates,
        borderColor: "#FF6384",
        backgroundColor: "rgba(255,99,132,0.2)",
        pointBorderColor: "#FF6384",
        pointBackgroundColor: "#FFF",
        pointBorderWidth: 1,
        yAxisID: "rates",
      },
    ],
  };

  // Options for the line chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Interviews and Pass/Fail Rates by Month",
        font: {
          size: 24,
        },
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Month",
        },
      },
      interviews: {
        type: "linear",
        display: true,
        position: "left",
        title: {
          display: true,
          text: "Interviews",
          font: {
            size: 18,
          },
        },
      },
      rates: {
        type: "linear",
        display: true,
        position: "right",
        title: {
          display: true,
          text: "Pass/Fail Percentage",
          font: {
            size: 18,
          },
        },
      },
    },
  };

  // Render the line chart with the provided data and options
  return (
    <div className="hidden custom:flex custom:h-[400px] bg-bg rounded-lg shadow-lg shadow-black justify-center">
      <Line data={data} options={options} />
    </div>
  );
};

export default LineGraph;
