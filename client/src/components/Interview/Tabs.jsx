import React, { useState } from "react";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  return (
    <div className="w-80 h-auto min-h-[400px] bg-[#053742] mx-auto my-14 p-8 text-[#E8F0F2] rounded-2xl">
      {/* Tab nav */}
      <ul className="w-60 mx-auto mb-8 flex items-center justify-between border border-[#39A2DB] rounded-2xl pl-0 hover:bg-teal-300">
        <li className="w-1/2 p-4 list-none text-center cursor-pointer transition-all duration-700 rounded-bl-2xl rounded-tl-2xl">
          Tab 1</li>
        <li className="w-1/2 p-4 list-none text-center cursor-pointer transition-all duration-700 rounded-bl-2xl rounded-tl-2xl">
          Tab 2</li>
      </ul>
      <div className="outlet">
        {/* content will be shown here */}
      </div>
    </div>
  );
};
export default Tabs;