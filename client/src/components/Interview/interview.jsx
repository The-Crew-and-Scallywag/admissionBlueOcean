import React from "react";
import Editor from "./Editor";
import Challenge from "./Challenge";

const Interview = () => {
  return (
    <div className="flex flex-row">
      <div id="editor-container" className="w-[800px] mx-[80px]">
        <Editor />
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