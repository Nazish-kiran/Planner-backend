import mongoose from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    trim: true,
    minlength: [3, "Fullname must be at least 3 characters long"],
  },
  email: {
    type: String,
    match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
  },
  password: String,
  contact: Number,
  picture: String,
  
});

userSchema.virtual("notes", {
  ref: "Note",
  localField: "_id",
  foreignField: "user",
});

export default mongoose.model("User", userSchema);
