import React, { useEffect, useState } from "react";
import axios from "axios";
import { BsChevronBarLeft, BsChevronBarRight } from "react-icons/bs";

const StudentList = ({ students, currentStudent, setCurrentStudent }) => {
  const [studentInfo, setStudentInfo] = useState([]);
  const [results, setResults] = useState("");
  const [transition, setTransition] = useState(false);
  const [listTransition, setListTransition] = useState(true);

  useEffect(() => {
    const getInterviews = async () => {
      try {
        const res = await axios.get(`/api/interviews/`);
        const data = res.data;
        setStudentInfo(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    getInterviews();
  }, [students]);

  const handleOpenview = (index) => {
    transition ? setTransition(false) : "";
    if (results === "") {
      results === index ? handleCloseView() : setResults(index);
      setListTransition(false);
      setTimeout(() => {
        setTransition(true);
      }, 300);
    } else {
      setListTransition(false);
      setTimeout(() => {
        setResults(index);
        setTransition(true);
      }, 300);
    }
  };

  const handleCloseView = () => {
    setTransition(false);
    setTimeout(() => {
      setListTransition(true);
      setTimeout(() => {
        setResults("");
        setTransition(true);
      }, 300);
    }, 300);
  };

  const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="flex md:flex-row flex-col">
      <div
        className={`my-8 h-full overflow-auto overflow-x-hidden flex flex-col transition-all duration-300 ease ${
          !listTransition ? "w-full" : "md:w-[1000%]"
        }`}
      >
        <ul>
          {studentInfo.map((student, index) => {
            return (
              <li
                key={index}
                className="grid grid-cols-3 grid-flow-row  bg-bg p-4 rounded-lg shadow-lg shadow-black my-4"
              >
                <div className="text-left">
                  <div className="text-lg font-bold">
                    {student.s_first_name} {student.s_last_name}
                  </div>
                  <div className="text-accent italic">
                    {student.results ? "Passed" : "Failed"}
                  </div>
                </div>

                <div className="text-white/50 flex justify-center">
                  {formatDate(student.interview_date)}
                </div>

                <div className="flex flex-row justify-end">
                  <button
                    className="bg-accent text-white rounded-md p-2 shadow-md shadow-black text-lg tracking-wider hover:scale-105 ml-2 cursor-pointer transition-all duration-300 ease-in-out"
                    onClick={() => handleOpenview(index)}
                  >
                    View
                  </button>
                  {!listTransition && (
                    <BsChevronBarRight className="relative text-white text-2xl ml-2 top-2" />
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div
        className={`w-full h-full overflow-auto flex flex-col my-8 ${
          studentInfo[results] ? "" : "hidden"
        }`}
      >
        {!listTransition ? (
          <div
            className={`flex flex-col justify-between items-end w-full relative transition-all duration-300 ease ${
              transition ? "" : "-translate-x-[500px] -z-10"
            }`}
          >
            <div className="flex flex-row justify-start items-center bg-bg p-4 pl-14 rounded-lg shadow-lg shadow-black my-4 w-[90%]">
              <div
                onClick={handleCloseView}
                className=" relative text-2xl animate-pulse mr-2 ml-[-20px] cursor-pointer"
              >
                <BsChevronBarLeft />
              </div>
              <div className="text-left p-6 border-l-[1px] border-galv-orange">
                <h2 className="text-2xl font-bold tracking-wide pb-3">
                  Results:
                </h2>
                <div className="text-accent italic pb-4">
                  <span className="text-white not-italic">
                    Overall Decision:
                  </span>{" "}
                  {studentInfo[results].results ? "Passed" : "Failed"}
                </div>
                <div className="text-white/70 tracking-wide text-lg flex flex-col">
                  <h2 className="text-xl text-accent tracking-wide text-left py-2">
                    Notes:
                  </h2>
                  <p>{studentInfo[results].notes}</p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default StudentList;
