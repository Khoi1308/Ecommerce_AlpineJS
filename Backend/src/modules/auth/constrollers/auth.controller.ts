import { catchErrors } from "../../../utils/catchErrors";
import {
  createAccount,
  loginAccount,
  logoutAccount,
  refreshAccountAccessToken,
  resetPassword,
  sendPasswordResetEmail,
  verifyEmail,
} from "../services/auth.service";
import { CREATED, SUCCESS, UNAUTHORIZED } from "../../../config/http";
import {
  getAccessTokenOptions,
  getRefreshTokenOptions,
  setAuthCookies,
} from "../../../utils/cookies";
import {
  emailSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  verificationCodeSchema,
} from "../auth.schema";
import { clearAuthCookies } from "../../../utils/jwt";
import { appAssert } from "../../../utils/appAssert";

export const registerHandler = catchErrors(async (req, res) => {
  // Validate request
  const request = registerSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  // Call service
  const { user, accessToken, refreshToken } = await createAccount(request);

  // Return response
  setAuthCookies({ res, accessToken, refreshToken }).status(CREATED).json(user);
});

export const loginHandler = catchErrors(async (req, res) => {
  // Validate request
  const request = loginSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  // Call service
  const { accessToken, refreshToken } = await loginAccount(request);

  // Return response
  setAuthCookies({ res, accessToken, refreshToken }).status(SUCCESS).json({
    message: "Login successful",
  });
});

export const logoutHandler = catchErrors(async (req, res) => {
  const accessToken = req.cookies.accessToken; // If access token is valid, then delete the session

  await logoutAccount(accessToken);

  clearAuthCookies(res).status(SUCCESS).json({
    message: "Logout successful",
  });
});

export const refreshHandler = catchErrors(async (req, res) => {
  const refreshToken = req.cookies.refreshToken as string | undefined;
  appAssert(refreshToken, UNAUTHORIZED, "Missing refresh token");

  const { accessToken, newRefreshToken } =
    await refreshAccountAccessToken(refreshToken);

  // If it has new refresh token, sign this into cookie
  if (newRefreshToken) {
    res.cookie("refreshToken", newRefreshToken, getRefreshTokenOptions());
  }

  res
    .status(SUCCESS)
    .cookie("accessToken", accessToken, getAccessTokenOptions())
    .json({
      message: "Access token refreshed",
    });
});

export const verifyEmailHandler = catchErrors(async (req, res) => {
  const verificationCode = verificationCodeSchema.parse(req.params.code);

  await verifyEmail(verificationCode);

  res.status(SUCCESS).json({
    message: "Email verified",
  });
});

export const sendPasswordResetHandler = catchErrors(async (req, res) => {
  const email = emailSchema.parse(req.body.email);

  await sendPasswordResetEmail(email);

  res.status(SUCCESS).json({
    message: "Password reset email sent",
  });
});

export const resetPasswordHandler = catchErrors(async (req, res) => {
  const request = resetPasswordSchema.parse(req.body);

  await resetPassword(request);

  clearAuthCookies(res).status(SUCCESS).json({
    message: "Password reset successfully",
  });
});
