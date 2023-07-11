import { generateToken } from "../Authorization/auth.js";
import { db } from "../Database/database.js";
import { emailCheck, login } from "./queries.js";

export const logUserIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email === "" || password === "") {
      return res.status(400).json({ message: "Provide Email and Password" });
    }

    const results = await db.query(login, [email]);
    if (results.rowCount === 0 || results.rows[0].password !== password) {
      return res.status(400).json({ message: "Incorrect Email or Password" });
    }

    const token = generateToken(results.rows[0]);
    console.log(token);
    res.status(200).json({ token: token, user: results.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error Logging User In" });
  }
};
