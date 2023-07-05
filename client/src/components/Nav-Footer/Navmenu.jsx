import React from "react";
import { LuPanelLeftClose } from "react-icons/lu";
import { NAVLINKS } from "./utils";
import { Link } from "react-router-dom";
import { AiFillHome, AiFillProfile } from "react-icons/ai";
import {
  BsFileEarmarkPersonFill,
  BsFillCalendarMinusFill,
} from "react-icons/bs";

const Navmenu = ({ showMenu, setShowMenu }) => {
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const logos = [
    <AiFillHome className="text-[20px] bottom-[-2px] relative" />,
    <BsFileEarmarkPersonFill className="text-[20px] bottom-[-2px] relative" />,
    <BsFillCalendarMinusFill className="text-[20px] bottom-[-2px] relative" />,
    <AiFillProfile className="text-[20px] bottom-[-2px] relative" />,
  ];

  return (
    <div className="bg-secondary h-screen w-[400px] absolute top-0 left-0 border-r-[1px] border-accent my-2">
      <div className="flex flex-col justify-center align-middle">
        <div className="text-[24px] cursor-pointer absolute right-0 top-0 p-4">
          <LuPanelLeftClose onClick={toggleMenu} />
        </div>
      </div>
      <div className="flex flex-col align-middle items-center my-12 p-4">
        <div className="p-1 text-galv-orange font-bold text-[32px] cursor-default">
          John Doe
        </div>
        <div className="text-[18px] text-white lowercase italic cursor-default">
          Instructor
        </div>
      </div>
      <div className="border-b-accent border-b-[1px] mx-10"></div>
      <div className="flex flex-col items-left my-12 mx-12 p-4">
        {NAVLINKS.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className="p-3 cursor-default flex align-bottom flex-row"
          >
            {logos[link.id - 1]} &nbsp;
            <span className="text-[18px] text-white hover:text-galv-orange hover:transition-transform hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              &nbsp; {link.name}
            </span>
          </Link>
        ))}
      </div>
      <div className="border-b-accent border-b-[1px] mx-10"></div>
      <div className="w-full my-12 mx-28">
        <button className="bg-galv-blue rounded-md p-3 w-40 border-[1px] border-accent hover:border-galv-orange hover:scale-105 transition-all transform-gpu duration-300 text-white">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navmenu;
