import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

console.log(process.env.INTERVIEWER_TOKEN);
export const generateToken = (data) => {
  const token = jwt.sign(
    { id: data.id, role: "interviewer" },
    "process.env.INTERVIEWER_TOKEN",
    {
      expiresIn: "1d",
    }
  );
  return token;
};

console.log(process.env);
