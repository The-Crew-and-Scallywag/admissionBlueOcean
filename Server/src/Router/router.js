import { Router } from "express";
import {
  getAllStudents,
  getStudentByID,
  postStudentResults,
} from "../Controllers/interviewerController.js";
import { logUserIn } from "../Controllers/logController.js";
import {
  getAllInterviews,
  getInterview,
} from "../Controllers/interviewController.js";

export const router = Router();

router.get("/students", getAllStudents);
router.get("/interview/:id", getInterview);
router.get("/student/:id", getStudentByID);
router.post("/results/:id", postStudentResults);
router.get("/notes/:id", postStudentResults);
router.get("/interviews", getAllInterviews);

/**
 * LOGIN ROUTE
 */
router.post("/login", logUserIn);
