import React, { useState } from "react";
import { TEMP_STUDENT_DATA } from "../Nav-Footer/utils";
import { MdEditDocument, MdEditOff } from "react-icons/md";

const StudentInfo = () => {
  const [studentData, setStudentData] = useState(TEMP_STUDENT_DATA);
  const [currentStudent, setCurrentStudent] = useState(TEMP_STUDENT_DATA[0]);
  const [editMode, setEditMode] = useState(false);
  const [updatedStudent, setUpdatedStudent] = useState({});

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <div className="grid grid-cols-1 w-[650px] mx-auto my-20">
      <div className="text-white text-2xl text-center">
        Selected Student:{" "}
        <span className="text-accent">{currentStudent.Name}</span>
      </div>
      <div className="bg-bg rounded-lg m-2 p-2 shadow-lg shadow-black">
        {editMode ? (
          <MdEditOff
            className="relative text-white float-right cursor-pointer text-xl"
            onClick={toggleEditMode}
          />
        ) : (
          <MdEditDocument
            className="relative text-white float-right cursor-pointer text-xl"
            onClick={toggleEditMode}
          />
        )}
        <div className="mt-4 mb-12 grid grid-cols-1 md:grid-cols-2 gap-1 p-6">
          {Object.entries(currentStudent)
            .splice(1)
            .map(([key, value]) => (
              <div
                key={key}
                className="flex flex-col md:flex-row justify-between align-middle"
              >
                <div className="font-bold px-3 text-white text-lg">{key}:</div>
                {!editMode ? (
                  <div className="text-accent text-lg ">{value}</div>
                ) : (
                  <input
                    value={value}
                    className="bg-secondary text-white text-lg mt-1 p-1 rounded-md w-[175px]"
                    type={
                      key === "Email"
                        ? "email"
                        : key === "Interview Date"
                        ? "date"
                        : key === "Phone"
                        ? "tel"
                        : key === "Interview Time"
                        ? "time"
                        : "text"
                    }
                  ></input>
                )}
              </div>
            ))}
        </div>
        <div className="flex flex-col">
          <button className="mx-auto text-white bg-secondary p-2 rounded-md mt-[-30px] mb-4 hover:bg-galv-orange transition-all duration-150 ease-in-out hover:scale-105">
            Schedule an Interview
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentInfo;
