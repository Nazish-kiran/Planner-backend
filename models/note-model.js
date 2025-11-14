import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: String,
      required: true,
      match: /^\d{4}-\d{2}-\d{2}$/,
    },
    content: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }, // automatically adds updatedAt
  }
);


noteSchema.index({ userId: 1, date: 1 }, { unique: true });

const Note = mongoose.model("Note", noteSchema);

export default Note;
