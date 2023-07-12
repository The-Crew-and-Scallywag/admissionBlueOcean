import React, { useState } from "react";
import Editor from "./Editor";
import Challenge from "./Challenge";

const Interview = () => {
  const [output, setOutput] = useState(""); // State to store the output

  const handleOutput = (result) => {
    setOutput(result); // Update the output state with the result
  };

  return (
    <div className="flex flex-row">
      <div id="editor-container" className="w-[800px] mx-[80px]">
        <Editor handleOutput={handleOutput} />
        <div>{output}</div> {/* Display the output in the specified <div> */}
      </div>
      <div id="challenge-container" className="ml-[80px] text-center">
        <div className="text-white text-3xl pt-4">Challenges</div>
        {[...Array(5)].map((star) => {
        return <Challenge />
        })}
      </div>
    </div>
  );
};

export default Interview;
