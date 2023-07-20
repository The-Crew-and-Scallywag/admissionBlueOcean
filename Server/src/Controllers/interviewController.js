import { tokenDecoder } from "../Authorization/auth.js";
import { db } from "../Database/database.js";
import {
  allInterviews,
  interviewsByStudents,
  patchInterviewData,
  patchNote,
  patchQuestionNote,
  patchResult,
  postInterview,
} from "./queries.js";

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
    const results = await db.query(interviewsByStudents, [id]);
    res.status(200).json(results.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error Fetching Interview Data" });
  }
};

export const updateResult = async (req, res) => {
  try {
    let { result, interviewId } = req.body;
    Number(interviewId);

    if (result.toLowerCase() === "pass") {
      result = "true";
    } else if (result.toLowerCase() === "fail") {
      result = "false";
    } else {
      return res
        .status(400)
        .json({ message: "Result should be 'pass' or 'fail'" });
    }

    const results = await db.query(patchResult, [result, interviewId]);

    res.status(200).json(results.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating Interview Data" });
  }
};

export const addInterview = async (req, res) => {
  try {
    const { studentId, interviewerId, date } = req.body;
    const token = tokenDecoder(interviewerId);
    console.log("be", studentId, token.id);

    const results = await db.query(postInterview, [
      Number(studentId),
      Number(token.id),
      date,
    ]);

    res.status(200).json(results.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error Adding Interview To Schedule" });
  }
};

export const addQuestionNote = async (req, res) => {
  try {
    const { note, questionId, interviewId } = req.body;
    Number(questionId);
    Number(interviewId);
    const results = await db.query(patchQuestionNote, [
      questionId,
      note,
      interviewId,
    ]);
    res.status(200).json(results.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error Adding Question Notes" });
  }
};

export const addSummaryNotes = async (req, res) => {
  try {
    const { note, interviewId } = req.body;

    const results = await db.query(patchNote, [note, interviewId]);
    res.status(200).json(results.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error Adding Summary Notes" });
  }
};
