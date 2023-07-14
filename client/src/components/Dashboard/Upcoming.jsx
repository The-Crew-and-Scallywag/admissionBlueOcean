import React, { useEffect, useState } from "react";
import StudentList from "./StudentList.jsx";

const Upcoming = ({
  students,
  currentStudent,
  setCurrentStudent,
  studentInfo,
  filteredStudents,
  setFilteredStudents,
}) => {
  const [selected, setSelected] = useState("All");
  const [page, setPage] = useState(0);

  const currentDate = new Date();
  let closestDate = currentDate;
  let closestStudent = null;

  studentInfo.forEach((student) => {
    const interviewDate = new Date(student.interview_date);
    const timeDiff = Math.abs(interviewDate - currentDate);
    const closestDiff = Math.abs(closestDate - currentDate);

    if (timeDiff < closestDiff) {
      closestDate = interviewDate;
      closestStudent = student;
    }
  });

  let upcomingInterview = null;
  if (closestStudent !== null) {
    const { s_first_name, s_last_name } = closestStudent;
    upcomingInterview = (
      <>
        <div>
          Upcoming Interview{" "}
          <span className="text-accent"> date and time </span>
        </div>
        <div>
          Interviewee Name: {s_first_name} {s_last_name}
        </div>
      </>
    );
  } else {
    upcomingInterview = <div>No upcoming interviews</div>;
  }

  const selectedStudents = selected === "All" ? studentInfo : filteredStudents;
  const chunkSize = 8;

  const chunkedStudents = selectedStudents.reduce(
    (resultArray, item, index) => {
      const chunkIndex = Math.floor(index / chunkSize);

      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = [];
      }

      resultArray[chunkIndex].push(item);

      return resultArray;
    },
    []
  );

  const handleSelect = (e) => {
    setPage(0);
    setSelected(e.target.value);
  };

  return (
    <div className="flex-col mt-12 mx-auto text-lg w-full flex">
      <h1 className="text-2xl font-bold tracking-wide my-4 text-left">
        Upcoming:
      </h1>
      <div className="flex flex-row justify-center bg-bg p-4 rounded-lg shadow-lg shadow-black w-full">
        <div className="text-center">{upcomingInterview}</div>
      </div>
      <div className="w-full">
        <div className="p-4 bg-bg/70 rounded-lg my-4 py-0 shadow-lg shadow-black">
          <div className="flex flex-row justify-between">
            <h1 className="text-2xl font-bold tracking-wide my-4 text-left">
              Recent Interviews:
              <select
                value={selected}
                onChange={handleSelect}
                className="text-md m-2 rounded-md bg-bg/70 text-white/50 p-1 shadow-md shadow-black focus:ring-1 focus:ring-accent text-lg tracking-wider ml-2 cursor-pointer transition-all duration-300 ease-in-out"
              >
                <option value="All">All</option>
                <option value="Assigned">Assigned</option>
              </select>
            </h1>
            <div className="p-4">
              {chunkedStudents.map((_, index) => {
                return (
                  <button
                    key={index}
                    className={`${
                      page === index
                        ? "bg-accent text-white"
                        : "bg-bg/70 text-white/50"
                    } rounded-md p-2 shadow-md shadow-black text-lg tracking-wider hover:scale-105 ml-2 cursor-pointer transition-all duration-300 ease-in-out`}
                    onClick={() => setPage(index)}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
          </div>
          <StudentList
            students={students}
            currentStudent={currentStudent}
            setCurrentStudent={setCurrentStudent}
            studentInfo={studentInfo}
            filteredStudents={filteredStudents}
            setFilteredStudents={setFilteredStudents}
            selected={selected}
            page={page}
            chunkedStudents={chunkedStudents}
          />
        </div>
      </div>
    </div>
  );
};

export default Upcoming;
