import React, { useState, useEffect } from "react";
import Editor from "./TestEditor";
import Challenge from "./Challenge";
import { useParams } from "react-router-dom";
import axios from "axios";

const Interview = () => {
  const [output, setOutput] = useState(""); // State to store the output
  const [students, setStudents] = useState([]); // State variable for storing the list of students
  const { id } = useParams(); // Extract the "id" parameter from the URL
  const [student, setStudent] = useState(null); // State variable for the selected student

  useEffect(() => {
    const getStudents = async () => {
      const res = await axios.get("/api/students"); // Fetch the list of students from the API
      const students = res.data;
      console.log(students);
      setStudents(students); // Store the fetched students in the state
    };
    getStudents();

    if (id) {
      setStudent(students.find((student) => student.id === Number(id))); // Find the student with the matching "id" parameter and set it as the selected student
    }
  }, [students.length, id]); // Fetch students and update selected student whenever the "students" or "id" variables change

  const handleOutput = (result) => {
    setOutput(result); // Update the output state with the result
  };

  return (
    <div className="flex flex-col custom:flex-row custom:items-center">
      <div id="editor-container" className="w-[800px] mx-auto">
        <Editor
          handleOutput={handleOutput}
          students={students}
          student={student}
          setStudent={setStudent}
        />
        <div>{output}</div> {/* Display the output in the specified <div> */}
      </div>
      <div id="challenge-container" className="mx-auto text-center">
        <div className="text-white text-3xl pt-4">Challenges</div>
        <Challenge />
        <Challenge />
        <Challenge />
      </div>
    </div>
  );
};

export default Interview;
