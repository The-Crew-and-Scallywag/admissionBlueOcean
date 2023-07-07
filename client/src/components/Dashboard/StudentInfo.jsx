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
              <div className="text-white text-xl font-bold">
                First Name:{" "}
                {!editMode ? (
                  <span className="text-accent text-xl font-normal">
                    {student.first_name}
                  </span>
                ) : (
                  <input
                    type="text"
                    className="text-white bg-secondary rounded-md p-1 shadow-md shadow-black focus:border-accent text-lg tracking-wider ml-2 font-normal"
                    placeholder={student.first_name}
                    onChange={(e) =>
                      setUpdatedStudent({
                        ...updatedStudent,
                        first_name: e.target.value,
                      })
                    }
                  />
                )}
              </div>
              <div className="text-white text-xl font-bold">
                Last Name:{" "}
                {!editMode ? (
                  <span className="text-accent text-xl font-normal">
                    {student.last_name}
                  </span>
                ) : (
                  <input
                    type="text"
                    className="text-white bg-secondary rounded-md p-1 shadow-md shadow-black focus:border-accent text-lg tracking-wider ml-2 font-normal"
                    placeholder={student.last_name}
                    onChange={(e) =>
                      setUpdatedStudent({
                        ...updatedStudent,
                        last_name: e.target.value,
                      })
                    }
                  />
                )}
              </div>
              <div className="text-white text-xl font-bold">
                Email:{" "}
                {!editMode ? (
                  <span className="text-accent text-xl font-normal">
                    {student.email}
                  </span>
                ) : (
                  <input
                    type="email"
                    className="text-white bg-secondary rounded-md p-1 shadow-md shadow-black focus:border-accent text-lg tracking-wider ml-2 font-normal"
                    placeholder={student.email}
                    onChange={(e) =>
                      setUpdatedStudent({
                        ...updatedStudent,
                        email: e.target.value,
                      })
                    }
                  />
                )}
              </div>
              <div className="text-white text-xl font-bold">
                Phone:{" "}
                {!editMode ? (
                  <span className="text-accent text-xl font-normal">
                    {student.phone}
                  </span>
                ) : (
                  <input
                    type="tel"
                    className="text-white bg-secondary rounded-md p-1 shadow-md shadow-black focus:border-accent text-lg tracking-wider ml-2 font-normal"
                    placeholder={student.phone}
                    onChange={(e) =>
                      setUpdatedStudent({
                        ...updatedStudent,
                        phone: e.target.value,
                      })
                    }
                  />
                )}
              </div>
              {student.interview_date && (
                <div className="text-white text-xl font-bold col-span-2">
                  Interview Date:{" "}
                  {!editMode ? (
                    <span className="text-accent text-xl font-normal">
                      {formatDateTime(student.interview_date)}
                    </span>
                  ) : (
                    <input
                      type="datetime-local"
                      className="text-white bg-secondary rounded-md p-1 shadow-md shadow-black focus:border-accent text-lg tracking-wider ml-2 font-normal"
                      placeholder={formatDateTime(student.interview_date)}
                      onChange={(e) =>
                        setUpdatedStudent({
                          ...updatedStudent,
                          interview_date: e.target.value,
                        })
                      }
                    />
                  )}
                </div>
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
