import React from "react";
import StudentList from "./StudentList.jsx";

const Upcoming = ({
  students,
  currentStudent,
  setCurrentStudent,
  studentInfo,
}) => {
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
          <h1 className="text-2xl font-bold tracking-wide my-4 text-left">
            Recent Interviews:
            <select
              placeholder="All"
              className="text-md m-2 rounded-md bg-bg/70 text-white/50 p-1 shadow-md shadow-black focus:ring-1 focus:ring-accent text-lg tracking-wider ml-2 cursor-pointer transition-all duration-300 ease-in-out"
            >
              <option value="All">All</option>
              <option value="Assigned">Assigned</option>
            </select>
          </h1>
          <StudentList
            students={students}
            currentStudent={currentStudent}
            setCurrentStudent={setCurrentStudent}
            studentInfo={studentInfo}
          />
        </div>
      </div>
    </div>
  );
};

export default Upcoming;
