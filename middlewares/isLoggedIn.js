import jwt from "jsonwebtoken";
import userModel from "../models/user-model.js";
import dotenv from "dotenv";
dotenv.config();

const isLoggedIn = async (req, res, next) => {
  try {
    // Check for token
    const token = req.cookies?.token;
    if (!token) {
      req.flash("error", "You need to log in first.");
      return res.redirect("/");
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    // Fetch user
    const user = await userModel.findOne({ email: decoded.email }).select("-password");
    if (!user) {
      req.flash("error", "User not found. Please log in again.");
      res.clearCookie("token");
      return res.redirect("/");
    }

    // Attach user to request
    req.user = user;
    next();

  } catch (err) {
    console.error("Auth middleware error:", err.message);
    req.flash("error", "Session expired or invalid. Please log in again.");
    res.clearCookie("token");
    return res.redirect("/");
  }
};

export default isLoggedIn;