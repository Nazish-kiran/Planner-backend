import express from "express";
import isLoggedIn from "../middlewares/isLoggedIn.js";
import userModel from "../models/user-model.js";
import { log } from "console";

const router = express.Router();

router.get("/", (req, res) => {
  let error = req.flash("error");
  res.render("index", { error, loggedin: false });
});

router.get("/home", isLoggedIn, async (req, res) => {
  let success = req.flash("success");
  res.render("home");
});

export default router;
