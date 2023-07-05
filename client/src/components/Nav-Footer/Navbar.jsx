import React, { useState } from "react";
import logo from "../../assets/galvanize-logo.webp";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { CiSettings } from "react-icons/ci";
import Navmenu from "./Navmenu.jsx";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(true);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="bg-bg top-0 w-full mx-auto text-text-light-gray">
      <div className="mx-auto py-10 flex justify-between align-middle">
        <div className="text-[24px] cursor-pointer left-12 relative">
          {showMenu ? (
            <AiOutlineClose onClick={toggleMenu} />
          ) : (
            <GiHamburgerMenu onClick={toggleMenu} />
          )}
        </div>
        <img className="relative mx-auto h-9" src={logo} alt="Logo" />
        <div className="text-[24px]">
          <CiSettings />
        </div>
      </div>
      <div
        className={`top-[-100px] relative transform transition-all duration-300 ${
          showMenu
            ? "opacity-100 translate-x-0"
            : "opacity-0 -translate-x-12 -z-50"
        }`}
      >
        <Navmenu showMenu={showMenu} setShowMenu={setShowMenu} />
      </div>
    </div>
  );
};

export default Navbar;
