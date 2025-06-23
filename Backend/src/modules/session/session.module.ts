import { Router } from "express";
import {
  deleteSessionHandler,
  getSessionHandler,
} from "./controllers/session.controller";

export const SessionModule = Router();

SessionModule.get("/", getSessionHandler);
SessionModule.delete("/:id", deleteSessionHandler);
