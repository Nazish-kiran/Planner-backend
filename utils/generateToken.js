import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const generateToken = (user) => {
  // Always include expiration for security
  return jwt.sign(
    { email: user.email, id: user._id },
    process.env.JWT_KEY,
    { expiresIn: "7d" } // Token valid for 7 days
  );
};

export default generateToken;
