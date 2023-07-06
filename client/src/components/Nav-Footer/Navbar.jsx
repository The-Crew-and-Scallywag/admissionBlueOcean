import React, { useState } from "react";
import logo from "../../assets/galvanize-logo.webp";
import { LuPanelLeftOpen } from "react-icons/lu";
import { CiSettings } from "react-icons/ci";

import Navmenu from "./Navmenu.jsx";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="bg-bg top-0 w-full mx-auto text-text-light-gray shadow-lg shadow-black">
      <div className="w-full md:max-w-[2560px] mx-auto">
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
          className={`top-[-10px] absolute transition duration-300 ${
            showMenu ? "translate-x-0 " : "-translate-x-[2000px]"
          }`}
        >
          <Navmenu showMenu={showMenu} setShowMenu={setShowMenu} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
