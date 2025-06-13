import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db";
import { APP_ORIGIN } from "./config/env";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorHandler";
import { catchErrors } from "./utils/catchErrors";
import { AppModule } from "./app.module";
import "reflect-metadata";
dotenv.config();

const app = express();
const proc_env = process.env;
// Middleware
app.use(express.json()); // Parse JSON request body
app.use(express.urlencoded({ extended: true })); // Parse form data
app.use(
  cors({
    origin: APP_ORIGIN, // Only fronend must be access API
    credentials: true,
  }),
);
app.use(cookieParser());

app.get(
  "/",
  catchErrors(async (req, res, next) => {
    throw new Error("This is a test error");
  }),
);

// Main routes
AppModule.setup(app);

app.use(errorHandler);

app.listen(proc_env.PORT, async () => {
  await connectDB();
  console.log("Server is starting in port", proc_env.PORT);
});
