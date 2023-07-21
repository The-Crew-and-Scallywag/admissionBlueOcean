import React, { useState, useEffect } from "react";
// import { Question1, Question2, Question3 } from "./Question";
import Answer from "../Answer";
import axios from "axios";

export default function Challenge({
  questionNum,
  question,
  increment,
  interviewId,
}) {
  const [notes, setNotes] = useState("");

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  const questionId = questionNum + 1;
  const handleNoteSubmit = async () => {
    const response = await axios.patch("api/interview/question/notes", {
      questionId: questionId,
      note: notes,
      interviewId: interviewId,
    });
  };

  return (
    <div className="flex flex-col justify-center pt-2 w-[700px] border-b-2 border-gray-500 relative">
      {/* <Question1 /> */}
      <Answer
        question={question}
        questionNum={questionNum}
        increment={increment}
      />
      <textarea
        value={notes}
        onChange={handleNotesChange}
        className="w-full h-20 p-4 border border-gray-300 rounded"
        placeholder={`Notes For Challenge ${questionId}`}
      ></textarea>
      <button
        onClick={handleNoteSubmit}
        className=" bg-gray-600 w-[100px] rounded-md text-white text-center absolute right-[0] bottom-[-35px] hover:scale-[102%]"
      >
        Submit Note
      </button>
    </div>
  );
}
