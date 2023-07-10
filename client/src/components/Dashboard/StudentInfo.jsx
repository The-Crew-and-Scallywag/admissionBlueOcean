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
    return dateTime.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  useEffect(() => {
    setLoading(students.length === 0);
  }, [students]);

  const renderField = (label, value, inputProps) => {
    const isEditable = editMode && inputProps;
    const fieldValue = isEditable ? updatedStudent[label] || value : value;
    return (
      <div
        className={`text-white text-xl font-bold ${
          label === "Interview Date" && "col-span-2"
        }`}
      >
        {label}:{" "}
        {!isEditable ? (
          <span className="text-accent font-normal">{fieldValue}</span>
        ) : (
          <input
            type="text"
            className={`text-white bg-secondary rounded-md p-1 shadow-md shadow-black focus:border-accent text-lg tracking-wider ml-2 font-normal`}
            placeholder={fieldValue}
            onChange={(e) =>
              setUpdatedStudent({
                ...updatedStudent,
                [label]: e.target.value,
              })
            }
            {...inputProps}
          />
        )}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 w-[700px] mx-auto my-20">
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
            <div className="grid grid-cols-2 gap-4 justify-items-start">
              {renderField("First Name", student.first_name, { type: "text" })}
              {renderField("Last Name", student.last_name, { type: "text" })}
              {renderField("Email", student.email, { type: "email" })}
              {renderField("Phone", student.phone, { type: "tel" })}
              {student.interview_date &&
                renderField(
                  "Interview Date",
                  formatDateTime(student.interview_date),
                  {
                    type: "datetime-local",
                  }
                )}
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <button className="mx-auto text-white bg-secondary p-2 rounded-md mt-[-30px] mb-4 hover:bg-galv-orange transition-all duration-150 ease-in-out hover:scale-105">
            Start an Interview
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentInfo;
