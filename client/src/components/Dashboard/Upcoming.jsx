import React from "react";

const Upcoming = () => {
  return (
    <div className="flex-col mt-12 mx-auto text-lg w-[400px]">
      <h1 className="text-2xl font-bold tracking-wide my-4 text-center">
        Upcoming
      </h1>
      <div className="flex flex-row justify-center bg-bg p-4 rounded-lg">
        <div className="text-center">
          <div>
            Upcoming Interview{" "}
            <span className="text-accent"> date and time </span>
          </div>
          <div>Interviewee Name</div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Upcoming;
