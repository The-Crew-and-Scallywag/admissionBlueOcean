import React, { useEffect, useState } from "react";
import Welcome from "./Welcome";
import StudentInfo from "./StudentInfo";
import axios from "axios";

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [studentInfo, setStudentInfo] = useState([]);
  const [currentStudent, setCurrentStudent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [transition, setTransition] = useState(true);

  useEffect(() => {
    const hello = async () => {
      try {
        const res = await axios.get("/api/students");

        const data = res.data;
        setStudents(data);
      } catch (err) {
        console.log(err);
      }
    };
    hello();
  }, []);

  useEffect(() => {
    const getInterviews = async () => {
      try {
        const res = await axios.get(`/api/interviews/`);
        const data = res.data;
        setStudentInfo(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    getInterviews();
  }, [students]);

  useEffect(() => {
    students.length && studentInfo.length && setLoading(false);
  }, [students, studentInfo]);

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
        <div
          className={`mx-auto w-full max-w-[1000px] ${
            transition ? "opacity-0 -translate-x-[200px]" : transitionClass
          }`}
        >
          {!loading && (
            <Welcome
              students={students}
              currentStudent={currentStudent}
              setCurrentStudent={setCurrentStudent}
              studentInfo={studentInfo}
            />
          )}
        </div>
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
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
