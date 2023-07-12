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
        setStudents(data);
      } catch (err) {
        console.log(err);
      }
    };
    hello();
  }, []);

  return (
    <div className="h-full w-full">
      <div className="flex flex-col-reverse custom:flex-row w-full mx-auto">
        <div className="mx-auto w-full custom:ml-[200px]">
          <Welcome
            students={students}
            currentStudent={currentStudent}
            setCurrentStudent={setCurrentStudent}
          />
        </div>
        <div className="mx-auto custom:mr-[400px] flex">
          <StudentInfo
            students={students}
            currentStudent={currentStudent}
            setCurrentStudent={setCurrentStudent}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
