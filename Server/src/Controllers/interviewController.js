import { db } from "../Database/database.js";
import { allInterviews, interview } from "./queries.js";

export const getAllInterviews = async (req, res) => {
  try {
    const results = await db.query(allInterviews);
    res.status(200).json(results.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error Fetching Interviews" });
  }
};

export const getInterview = async (req, res) => {
  try {
    const id = req.params.id;
    const results = await db.query(interview, [id]);
    res.status(200).json(results.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error Fetching Interview Data" });
  }
};
