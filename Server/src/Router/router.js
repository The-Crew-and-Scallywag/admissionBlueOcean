import { Router } from "express";
import { logUserIn } from "../Controllers/logController.js";
import {
  addInterview,
  addQuestionNote,
  addSummaryNotes,
  getAllInterviews,
  getInterview,
  updateResult,
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
import { protectRoutes } from "../Authorization/auth.js";

export const router = Router();

/**
 *          STUDENT ROUTES
 */

router.get("/students", getAllStudents); // list of all students

router.get("/student/:id", getStudentByID); // fetch single student

router.get("/students/interviewers", studentsAndInterviewers); // list of students joined with interviewers

router.post("/student", addStudent); // post a new student to db

router.patch("/student/:id", updateStudent); // patch student data

router.delete("/student/:id", removeStudent); // deletes student

/**
 *          INTERVIEW ROUTES
 */

router.get("/interview/:id", getInterview); // list of interviews by student id

router.post("/interview", addInterview); // adds interview

router.get("/interviews", getAllInterviews); // list of all interviews

router.get("/questions", getAllQuestions); // list of questions from the db

router.patch("/interview/notes", addSummaryNotes); // add final notes to students interview

router.patch("/interview/question/notes", addQuestionNote); // add notes to each question

router.patch("/interview/result", updateResult); // add final result of interview

router.post("/run", runCode); // runs client side code and returns output

/**
 *          LOGIN ROUTE
 */

router.post("/login", logUserIn); // logs interviewers in and returns a token and interviewer data
