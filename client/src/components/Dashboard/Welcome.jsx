import React from "react";
import Upcoming from "./Upcoming";

const Welcome = () => {
  return (
    <div className="text-5xl text-white text-left mx-10 my-12 flex flex-col px-14 mr-[-100px]">
      <div>
        Welcome back <span className="text-galv-orange"> John</span>
        <div className="border-y-2 border-bg shadow-lg shadow-black mt-2"></div>
      </div>
      <Upcoming />
    </div>
  );
};

export default Welcome;
