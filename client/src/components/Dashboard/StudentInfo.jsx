import React, { useEffect, useState } from "react";
import { MdEditDocument, MdEditOff } from "react-icons/md";

const StudentInfo = ({ students, currentStudent, changeCurrentStudent }) => {
  const [editMode, setEditMode] = useState(false);
  const [updatedStudent, setUpdatedStudent] = useState({});
  const [loading, setLoading] = useState(true);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const student = students[currentStudent];

  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const formattedDate = dateTime.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const formattedTime = dateTime.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return `${formattedDate} at ${formattedTime}`;
  };

  useEffect(() => {
    if (students.length > 0) {
      setLoading(false);
    }
  }, [students]);

  return (
    <div className="grid grid-cols-1 w-[650px] mx-auto my-20">
      <div className="text-white text-2xl text-center">
        Student:{" "}
        {!loading && (
          <select className="text-galv-orange bg-bg rounded-md p-1 shadow-md shadow-black focus:border-accent text-lg tracking-wider ml-2">
            {students.map((student) => (
              <option
                key={student.id}
                value={student.id}
                className="bg-bg/80 backdrop-blur-lg text-white hover:bg-bg/60 hover:backdrop-blur-lg transition-all duration-150 ease-in-out"
              >
                {student.first_name} {student.last_name}
              </option>
            ))}
          </select>
        )}
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
        <div className="mt-4 mb-12 p-6">
          {!loading && (
            <div className="grid grid-cols-4 gap-4">
              <div className="text-xl font-bold text-white">Name:</div>
              <div className="text-xl text-accent">{`${student.first_name} ${student.last_name}`}</div>
              <div className="text-xl font-bold text-white">Email:</div>
              <div className="text-xl text-accent">{student.email}</div>
              <div className="text-xl font-bold text-white">Phone:</div>
              <div className="text-xl text-accent">{student.phone}</div>
              <div className="text-xl font-bold text-white">
                Interview Date:
              </div>
              <div className="text-xl text-accent">
                {formatDateTime(student.interview_date)}
              </div>
            </div>
          )}
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
