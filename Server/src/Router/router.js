import { Router } from "express";
import { logUserIn } from "../Controllers/logController.js";
import {
  addInterview,
  getAllInterviews,
  getInterview,
  updateInterviewData,
} from "../Controllers/interviewController.js";
import { getAllQuestions } from "../Controllers/questionController.js";
import {
  getAllStudents,
  getStudentByID,
  addStudent,
  removeStudent,
  updateStudent,
  studentsAndInterviewers,
} from "../Controllers/studentController.js";
import { runCode } from "../Controllers/codeController.js";

export const router = Router();

router.get("/students", getAllStudents); // list of all students

router.get("/student/:id", getStudentByID); // fetch single student

router.get("/students/interviewers", studentsAndInterviewers); // list of students joined with interviewers

router.post("/student", addStudent); // post a new student to db

router.patch("/student/:id", updateStudent); // patch student data

router.delete("/student/:id", removeStudent); // deletes student

router.get("/interview/:id", getInterview); // list of interviews by student id

router.get("/questions", getAllQuestions); // list of questions from the db

router.post("/interview", addInterview); // adds interview

router.get("/interviews", getAllInterviews); // list of all interviews

router.patch("/interview/:id", updateInterviewData); // update interview notes and result

router.post("/run", runCode); // runs client side code and returns output
/**
 * LOGIN ROUTE
 */
router.post("/login", logUserIn); // logs interviewers in and returns a token and interviewer data
