import { Response, CookieOptions } from "express";
import { NODE_ENV } from "../config/env";
import { fiveMinsFromNow, thirtyDaysFromNow } from "./date";
import { REFRESH_PATH } from "./jwt";

const secure = NODE_ENV !== "development";

const defaults: CookieOptions = {
  sameSite: "strict",
  httpOnly: true, // ensure that the cookies are not accessible through any client side JS
  secure,
};

export const getAccessTokenOptions = (): CookieOptions => ({
  ...defaults,
  expires: fiveMinsFromNow(),
});

export const getRefreshTokenOptions = (): CookieOptions => ({
  ...defaults,
  expires: thirtyDaysFromNow(),
  path: REFRESH_PATH,
});

type Params = {
  res: Response;
  accessToken: string;
  refreshToken: string;
};

export const setAuthCookies = ({ res, accessToken, refreshToken }: Params) =>
  res
    .cookie("accessToken", accessToken, getAccessTokenOptions())
    .cookie("refreshToken", refreshToken, getRefreshTokenOptions());
