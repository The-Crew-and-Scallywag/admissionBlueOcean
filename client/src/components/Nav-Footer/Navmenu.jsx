import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { NAVLINKS } from "./utils";
import { Link } from "react-router-dom";

const Navmenu = ({ showMenu, setShowMenu }) => {
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    <div className="bg-bg h-screen w-[400px] absolute top-0 left-0 border-[1px] border-galv-orange rounded-md my-2">
      <div className="flex flex-col justify-center align-middle">
        <div className="text-[24px] cursor-pointer absolute right-0 top-0 p-4">
          <AiOutlineClose onClick={toggleMenu} />
        </div>
      </div>
      <div className="flex flex-col align-middle items-center my-12 p-4">
        <div className="p-1 text-galv-orange font-bold text-[32px]">
          John Doe
        </div>
        <div className="text-[18px] text-white">Instructor</div>
      </div>
      <div className="border-b-accent border-b-[1px] mx-10"></div>
      <div className="flex flex-col items-left my-12 p-4 ml-14">
        {NAVLINKS.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className="text-[18px] text-white my-2"
          >
            {link.name}
          </Link>
        ))}
      </div>
      <div className="border-b-accent border-b-[1px] mx-10"></div>
      <div>
        <button className="bg-galv-blue rounded-md p-3 w-40 mx-auto">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navmenu;
