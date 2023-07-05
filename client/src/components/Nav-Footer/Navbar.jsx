import React, { useState } from "react";
import logo from "../../assets/galvanize-logo.webp";
import { LuPanelLeftOpen } from "react-icons/lu";
import { CiSettings } from "react-icons/ci";
import { AiFillHome, AiFillProfile } from "react-icons/ai";
import {
  BsFileEarmarkPersonFill,
  BsFillCalendarMinusFill,
} from "react-icons/bs";

import Navmenu from "./Navmenu.jsx";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(true);

  const logos = [
    { AiFillHome },
    { BsFileEarmarkPersonFill },
    { BsFillCalendarMinusFill },
    { AiFillProfile },
  ];

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="bg-bg top-0 w-full mx-auto text-text-light-gray">
      <div className="mx-auto py-10 flex justify-between align-middle">
        <div className="text-[24px] cursor-pointer left-12 relative">
          <LuPanelLeftOpen onClick={toggleMenu} />
        </div>
        <img className="relative mx-auto h-9" src={logo} alt="Logo" />
        <div className="text-[24px]">
          <CiSettings />
        </div>
      </div>
      <div
        className={`top-[-10px] absolute transition duration-500 ${
          showMenu
            ? "opacity-100 translate-x-0 "
            : "opacity-0 -translate-x-[500px]"
        }`}
      >
        <Navmenu showMenu={showMenu} setShowMenu={setShowMenu} />
      </div>
    </div>
  );
};

export default Navbar;
