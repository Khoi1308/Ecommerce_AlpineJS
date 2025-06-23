import jwt, { SignOptions, VerifyOptions } from "jsonwebtoken";
import { Session } from "../modules/auth/entities/session.entity";
import { User } from "../modules/user/entities/user.entity";
import { JWT_REFRESH_SECRET, JWT_SECRET } from "../config/env";
import { Response } from "express";
import { Role } from "../modules/user/entities/role.entity";

export type AccessTokenPayload = {
  userId: User["userId"];
  sessionId: Session["sessionId"];
  roleId: Role["roleId"];
};

export type RefreshTokenPayload = {
  sessionId: Session["sessionId"];
};

type SignOptionsAndSecret = SignOptions & {
  secret: string;
};

const defaults: SignOptions = {
  issuer: "ecommerce-api",
};

const accessTokenSignOptions: SignOptionsAndSecret = {
  expiresIn: "15m",
  secret: JWT_SECRET,
};

export const refreshTokenSignOptions: SignOptionsAndSecret = {
  expiresIn: "30d",
  secret: JWT_REFRESH_SECRET,
};

export const signToken = (
  payload: AccessTokenPayload | RefreshTokenPayload,
  options?: SignOptionsAndSecret,
) => {
  const { secret, ...signOpts } = options || accessTokenSignOptions;
  return jwt.sign(payload, secret, { ...defaults, ...signOpts });
};

export const verfifyToken = <TPayload extends object = AccessTokenPayload>(
  token: string,
  options?: VerifyOptions & { secret: string },
) => {
  const { secret = JWT_SECRET!, ...verifyOpts } = options || {};
  try {
    const payload = jwt.verify(token, secret, {
      ...defaults,
      ...verifyOpts,
    }) as TPayload;
    return { payload };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const REFRESH_PATH = "/auth/refresh";

export const clearAuthCookies = (res: Response) =>
  res
    .clearCookie("accessToken")
    .clearCookie("refreshToken", { path: REFRESH_PATH });
