import { Router } from "express";
import {
  getAllStudents,
  getStudentByID,
  postStudentResults,
} from "../Controllers/interviewerController.js";
import { logUserIn } from "../Controllers/logController.js";

export const router = Router();

router.get("/students", getAllStudents);
router.get("/student/:id", getStudentByID);
router.post("/results/:id", postStudentResults);
router.get("/notes/:id", postStudentResults);

/**
 * LOGIN ROUTE
 */
router.post("/login", logUserIn);
