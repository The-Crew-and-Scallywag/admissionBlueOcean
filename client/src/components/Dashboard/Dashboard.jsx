import React, { useEffect, useState } from "react";
import Welcome from "./Welcome";
import StudentInfo from "./StudentInfo";
import axios from "axios";

const Dashboard = () => {
  // State variables
  const [students, setStudents] = useState([]); // Stores the list of students
  const [studentInfo, setStudentInfo] = useState([]); // Stores the list of student information
  const [filteredStudents, setFilteredStudents] = useState([]); // Stores the list of filtered students
  const [currentStudent, setCurrentStudent] = useState(0); // Represents the index of the currently selected student
  const [loading, setLoading] = useState(true); // Indicates if data is being loaded
  const [transition, setTransition] = useState(true); // Controls transition effects

  // Fetching the user's name from localStorage
  const name = JSON.parse(localStorage.getItem("name"));

  // Fetching the list of students from the server
  useEffect(() => {
    const getStudents = async () => {
      try {
        const res = await axios.get("/api/students/");
        const data = res.data;
        setStudents(data);
      } catch (err) {
        console.log(err);
      }
    };
    getStudents();
  }, []);

  // Fetching the list of interviews for the current user
  useEffect(() => {
    const getInterviews = async () => {
      try {
        const res = await axios.get(`/api/interviews/`);
        const data = res.data;
        const filteredData = data.filter((student) => {
          return student.i_first_name === name.firstName;
        });
        setFilteredStudents(filteredData);
        setStudentInfo(data);
      } catch (err) {
        console.log(err);
      }
    };
    getInterviews();
  }, [students]); // Fetch interviews when the list of students changes

  // When both students and studentInfo are populated, set loading to false
  useEffect(() => {
    students.length && studentInfo.length && setLoading(false);
  }, [students, studentInfo]);

  // Set transition effect on initial render
  useEffect(() => {
    setTransition(true);
    setTimeout(() => {
      setTransition(false);
    }, 300);
  }, []);

  const transitionClass = "transition-all duration-500 ease-in-out transform";

  return (
    <div className="h-full w-full flex">
      <div className="flex flex-col sm:flex-row justify-between align-center w-full mx-auto p-12">
        {/* Welcome component */}
        <div
          className={`mx-auto w-full max-w-[1200px] ${
            transition ? "opacity-0 -translate-x-[200px]" : transitionClass
          }`}
        >
          {!loading && (
            <Welcome
              students={students}
              currentStudent={currentStudent}
              setCurrentStudent={setCurrentStudent}
              studentInfo={studentInfo}
              filteredStudents={filteredStudents}
              setFilteredStudents={setFilteredStudents}
            />
          )}
        </div>
        {/* StudentInfo component */}
        <div
          className={`mx-auto ${
            transition ? "opacity-0 translate-x-[200px]" : transitionClass
          }`}
        >
          {!loading && (
            <StudentInfo
              students={students}
              currentStudent={currentStudent}
              setCurrentStudent={setCurrentStudent}
              studentInfo={studentInfo}
              filteredStudents={filteredStudents}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
