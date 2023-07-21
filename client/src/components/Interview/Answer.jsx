import React from "react";

export default function Answer({ question, questionNum }) {
  return (
    <div className="text-white text-lg pt-3">
      {question[questionNum].questions}
    </div>
  );
}
