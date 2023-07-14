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
        <div className="w-1/2 text-white text-lg pt-3">
          {currentQuestion.questions}
        </div>
        <button className="w-1/2 text-white text-lg pt-3"
         onClick={handleNextQuestion}>Next Question</button>
      </div>
    );
  };

  const Notes = () => {
    return (
      <textarea
      value={notes}
      onChange={handleNotesChange}
      className="w-full h-20 p-4 border border-gray-300 rounded"
      placeholder="Notes..."
    ></textarea>
    )
  }

  const Answer = () => {
    return <div className="text-white text-lg pt-3"></div>;
  }

  return (
    <div className="flex flex-col justify-center pt-2 w-[700px] border-b-2 border-gray-500">
      <Question />
      <Answer />
      <StarRating />
      <Notes />
      <div id="border-spacing" className="w-full h-3">
        .
      </div>
    </div>
  );
}
