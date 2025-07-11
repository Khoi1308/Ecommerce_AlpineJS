import express, { Response } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db";
import { APP_ORIGIN } from "./config/env";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { AppModule } from "./app.module";
import "reflect-metadata";
dotenv.config();

const app = express();
const proc_env = process.env;
// Middleware
app.use(
  cors({
    origin: APP_ORIGIN, // Only fronend must be access API
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    preflightContinue: false,
    optionsSuccessStatus: 200,
  }),
);
app.use(express.json()); // Parse JSON request body
app.use(express.urlencoded({ extended: true })); // Parse form data
app.use(cookieParser());

app.get("/", async (req, res: Response) => {
  res.send("Hello world");
});

// Main routes
AppModule.setup(app);

// Middleware
app.use(errorHandler);

app.listen(proc_env.PORT, async () => {
  await connectDB();
  console.log("Server is starting in port", proc_env.PORT);
});
