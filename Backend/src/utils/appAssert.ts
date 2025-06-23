import assert from "node:assert";
import { AppError } from "./AppError";
import { HttpStatusCode } from "../config/http";
import { AppErrorCode } from "../config/appErrorCode";

type AppAssert = (
  condition: any,
  httpStatusCode: HttpStatusCode,
  message: string,
  appErrorCode?: AppErrorCode,
) => asserts condition;

// Assert a condition and throws an AppError if the condition is false
export const appAssert: AppAssert = (
  condition,
  httpStatusCode,
  message,
  appErrorCode,
) => assert(condition, new AppError(httpStatusCode, message, appErrorCode));
