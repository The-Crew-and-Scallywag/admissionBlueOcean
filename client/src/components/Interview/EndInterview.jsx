import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EndInterview = ({ toggleModal, interviewId }) => {
  const [interviewData, setInterviewData] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [notes, setNotes] = useState("");
  const [result, setResult] = useState(null);
  const [passClicked, setPassClicked] = useState(false);
  const [failClicked, setFailClicked] = useState(false);

  const navigate = useNavigate();

  console.log(result);

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  useEffect(() => {
    const getInterviewData = async () => {
      try {
        const response = await axios.get(`/api/interview/${interviewId}`);
        const data = response.data;
        setChallenges(response.data.q_notes);
        setInterviewData(data);
      } catch (error) {
        console.log(error);
      }
    };

    getInterviewData();
  }, []);

  const handleSummarySubmit = async () => {
    try {
      const response = await axios.patch("/api/interview/notes", {
        note: notes,
        interviewId: JSON.stringify(interviewId),
      });
      const res = await axios.patch("/api/interview/result", {
        result: result,
        interviewId: JSON.stringify(interviewId),
      });

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handlePassClick = () => {
    setResult("pass");
    setPassClicked(true);
    setFailClicked(false);
  };

  const handleFailClick = () => {
    setResult("fail");
    setPassClicked(false);
    setFailClicked(true);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-black">
      <div className=" bg-gray-700 p-4 rounded-md w-[720px]">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Interview Summary
        </h1>
        <h2 className="text-2xl text-center">
          <span className="  font-bold ">Interviewee's Name: </span>
          {interviewData.s_first_name} {interviewData.s_last_name}
        </h2>
        <div className=" text-stone-200 text-lg font-semibold">
          <div>
            <span className=" font-bold">Challenge 1 Notes: </span>
            {challenges[0]}
          </div>
          <div>
            <span className=" font-bold">Challenge 2 Notes: </span>
            {challenges[1]}
          </div>
          <div>
            <span className=" font-bold">Challenge 3 Notes: </span>
            {challenges[2]}
          </div>
          <div>
            <span className=" font-bold">Challenge 4 Notes: </span>
            {challenges[3]}
          </div>
        </div>
        <div className="text-lg">
          {" "}
          Summary of interview:
          <textarea
            value={notes}
            onChange={handleNotesChange}
            className="w-full h-[125px] p-4 border border-gray-300 rounded"
            placeholder="Summary Notes"
          ></textarea>
        </div>

        <div className="flex flex-row w-full justify-center">
          <div className="">
            <button
              onClick={handlePassClick}
              className={`bg-${
                passClicked ? "green" : "gray"
              }-500 w-[100px] h-[30px] text-lg font-semibold rounded-md mr-2`}
            >
              Pass
            </button>
            <button
              onClick={handleFailClick}
              className={`bg-${
                failClicked ? "red" : "gray"
              }-500 w-[100px] h-[30px] text-lg font-semibold rounded-md`}
            >
              Fail
            </button>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            className="px-4 py-2 mr-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            onClick={toggleModal} // Close the modal when "Cancel" is clicked
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-blue-700"
            onClick={() => {
              handleSummarySubmit();
            }}
          >
            End Interview
          </button>
        </div>
      </div>
    </div>
  );
};

export default EndInterview;
