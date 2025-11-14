import express from "express";
import db from "./config/mongoose-connection.js";
import cookieParser from "cookie-parser";
import path from "path";
import usersRouter from "./routes/usersRouter.js";
import notesRouter from "./routes/notesRouter.js";
import indexRouter from "./routes/index.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cookieParser());


app.use(express.static(path.join(import.meta.dirname, "public")));


app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/users", usersRouter);
app.use("/", indexRouter);
app.use("/notes", notesRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Express API running on http://localhost:${PORT}`);
});
