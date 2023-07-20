import React, { useState, useEffect } from "react";
import Editor from "./TestEditor";
import Challenge from "./Challenge";
import { useParams } from "react-router-dom";
import axios from "axios";

const Interview = () => {
  const [students, setStudents] = useState([]); // State variable for storing the list of students
  const { id } = useParams(); // Extract the "id" parameter from the URL
  const [student, setStudent] = useState(null); // State variable for the selected student
  console.log("id", id);
  const name = JSON.parse(localStorage.getItem("name"));

  return (
    <div className="flex flex-col custom:flex-row custom:items-center">
      <div id="editor-container" className="w-[800px] mx-auto">
        <Editor students={students} student={student} setStudent={setStudent} />
        <div></div> {/* Display the output in the specified <div> */}
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
