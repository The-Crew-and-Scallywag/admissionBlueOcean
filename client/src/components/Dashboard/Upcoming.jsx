import React from "react";
import StudentList from "./StudentList.jsx";

const Upcoming = ({ students, currentStudent, setCurrentStudent }) => {
  console.log(students);
  return (
    <div className="flex-col mt-12 mx-auto text-lg w-[400px] ">
      <h1 className="text-2xl font-bold tracking-wide my-4 text-center">
        Upcoming
      </h1>
      <div className="flex flex-row justify-center bg-bg p-4 rounded-lg shadow-lg shadow-black">
        <div className="text-center">
          <div>
            Upcoming Interview{" "}
            <span className="text-accent"> date and time </span>
          </div>
          <div>Interviewee Name</div>
        </div>
      </div>
      <StudentList
        students={students}
        currentStudent={currentStudent}
        setCurrentStudent={setCurrentStudent}
      />
    </div>
  );
};

export default Upcoming;
