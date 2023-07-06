import React from "react";
import Editor from "./Editor";

const Interview = () => {
  return (
    <div className="grid grid-cols-4 gap-4 pt-8">
      <div id="left-column" className="col-span-3">
        <Editor />
      </div>
      <div id="right-column" className="col-span-1">
        {/* Add your other components here */}
      </div>
    </div>
  );
};

export default Interview;
