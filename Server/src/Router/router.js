import { Router } from "express";
import {
  getAllStudents,
  getStudentByID,
} from "../Controllers/interviewerController.js";
import { logUserIn } from "../Controllers/logController.js";
import {
  addInterview,
  getAllInterviews,
  getInterview,
  updateInterviewData,
} from "../Controllers/interviewController.js";

export const router = Router();

router.get("/students", getAllStudents); // list of all students

router.get("/student/:id", getStudentByID); // fetch single student

router.get("/interview/:id", getInterview); // list of interviews by student id

router.post("/interview", addInterview); // adds interview

router.get("/interviews", getAllInterviews); // list of all interviews

router.patch("/interview/:id", updateInterviewData); // update interview notes and result
/**
 * LOGIN ROUTE
 */
router.post("/login", logUserIn);
