import React, { useEffect, useState } from "react";
import axios from "axios";
import StarRating from "./StarRating";

export default function Challenge() {
  const [notes, setNotes] = useState("");
  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await axios.get("/api/questions");
        const data = res.data;
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions", error);
      }
    };
    fetchQuestion();
  }, []);

  const handleNextQuestion = () => {
    setQuestionIndex((prevIndex) =>
      prevIndex === questions.length  ? 0 : prevIndex + 1
    );
  };

  const Question = () => {
    if (questions.length === 0) {
      return <div className="w-1/2 text-white text-xl pt-3">Loading questions...</div>;
    }
    const currentQuestion = questions[questionIndex];
    console.log(currentQuestion)

    return (
      <div >
        <div className="flex justify-center	items-center text-white text-lg pt-3">
          {currentQuestion.questions}
        </div>
        <button className="w-[150px] text-white text-lg py-2 hover:border-[#E9704B] hover:border-[1px] hover:bg-"
         onClick={handleNextQuestion}>Next Question

         </button>
      </div>
    );
  };

  const Notes = () => {
    return (
      <div className="w-full flex">
        <textarea
        value={notes}
        onChange={handleNotesChange}
        className="w-full h-20 p-4 border border-gray-300 rounded mx-2 mb-2"
        placeholder="Notes..."
        ></textarea>
      </div>
    )
  }

  // const Answer = () => {
  //   return <div className="text-white text-lg pt-3"></div>;
  // }

  return (
    <div className="flex flex-col justify-center items-center 
    pt-2 w-[700px] bg-[#0A0B0B] rounded-lg shadow-lg shadow-black">
      <Question />
      {/* <Answer /> */}
      <StarRating />
      <Notes />
    </div>
  );
}
