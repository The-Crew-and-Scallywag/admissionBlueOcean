import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark as dark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function Answer({ question, questionNum }) {
  return (
    <div className="text-white/70 p-6 m-4 bg-secondary rounded-md shadow-lg shadow-black text-lg text-left">
      {questionNum !== 1 ? (
        `${question[questionNum].questions}`
      ) : (
        <SyntaxHighlighter
          language="javascript"
          style={dark}
          wrapLines={true}
          wrapLongLines={true}
        >
          {question[questionNum].questions}
        </SyntaxHighlighter>
      )}
    </div>
  );
}
