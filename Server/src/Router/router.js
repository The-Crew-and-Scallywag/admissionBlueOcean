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
} from "../Controllers/studentController.js";

export const router = Router();

router.get("/students", getAllStudents); // list of all students

router.get("/student/:id", getStudentByID); // fetch single student

router.post("/student", addStudent); // post a new student to db

router.patch("/student/:id", updateStudent); // patch student data

router.delete("/student/:id", removeStudent);

router.get("/interview/:id", getInterview); // list of interviews by student id

router.get("/questions", getAllQuestions); // list of questions from the db

router.post("/interview", addInterview); // adds interview

router.get("/interviews", getAllInterviews); // list of all interviews

router.patch("/interview/:id", updateInterviewData); // update interview notes and result
/**
 * LOGIN ROUTE
 */
router.post("/login", logUserIn);
