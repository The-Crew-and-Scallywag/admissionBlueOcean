import { db } from "../Database/database.js";
import { allStudents, interiewersById, student } from "./queries.js";

// fetches interviewers by id
export const getInterviewerById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const results = await db.query(interiewersById, [id]);
    res.status(200).json(results.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error Fetching Interviewer" });
  }
};
