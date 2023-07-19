import React, { useEffect, useState, useRef } from "react";
import { MdEditDocument, MdEditOff, MdAddCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import PieChart from "./PieChart.jsx";
import LineGraph from "./LineGraph.jsx";
import axios from "axios";

const StudentInfo = ({ students, studentInfo, filteredStudents }) => {
  const [editMode, setEditMode] = useState(false);
  const [updatedStudent, setUpdatedStudent] = useState({});
  const [loading, setLoading] = useState(true);
  const [transition, setTransition] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(0);
  const [addStudent, setAddStudent] = useState(false);
  const [newStudent, setNewStudent] = useState({});
  const [hoveredIcon, setHoveredIcon] = useState("");

  const editRef = useRef(null);
  const addRef = useRef(null);

  const navigate = useNavigate();

  const name = JSON.parse(localStorage.getItem("name"));

  const handleMouseEnterIcon = (ref) => {
    setShowTooltip(true);
    if (ref === editRef.current) {
      setHoveredIcon("edit");
    }
    if (ref === addRef) {
      setHoveredIcon("add");
    }
  };

  const handleMouseLeaveIcon = (e) => {
    setShowTooltip(false);
    setHoveredIcon("");
  };

  const toggleEditMode = () => {
    setTransition(true);
    setTimeout(() => {
      setEditMode(!editMode);
      setTransition(false);
    }, 500);
  };

  const toggleAddStudent = () => {
    setTransition(true);
    setTimeout(() => {
      setAddStudent(!addStudent);
      setTransition(false);
    }, 500);
  };

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
    const cleaned = phoneNumber.replace(/\D/g, "");
    const formattedPhoneNumber = cleaned.replace(
      /(\d{1})(\d{3})(\d{3})(\d{4})/,
      "$1($2)$3-$4"
    );
    return formattedPhoneNumber;
  };

  const handleChange = (index) => {
    setTransition(true);
    setTimeout(() => {
      const currentIndex = index;
      setCurrentStudent(currentIndex);
      setTransition(false);
    }, 500);
  };

  useEffect(() => {
    setLoading(students.length === 0);
    setTransition(true);

    setTimeout(() => {
      setTransition(false);
    }, 500);
  }, [students.length]);

  const filteredListStudents = students.filter(
    (student) => student.i_first_name === name.firstName
  );

  const button = (label) => {
    return (
      <button
        className={`mx-auto text-white bg-secondary p-2 rounded-md mt-[-30px] mb-4 hover:bg-galv-orange transition-all duration-150 ease-in-out hover:scale-105 ${
          transition ? "opacity-0" : "opacity-100"
        }}`}
        onClick={() => {
          handleButtonClick();
        }}
      >
        {label}
      </button>
    );
  };

  const patchStudent = () => {
    axios.patch(`/api/student/${student.s_id}`, updatedStudent).then((res) => {
      console.log(res);
    });
  };

  const startInterview = () => {
    navigate(`/interview/${student.s_id}`);
  };

  const addNewStudent = () => {
    axios.post("/api/student", newStudent).then((res) => {
      console.log(res);
    });
  };

  const handleButtonClick = () => {
    editMode ? patchStudent() : addStudent ? addNewStudent() : startInterview();
  };

  let student = filteredListStudents[currentStudent];

  console.log(updatedStudent);

  const renderField = (label, value, inputProps) => {
    const isEditable = editMode && inputProps;
    const fieldValue = isEditable ? updatedStudent[label] || value : value;
    const isAddStudent = addStudent && inputProps;

    const labelReplacements = {
      "First Name": "firstName",
      "Last Name": "lastName",
      Email: "email",
      Phone: "phone",
    };

    const modifiedLabel = labelReplacements[label];

    return (
      <div
        className={`text-white text-xl font-bold p-2 mr-12 w-full transition-all duration-300 ease-in-out`}
      >
        {label}:{" "}
        {isEditable ? (
          <div
            className={`${
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
                  [modifiedLabel]: e.target.value,
                })
              }
              {...inputProps}
            />
          </div>
        ) : isAddStudent ? (
          <div>
            <input
              type="text"
              className={`text-white bg-secondary p-2 rounded-md shadow-md shadow-black  focus:ring-accent focus:ring-2 focus:outline-none text-lg tracking-wider ml-2 font-normal m-2`}
              placeholder={label}
              onChange={(e) =>
                setNewStudent({
                  ...newStudent,
                  [modifiedLabel]: e.target.value,
                })
              }
              {...inputProps}
            />
          </div>
        ) : (
          <div
            className={`text-accent font-normal py-[5px] ${
              transition
                ? "opacity-0 translate-x-[50px]"
                : "opacity-100 border-b-[1px]"
            } transition-all duration-300 ease-in-out`}
          >
            {fieldValue}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col justify-between sm:w-[400px] custom:w-[900px] mx-auto my-20 ml-4">
      <div className="p-2">
        <PieChart
          students={students}
          studentInfo={studentInfo}
          filteredStudents={filteredStudents}
        />
      </div>
      <div className="p-2">
        <LineGraph
          students={students}
          studentInfo={studentInfo}
          filteredStudents={filteredStudents}
        />
      </div>
      <div className="mt-10 mb-2 flex flex-col">
        <div className="bg-bg rounded-lg m-2 p-2 shadow-lg shadow-black">
          <div className="text-white text-2xl text-center">
            Student:{" "}
            {!loading && (
              <select
                value={currentStudent}
                onChange={(e) => handleChange(parseInt(e.target.value))}
                className="text-white/70 bg-bg rounded-md p-2 shadow-md shadow-black focus:ring-1 focus:ring-accent text-lg tracking-wider ml-2 mt-2 cursor-pointer transition-all duration-300 ease-in-out"
              >
                {filteredListStudents.map((student, index) => (
                  <option
                    key={index}
                    value={index}
                    className="bg-secondary text-accent py-4 focus:text-accent cursor-pointer"
                  >
                    {`${student.s_first_name} ${student.s_last_name}`}
                  </option>
                ))}
              </select>
            )}
          </div>
          {editMode ? (
            <div className="flex-row flex justify-end">
              <MdEditOff
                className="relative text-white float-right cursor-pointer text-xl m-2"
                onClick={toggleEditMode}
                onMouseEnter={handleMouseEnterIcon}
                onMouseLeave={handleMouseLeaveIcon}
              />
            </div>
          ) : (
            <div className="flex-row flex justify-end">
              <div ref={editRef}>
                <MdEditDocument
                  className="relative text-white float-right cursor-pointer text-xl m-2"
                  onClick={toggleEditMode}
                  onMouseEnter={() => handleMouseEnterIcon(editRef.current)}
                  onMouseLeave={handleMouseLeaveIcon}
                />
              </div>
              <div ref={addRef}>
                <MdAddCircle
                  className="relative text-white float-right cursor-pointer text-xl m-2"
                  onClick={toggleAddStudent}
                  onMouseEnter={() => handleMouseEnterIcon(addRef.current)}
                  onMouseLeave={handleMouseLeaveIcon}
                />
              </div>
            </div>
          )}

          {showTooltip && (
            <div
              style={{
                right: "0%",
                transform: "translateX(-50%)",
              }}
              className="absolute bg-white p-2 rounded-lg shadow-lg shadow-black"
            >
              {hoveredIcon === "edit" ? (
                <div className="text-black text-center">
                  {editMode ? "Exit Edit Mode" : "Edit Student"}
                </div>
              ) : (
                <div className="text-black text-center">
                  {addStudent ? "Exit Add Student" : "Add Student"}
                </div>
              )}
            </div>
          )}

          <div className="mt-4 mb-12 p-6">
            {!loading && (
              <div className="grid grid-cols-1 custom:grid-cols-2 gap-4">
                {renderField("First Name", student.s_first_name, {
                  type: "text",
                })}
                {renderField("Last Name", student.s_last_name, {
                  type: "text",
                })}
                {renderField("Email", student.s_email, {
                  type: "email",
                })}
                {renderField("Phone", formatPhoneNumber(student.s_phone), {
                  type: "tel",
                })}
              </div>
            )}
          </div>
          <div className="flex flex-col">
            {editMode
              ? button("Save")
              : addStudent
              ? button("Add Student")
              : button("Start Interview")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentInfo;
