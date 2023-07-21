import React, { useState, useEffect } from "react";
import Editor from "./TestEditor";
import { useParams } from "react-router-dom";
import Challenges from "./challenges/Challenges";
import EndInterview from "./EndInterview";
import axios from "axios";

const Interview = ({ interviewId }) => {
  const [students, setStudents] = useState([]); // State variable for storing the list of students
  const { id } = useParams(); // Extract the "id" parameter from the URL
  const [student, setStudent] = useState(null); // State variable for the selected student
  const [questionNum, setQuestionNum] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState(null);

  const name = JSON.parse(localStorage.getItem("name"));

  const increment = () => {
    if (questionNum === 3) {
      setQuestionNum(-1);
    }
    setQuestionNum((prev) => prev + 1);
  };

  const decrement = () => {
    if (questionNum === 0) {
      setQuestionNum(4);
    }
    setQuestionNum((prev) => prev - 1);
  };

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const test = async () => {
    try {
      const response = await axios.get("/api/interview", {
        interviewId: interviewId,
      });
      const data = response.data;
      setData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col custom:flex-row custom:items-center relative">
      <div id="editor-container" className="w-[800px] mx-auto">
        <Editor students={students} student={student} setStudent={setStudent} />
        <div></div> {/* Display the output in the specified <div> */}
      </div>
      <div id="challenge-container" className="mx-auto text-center">
        <div className="text-white text-3xl pt-4 relative">
          Challenge #{`${questionNum + 1}`}
          <button
            className="absolute text-[15px] right-[10px] bottom-[-15px] hover:scale-[102%] bg-gray-600 rounded-md p-1"
            onClick={increment}
          >
            Next Challenge{`>`}
          </button>
          <button
            className="absolute text-[15px] left-[10px] bottom-[-15px] hover:scale-[102%] bg-gray-600 rounded-md p-1"
            onClick={decrement}
          >
            {`<`}Prev Challenge
          </button>
        </div>
        <Challenges
          questionNum={questionNum}
          increment={increment}
          student={student}
          interviewId={interviewId}
        />
      </div>
      <button
        className="absolute bottom-[17%] right-[375px] w-[164px] h-[50px] bg-gray-600 rounded-md text-[22px] text-white hover:scale-[102%]"
        onClick={() => {
          test();
          toggleModal();
        }}
      >
        END INTERVIEW
      </button>

      {showModal && (
        <EndInterview toggleModal={toggleModal} interviewId={interviewId} />
      )}
    </div>
  );
};

export default Interview;
