import React, { useEffect, useState } from "react";
import { MdEditDocument, MdEditOff } from "react-icons/md";

const StudentInfo = ({ students, currentStudent, setCurrentStudent }) => {
  const [editMode, setEditMode] = useState(false);
  const [updatedStudent, setUpdatedStudent] = useState({});
  const [loading, setLoading] = useState(true);
  const [transition, setTransition] = useState(false);

  const toggleEditMode = () => {
    setTransition(true);
    setTimeout(() => {
      setEditMode(!editMode);
      setTransition(false);
    }, 500);
  };
  console.log(students);

  let student = students[currentStudent];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  const formatTime = (timeString) => {
    const time = new Date(timeString);
    return time.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
    });
  };

  const formatPhoneNumber = (phoneNumber) => {
    const cleaned = String(phoneNumber).replace(/\D/g, "");
    const formattedPhoneNumber = cleaned.replace(
      /(\d{1})(\d{3})(\d{4})/,
      "$1($2)-$3"
    );
    return formattedPhoneNumber;
  };

  const handleChange = (index) => {
    setTransition(true);
    setTimeout(() => {
      setCurrentStudent(index);
      setTransition(false);
    }, 500);
  };

  useEffect(() => {
    setLoading(students.length === 0);
    setTransition(true);
    console.log("transitioning");
    setTimeout(() => {
      setTransition(false);
      console.log("done transitioning");
    }, 500);
  }, [students]);

  const renderField = (label, value, inputProps) => {
    const isEditable = editMode && inputProps;
    const fieldValue = isEditable ? updatedStudent[label] || value : value;
    return (
      <div
        className={`text-white text-xl font-bold p-2 mr-12 transition-all duration-300 ease-in-out`}
      >
        {label}:{" "}
        {!isEditable ? (
          <div
            className={`text-accent font-normal py-[5px] w-full ${
              transition
                ? "opacity-0 translate-x-[50px]"
                : "opacity-100 border-b-[1px]"
            } transition-all duration-300 ease-in-out`}
          >
            {fieldValue}
          </div>
        ) : (
          <div
            className={` ${
              transition ? "opacity-0 translate-x-[50px]" : "opacity-100"
            } transition-all duration-300 ease-in-out`}
          >
            <input
              type="text"
              className={`text-white bg-secondary p-2 rounded-md shadow-md shadow-black  focus:ring-accent focus:ring-2 focus:outline-none text-lg tracking-wider ml-2 font-normal m-2`}
              placeholder={fieldValue}
              onChange={(e) =>
                setUpdatedStudent({
                  ...updatedStudent,
                  [label]: e.target.value,
                })
              }
              {...inputProps}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 w-[700px] mx-auto my-20">
      <div className="text-white text-2xl text-center">
        Student:{" "}
        {!loading && (
          <select
            value={currentStudent}
            onChange={(e) => handleChange(parseInt(e.target.selectedIndex))}
            className="text-galv-orange bg-bg rounded-md p-1 shadow-md shadow-black focus:ring-1 focus:ring-accent text-lg tracking-wider ml-2 cursor-pointer transition-all duration-300 ease-in-out"
          >
            {students.map((student, index) => (
              <option
                key={student.id}
                value={index}
                className="bg-secondary text-accent py-4 focus:text-accent cursor-pointer"
              >
                {`${student.first_name} ${student.last_name}`}
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
            <div className="grid grid-cols-2 gap-4">
              {renderField("First Name", student.first_name, { type: "text" })}
              {renderField("Last Name", student.last_name, { type: "text" })}
              {renderField("Email", student.email, { type: "email" })}
              {renderField("Phone", formatPhoneNumber(student.phone), {
                type: "tel",
              })}
              {student.interview_date &&
                renderField(
                  "Interview Date",
                  formatDate(student.interview_date),
                  {
                    type: "date",
                  }
                )}
              {student.interview_time &&
                renderField(
                  "Interview Time",
                  formatTime(student.interview_time),
                  {
                    type: "time",
                  }
                )}
            </div>
          )}
        </div>
        <div className="flex flex-col">
          {editMode ? (
            <button
              className={`mx-auto text-white bg-secondary p-2 rounded-md mt-[-30px] mb-4 hover:bg-galv-orange transition-all duration-150 ease-in-out hover:scale-105 ${
                transition ? "opacity-0" : "opacity-100"
              }}`}
            >
              Save Changes
            </button>
          ) : (
            <button
              className={`mx-auto text-white bg-secondary p-2 rounded-md mt-[-30px] mb-4 hover:bg-galv-orange transition-all duration-150 ease-in-out hover:scale-105 ${
                transition ? "opacity-0" : "opacity-100"
              }`}
            >
              Start an Interview
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentInfo;
