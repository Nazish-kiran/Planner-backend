import express from "express";
import Note from "../models/note-model.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";

const router = express.Router();

// Helper: Get local date in YYYY-MM-DD format
const getLocalDateString = () => {
  return new Date().toLocaleDateString('en-CA'); // 'en-CA' gives YYYY-MM-DD format
};

// Helper: normalize date to YYYY-MM-DD (local time)
const normalizeDate = (d) => {
  if (!d) return getLocalDateString();
  if (typeof d === "string") return d.split("T")[0];
  return new Date(d).toLocaleDateString('en-CA');
};

// Save or update a user's note for a specific date
router.post("/save", isLoggedIn, async (req, res) => {
  try {
    const { content, date } = req.body;

    if (content === undefined) {
      return res.status(400).json({ success: false, message: "No content provided" });
    }

    const noteDate = normalizeDate(date);

    const note = await Note.findOneAndUpdate(
      { userId: req.user._id, date: noteDate },
      { content, updatedAt: Date.now() },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return res.status(200).json({ success: true, message: "Note saved!", note });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});

// Get user's note for a specific date (default: today - local time)
router.get("/", isLoggedIn, async (req, res) => {
  try {
    const date = normalizeDate(req.query.date);
    const note = await Note.findOne({ userId: req.user._id, date });
    return res.status(200).json({ success: true, note: note?.content || "" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});

export default router;