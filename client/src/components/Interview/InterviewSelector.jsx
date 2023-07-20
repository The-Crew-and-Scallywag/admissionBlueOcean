import React, { useEffect, useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const InterviewSelector = ({ getInterviewId }) => {
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/students", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setStudents(res.data);
        setStudent(res.data[0]);
      });
  }, []);

  const handleChange = (e) => {
    const selectedStudentId = parseInt(e.target.value);
    setStudent(students.find((student) => student.id === selectedStudentId));
  };

  const handleStartInterview = async () => {
    const date = new Date();
    const response = await axios.post("/api/interview/", {
      studentId: JSON.stringify(student.id),
      interviewerId: localStorage.getItem("token"),
      date: date.toISOString(),
    });
    getInterviewId(response.data.id);
  };

  return (
    <div className="w-full h-full mx-auto my-2 p-12 block justify-center text-center">
      <div className="bg-secondary w-1/2 rounded-md shadow-lg shadow-black p-2 mx-auto my-12">
        <div>
          <h1 className="text-lg font-bold text-white/70">
            Interview Selector
          </h1>
          <select
            className="bg-bg text-white/70 p-2 rounded-lg my-2 mx-auto"
            onChange={handleChange}
          >
            {students.map((student) => (
              <option value={student.id} key={student.id}>
                {`${student.first_name} ${student.last_name}`}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col my-12">
          <div>
            <h1 className="text-2xl font-bold text-white/70">
              {student.first_name} {student.last_name}
            </h1>
            <ul className="p-2 m-4 gap-3">
              <li className="text-white/70 font-bold">
                Email:{" "}
                <span className="text-accent italic">{student.email}</span>
              </li>
              <li className="text-white/70 font-bold">
                Phone:{" "}
                <span className="text-accent italic">{student.phone}</span>
              </li>
            </ul>
          </div>
          <div>
            <button
              onClick={() => {
                handleStartInterview();
                navigate(`/interview/${student.id}`);
              }}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Start Interview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewSelector;
