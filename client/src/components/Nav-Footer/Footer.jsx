import React from "react";
import { FOOTER_LINKS_1, FOOTER_LINKS_2 } from "./utils";

const Footer = () => {
  return (
    <div className="fixed bottom-0 right-0 left-0 w-full h-32 bg-bg">
      <div className=" border-b-[1px] border-accent">
        <div className="flex-row text-left my-4">
          {FOOTER_LINKS_1.map((link) => (
            <a
              key={link.name}
              className="text-white text-md mx-2 hover:text-accent transition-all duration-150 ease-in-out cursor-pointer"
            >
              {link.name}{" "}
              {link.name !== "Events" && (
                <span className="text-xs text-accent">{">"}</span>
              )}
            </a>
          ))}
        </div>
      </div>
      <div className="flex flex-row justify-between my-2">
        <div className="flex-row text-left my-4">
          {FOOTER_LINKS_2.map((link) => (
            <a
              key={link.name}
              className="text-white text-md mx-2 hover:text-galv-orange transition-all duration-150 ease-in-out cursor-pointer"
            >
              {link.name}{" "}
              {link.name !== "Sitemap" && (
                <span className="text-xs text-accent">{">"}</span>
              )}
            </a>
          ))}
        </div>
        <div className="text-white/50 mx-4 text-sm tracking-wider">
          2023 Galvanize, All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;