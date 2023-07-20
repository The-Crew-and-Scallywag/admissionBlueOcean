import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { promisify } from "util";

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

// decodes header token and returns an obj containing the users data
export const tokenDecoder = (token) => {
  const decoded = jwt.verify(token, process.env.INTERVIEWER_TOKEN);
  return decoded;
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

// ensures user is signed in with a valid token
export const protectRoutes = async (req, res, next) => {
  try {
    let token;
    // ensure authorization header is correct
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      // gets token from header
      token = req.headers.authorization.split(" ")[1];
    }

    // if token isn't present send user a message
    if (!token)
      return res.status(401).json({ message: "Instructor Only Access" });

    // decode token and get user id from it
    const decoded = await promisify(jwt.verify)(
      token,
      process.env.INTERVIEWER_TOKEN
    );
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error While Verifying Token",
      expiredAt: error?.expiredAt,
    });
  }
};
