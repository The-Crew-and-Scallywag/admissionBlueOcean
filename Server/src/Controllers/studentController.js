import { validateEmail } from "../Authorization/auth.js";
import { db } from "../Database/database.js";
import {
  allStudents,
  deleteStudent,
  patchStudent,
  postStudent,
  student,
  studentJoinedInterviewer,
} from "./queries.js";

// fetches all students
export const getAllStudents = async (req, res) => {
  try {
    const results = await db.query(allStudents);
    if (results.rowCount === 0) {
      return res.status(400).json({ message: "No Students In Database" });
    }
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

    if (results.rowCount === 0) {
      return res.status(400).json({ message: "Student Not Found" });
    }

    res.status(200).json(results.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error Fetching Student" });
  }
};

export const studentsAndInterviewers = async (req, res) => {
  try {
    const results = await db.query(studentJoinedInterviewer);
    res.status(200).json(results.rows);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error Fetching Student and Interviewer Data" });
  }
};

export const addStudent = async (req, res) => {
  try {
    const { firstName, lastName, email, phone } = req.body;
    if (firstName === "" || lastName === "" || email === "" || phone === "") {
      return res.status(400).json({ message: "Ensure All Fields Are Filled" });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid Email Format" });
    }
    if (phone.length !== 11) {
      return res.status(400).json({ message: "Enter Valid Phone Number" });
    }
    const results = await db.query(postStudent, [
      firstName,
      lastName,
      email,
      phone,
    ]);
    res.status(200).json(results.rows[0]);
  } catch (error) {
    if (error.detail.includes("already exists")) {
      return res.status(400).json({ message: "Email Already Exists" });
    }
    res.status(500).json({ message: "Error Adding Student" });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const { firstName, lastName, email, phone } = req.body;
    const id = Number(req.params.id);
    const results = await db.query(patchStudent, [
      firstName,
      lastName,
      email,
      phone,
      id,
    ]);
    res.status(200).json(results.rows[0]);
  } catch (error) {}
};

export const removeStudent = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const results = await db.query(deleteStudent, [id]);
    if (results.rowCount === 0) {
      return res.status(400).json({ message: "Student Not Found" });
    }
    res.status(200).json({ message: "Student Removed Successfully" });
  } catch (error) {}
};
