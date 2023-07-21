import React, { useEffect, useState } from "react";
import axios from "axios";

const EndInterview = ({ toggleModal, interviewId }) => {
  const [interviewData, setInterviewData] = useState([]);

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
  }, []);

  return (
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
            onClick={toggleModal}
          >
            End Interview
          </button>
        </div>
      </div>
    </div>
  );
};

export default EndInterview;
