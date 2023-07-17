import React, { useEffect, useState } from "react";
import StudentList from "./StudentList.jsx";

const Upcoming = ({
  students,
  currentStudent,
  setCurrentStudent,
  studentInfo,
  filteredStudents,
  setFilteredStudents,
}) => {
  const [selected, setSelected] = useState("All");
  const [page, setPage] = useState(0);
  const [results, setResults] = useState(null);
  const [transition, setTransition] = useState(false);
  const [dropDownTransition, setDropDownTransition] = useState(true);
  const [listTransition, setListTransition] = useState(true);
  const [lock, setLock] = useState(false);

  const [dropDown, setDropDown] = useState(false);

  const currentDate = new Date();

  let closestDate = Infinity;
  let closestStudent = null;

  filteredStudents.forEach((student) => {
    const interviewDate = new Date(student.interview_date);
    const timeDiff = interviewDate - currentDate;

    if (timeDiff > 0 && timeDiff < closestDate) {
      closestDate = timeDiff;
      closestStudent = student;
    }
  });

  let upcomingInterview = null;
  if (closestStudent !== null) {
    const { s_first_name, s_last_name, interview_date } = closestStudent;
    const formattedDate = new Date(interview_date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    upcomingInterview = (
      <>
        <div className="text-2xl font-bold tracking-wide my-4 text-left">
          Name:{" "}
          <span className="text-italic font-normal text-accent">
            {s_first_name} {s_last_name}
          </span>
        </div>
        <div className="text-lg font-bold tracking-wide my-4 text-left text-white/70">
          Interview Date:{" "}
          <span className="text-italic font-normal text-accent">
            {formattedDate}
          </span>
        </div>
      </>
    );
  } else {
    upcomingInterview = <div>No upcoming interviews</div>;
  }

  const selectedStudents = selected === "All" ? studentInfo : filteredStudents;
  const filteredSelectedStudents = selectedStudents.filter((student) => {
    const interviewDate = new Date(student.interview_date);
    return interviewDate <= currentDate;
  });

  const chunkSize = 8;

  const chunkedStudents = filteredSelectedStudents.reduce(
    (resultArray, item, index) => {
      const chunkIndex = Math.floor(index / chunkSize);

      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = [];
      }

      resultArray[chunkIndex].push(item);

      return resultArray;
    },
    []
  );

  const handleDropDownOpen = () => {
    if (lock) return;
    setLock(true);
    setDropDownTransition(false);
    setTimeout(() => {
      setDropDown(true);
      setDropDownTransition(true);
      setLock(false);
    }, 300);
  };

  const handleDropDownClose = () => {
    if (lock) return;
    setLock(true);
    setDropDownTransition(false);
    setTimeout(() => {
      setDropDown(false);
      setDropDownTransition(true);
      setLock(false);
    }, 300);
  };

  const handleOpenview = (index) => {
    if (lock) return;
    transition ? setTransition(false) : "";
    setLock(true);
    if (!results) {
      results === index ? handleCloseView() : setResults(index);
      setListTransition(false);
      setTimeout(() => {
        setTransition(true);
        setTimeout(() => {
          handleDropDownOpen();
        }, 300);
        setLock(false);
      }, 300);
    } else {
      setListTransition(false);
      setTimeout(() => {
        setResults(index);
        setTransition(true);
        setLock(false);
      }, 300);
    }
  };

  const handleCloseView = () => {
    if (lock) return;
    setLock(true);
    setTransition(false);
    handleDropDownClose();
    setTimeout(() => {
      setListTransition(true);
      setTimeout(() => {
        setResults("");
        setTransition(true);
        setLock(false);
      }, 300);
    }, 300);
  };

  const handleSelect = (e) => {
    let selected = e.target.value;
    if (results !== "") {
      handleCloseView();
      setTimeout(() => {
        setPage(0);
        setSelected(selected);
      }, 900);
    } else {
      setPage(0);
      setSelected(selected);
    }
  };

  const handlePageChange = (index) => {
    if (results !== "") {
      handleCloseView();
      setTimeout(() => {
        setPage(index);
      }, 900);
    } else {
      setPage(index);
    }
  };

  return (
    <div className="flex-col mt-12 mx-auto text-lg w-full flex">
      <h1 className="text-2xl font-bold tracking-wide my-4 text-left">
        Upcoming:
      </h1>
      <div className="flex flex-row justify-start bg-bg p-4 rounded-lg shadow-lg shadow-black w-full">
        <div>{upcomingInterview}</div>
      </div>
      <div className="w-full">
        <div className="p-4 bg-bg/70 rounded-lg my-4 py-0 shadow-lg shadow-black">
          <div className="flex flex-row justify-between">
            <h1 className="text-2xl font-bold tracking-wide my-4 text-left">
              Recent Interviews:
              <select
                value={selected}
                onChange={handleSelect}
                className="text-md m-2 rounded-md bg-bg/70 text-white/50 p-1 shadow-md shadow-black focus:ring-1 focus:ring-accent text-lg tracking-wider ml-2 cursor-pointer transition-all duration-300 ease-in-out"
              >
                <option value="All">All</option>
                <option value="Assigned">Assigned</option>
              </select>
            </h1>
            <div className="p-4">
              {chunkedStudents.map((_, index) => {
                return (
                  <button
                    key={index}
                    className={`${
                      page === index
                        ? "bg-accent text-white"
                        : "bg-bg/70 text-white/50"
                    } rounded-md p-2 shadow-md shadow-black text-lg tracking-wider hover:scale-105 ml-2 cursor-pointer transition-all duration-300 ease-in-out`}
                    onClick={() => {
                      lock ? "" : handlePageChange(index);
                    }}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
          </div>
          <StudentList
            studentInfo={studentInfo}
            filteredStudents={filteredStudents}
            setFilteredStudents={setFilteredStudents}
            selected={selected}
            page={page}
            chunkedStudents={chunkedStudents}
            results={results}
            setResults={setResults}
            handleCloseView={handleCloseView}
            transition={transition}
            setTransition={setTransition}
            handleDropDownOpen={handleDropDownOpen}
            handleDropDownClose={handleDropDownClose}
            dropDownTransition={dropDownTransition}
            setDropDownTransition={setDropDownTransition}
            listTransition={listTransition}
            setListTransition={setListTransition}
            dropDown={dropDown}
            setDropDown={setDropDown}
            handleOpenview={handleOpenview}
            lock={lock}
          />
        </div>
      </div>
    </div>
  );
};

export default Upcoming;
