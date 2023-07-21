import React, { useState, useEffect } from "react";
import Editor from "./TestEditor";
import { useParams } from "react-router-dom";
import axios from "axios";
import Challenges from "./challenges/Challenges";

const Interview = ({ interviewId }) => {
  const [students, setStudents] = useState([]); // State variable for storing the list of students
  const [interviewData, setInterviewData] = useState([]);
  const { id } = useParams(); // Extract the "id" parameter from the URL
  const [student, setStudent] = useState(null); // State variable for the selected student
  const [questionNum, setQuestionNum] = useState(0);
  const [showModal, setShowModal] = useState(false);

  console.log(interviewData);

  const name = JSON.parse(localStorage.getItem("name"));
  useEffect(() => {
    const getInterviewData = async () => {
      try {
        const response = await axios.get("/api/interview/", {
          interviewId: interviewId,
        });
        const data = response.data;
        setInterviewData(data);
      } catch (error) {
        console.log(error);
      }
    };
    getInterviewData();
  }, [interviewId]);

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
          toggleModal();
        }}
      >
        END INTERVIEW
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-black">
          <div className="bg-white p-4 rounded-md">
            <h2 className="text-2xl font-semibold mb-4">Interview Summary</h2>
            <p className="text-gray-700">{interviewData.s_first_name}</p>
            <div className="mt-4 flex justify-end">
              <button
                className="px-4 py-2 mr-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                onClick={toggleModal} // Close the modal when "Cancel" is clicked
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                onClick={() => {
                  toggleModal();
                }}
              >
                End Interview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Interview;
