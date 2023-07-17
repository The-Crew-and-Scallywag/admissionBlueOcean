import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = (data) => {
  const token = jwt.sign(
    { id: data.id, firstName: data.first_name, lastName: data.last_name },
    process.env.INTERVIEWER_TOKEN,
    {
      expiresIn: "1d",
    }
  );
  return token;
};

// unsures user provided valid email structure
export function validateEmail(email) {
  // Check if the email contains a "."
  if (!email.includes(".")) {
    return false;
  }

  // Check if email constains the @ symbol
  if (!email.includes("@")) return false;

  // Split the email into two parts at the @ symbol
  var parts = email.split("@");
  var localPart = parts[0];
  var domainPart = parts[1];

  // Check if the local part and domain part are not empty
  if (localPart.length === 0 || domainPart.length === 0) {
    return false;
  }

  return true;
}
