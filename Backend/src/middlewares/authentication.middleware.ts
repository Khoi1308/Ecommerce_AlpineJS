import { RequestHandler } from "express";
import { UNAUTHORIZED } from "../config/http";
import { AppErrorCode } from "../config/appErrorCode";
import { appAssert } from "../utils/appAssert";
import { verfifyToken } from "../utils/jwt";

export const authenticate: RequestHandler = (req, res, next) => {
  const accessToken = req.cookies.accessToken as string | undefined;
  appAssert(
    accessToken,
    UNAUTHORIZED,
    "Not authorized",
    AppErrorCode.InvalidAccessToken,
  );

  const { error, payload } = verfifyToken(accessToken);
  appAssert(
    payload,
    UNAUTHORIZED,
    error === "jwt expired" ? "Token expired" : "Invalid Token",
    AppErrorCode.InvalidAccessToken,
  );

  req.userId = payload.userId;
  req.sessionId = payload.sessionId;
  req.roleId = payload.roleId
  next();
};
