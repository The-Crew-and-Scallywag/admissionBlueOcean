import { db } from "../Database/database.js";
import { allStudents, postResult, student } from "./queries.js";

// fetches all students
export const getAllStudents = async (req, res) => {
  try {
    const results = await db.query(allStudents);
    console.log(results.rows[0].prev_attempt);
    res.status(200).json(results.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "ERROR Fetching Students" });
  }
};

// fetches students by id
export const getStudentByID = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const results = await db.query(student, [id]);

    res.status(200).json(results.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Student Not Found" });
  }
};

// post interview results to db
export const postStudentResults = async (req, res) => {
  try {
    let { result, notes } = req.body;
    const id = Number(req.params.id); // will get from token later
    if (result.toLowerCase() == "true") {
      result = true;
    } else if (result.toLowerCase() == "false") {
      result = false;
    } else {
      return res
        .status(400)
        .json({ message: "Result should be a boolean value" });
    }

    const results = await db.query(postResult, [notes, result, id]);

    res.status(200).json(results.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "ERROR Posting Result" });
  }
};

// get interviewers notes from a specific interview
export const addResults = async (req, res) => {
  try {
    const { notes, result } = req.body;
    const id = Number(req.params.id); // will get from token later

    const results = await db.query(postResult, [notes, result, id]);

    res.status(200).json(results.rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "ERROR Sending Results" });
  }
};
