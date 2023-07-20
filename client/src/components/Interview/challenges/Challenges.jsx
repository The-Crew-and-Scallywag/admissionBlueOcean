import React, { useEffect, useState } from "react";
import Challenge from "./Challenge";
import axios from "axios";

const Challenges = ({ questionNum, increment, interviewId }) => {
  const [question, setQuestion] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const response = await axios.get(`/api/questions/`);
        const data = response.data;
        setQuestion(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getQuestions();
  }, []);

  return (
    !loading && (
      <Challenge
        question={question}
        questionNum={questionNum}
        increment={increment}
        interviewId={interviewId}
      />
    )
  );
};

export default Challenges;
