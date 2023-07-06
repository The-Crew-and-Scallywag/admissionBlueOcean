import { Router } from "express";
import {
  getAllStudents,
  getInterviewNotes,
  getStudentByID,
  postStudentResults,
} from "../Controllers/interviewerController.js";

export const router = Router();

router.get("/students", getAllStudents);
router.get("/student/:id", getStudentByID);
router.post("/results/:id", postStudentResults);
router.get("/notes/:id", getInterviewNotes);
