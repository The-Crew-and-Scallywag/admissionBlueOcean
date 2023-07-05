import {Router} from "express"
import { getAllStudents, postStudentResults } from "../Controllers/interviewerController.js"

export const router = Router()

router.get('/students', getAllStudents)
router.post('/results/:id', postStudentResults)
