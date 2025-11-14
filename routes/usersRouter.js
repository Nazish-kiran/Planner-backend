import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/authController.js";

const router = express.Router();

// Health check for testing
router.get("/", (req, res) => {
  res.json({ success: true, message: "User route working!" });
});

// Auth routes
router.post("/register", registerUser); // Sign-up
router.post("/login", loginUser);       // Sign-in
router.get("/logout", logoutUser);      // Logout (optional, token-based)

export default router;
