import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";

export default function Answer({ question, questionNum }) {
  return (
    <div className="text-white/70 p-6 m-4 bg-secondary rounded-md shadow-lg shadow-black text-lg text-left">
      {questionNum !== 1 ? (
        `${question[questionNum].questions}`
      ) : (
        <SyntaxHighlighter>{question[questionNum].questions}</SyntaxHighlighter>
      )}
    </div>
  );
}
