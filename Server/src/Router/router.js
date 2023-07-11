import { Router } from "express";
import {
  getAllStudents,
  getStudentByID,
} from "../Controllers/interviewerController.js";
import { logUserIn } from "../Controllers/logController.js";
import {
  getAllInterviews,
  getInterview,
  updateInterviewData,
} from "../Controllers/interviewController.js";

export const router = Router();

router.get("/students", getAllStudents); // list of all students

router.get("/interview/:id", getInterview); // list of interviews by student id

router.patch("/interview/:id", updateInterviewData); // update interview notes and result

router.get("/student/:id", getStudentByID); // fetch single student

router.get("/interviews", getAllInterviews); // list of all interviews

/**
 * LOGIN ROUTE
 */
router.post("/login", logUserIn);
