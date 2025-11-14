import Note from "../models/note-model.js";

// Helper: Get local date in YYYY-MM-DD format
const getLocalDateString = () => {
  return new Date().toLocaleDateString('en-CA');
};

// Helper: normalize date to YYYY-MM-DD (local time)
const normalizeDate = (d) => {
  if (!d) return getLocalDateString();
  if (typeof d === "string") return d.split("T")[0];
  return new Date(d).toLocaleDateString('en-CA');
};

// Save or update a note for a specific date
export const saveNotes = async (req, res) => {
  try {
    const { content, date } = req.body;
    const userId = req.user._id;

    const noteDate = normalizeDate(date);

    const note = await Note.findOneAndUpdate(
      { userId, date: noteDate },
      { content, updatedAt: Date.now() },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({ success: true, message: "Notes saved!", note });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

// Get note for a specific date
export const getNotes = async (req, res) => {
  try {
    const userId = req.user._id;
    const date = normalizeDate(req.query.date);

    const note = await Note.findOne({ userId, date });

    res.status(200).json({ success: true, note: note?.content || "" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};