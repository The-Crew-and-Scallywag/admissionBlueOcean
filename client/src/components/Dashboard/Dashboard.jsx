import React, { useEffect, useState } from "react";
import Welcome from "./Welcome";
import StudentInfo from "./StudentInfo";
import axios from "axios";

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [currentStudent, setCurrentStudent] = useState(0);

  useEffect(() => {
    const hello = async () => {
      try {
        const res = await axios.get("/api/students");
        const data = res.data;
        console.log(data);
        setStudents(data);
      } catch (err) {
        console.log(err);
      }
    };
    console.log(students);
    hello();
  }, []);

  const changeCurrentStudent = (id) => {
    setCurrentStudent(id);
  };

  return (
    <div className="h-full w-full">
      <div className="flex flex-col md:flex-row w-full mx-auto justify-between">
        <Welcome
          students={students}
          currentStudent={currentStudent}
          setCurrentStudent={setCurrentStudent}
        />
        <StudentInfo
          students={students}
          currentStudent={currentStudent}
          setCurrentStudent={changeCurrentStudent}
        />
      </div>
    </div>
  );
};

export default Dashboard;
