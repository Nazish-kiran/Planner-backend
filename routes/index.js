import express from "express";
import isLoggedIn from "../middlewares/isLoggedIn.js";
import userModel from "../models/user-model.js";

const router = express.Router();

// Root route — just a health check (optional)
router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API is working. Use /users/login or /users/register endpoints.",
  });
});

// Example of a protected route (for your planner page later)
router.get("/home", isLoggedIn, async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id).select("-password");
    res.status(200).json({
      success: true,
      message: "Welcome to the planner!",
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
});

export default router;
