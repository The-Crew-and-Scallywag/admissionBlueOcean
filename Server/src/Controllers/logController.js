import { db } from "../Database/database.js";
import { emailCheck, login } from "./queries.js";

export const logUserIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const results = await db.query(login, [email, password]);
    if (results.rowCount === 0) {
      return res.status(400).json({ message: "Incorrect Email or Password" });
    }
    res.status(200).json(results.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error Logging User In" });
  }
};
