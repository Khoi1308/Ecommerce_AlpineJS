import { MoreThan } from "typeorm";
import {
  CONFLICT,
  NOT_FOUND,
  TOO_MANY_REQUESTS,
  UNAUTHORIZED,
} from "../../../config/http";
import { verificationCodeType } from "../../../config/verificationCodeTypes";
import { appAssert } from "../../../utils/appAssert";
import {
  fiveMinsAgo,
  fiveMinsFromNow,
  thirtyDaysFromNow,
} from "../../../utils/date";
import {
  RefreshTokenPayload,
  refreshTokenSignOptions,
  signToken,
  verfifyToken,
} from "../../../utils/jwt";
import { mapEntityToDto } from "../../user/dtos/user.dto";
import { UserRepository } from "../../user/repositories/user.repository";
import { SessionRepository } from "../repositories/session.repository";
import { VerificationCodeRepository } from "../repositories/verificationCode.repository";
import { sendMail } from "../../../utils/sendmail";
import {
  getPasswordResetTemplate,
  getVerifyEmailTemplate,
} from "../../../utils/emailTemplates";
import { hashValue } from "../../../utils/bcrypt";
import { RoleRepository } from "../../user/repositories/role.repository";

export type CreateAccountType = {
  email: string;
  username: string;
  password: string;
  userAgent?: string;
  role?: string;
};

const user_repository = new UserRepository();
const verificationCode_repository = new VerificationCodeRepository();
const session_repository = new SessionRepository();
const role_repository = new RoleRepository();

export const createAccount = async (data: CreateAccountType) => {
  // Verify existing user doesn't exist
  const existingUser = await user_repository.findByEmail(data.email);
  appAssert(!existingUser, CONFLICT, "Email already in use");

  // Check valid role
  const role_name = data.role || "customer";
  const validRole = await role_repository.findOne({
    where: {
      role_name: data.role || "customer",
    },
  });
  appAssert(validRole, NOT_FOUND, `${role_name} is invalid`);

  // Create user
  const user = await user_repository.createUser({
    username: data.username,
    email: data.email,
    password: data.password,
    role: validRole,
  });

  // Create verification code
  const verificationCode = await verificationCode_repository.createVerifyCode({
    user: user,
    type: verificationCodeType.EmailVerification,
    expiresAt: fiveMinsFromNow(),
  });

  // Send verification email
  const verify_url = `localhost:3000/email/verify/${verificationCode.verificationId}`;
  await sendMail({
    to: user.email,
    ...getVerifyEmailTemplate(verify_url),
  });

  // Create session
  const session = await session_repository.createSession({
    user: user,
    expiresAt: thirtyDaysFromNow(),
    userAgent: data.userAgent,
  });

  // Sign access token & refresh token
  const refreshToken = signToken(
    { sessionId: session.sessionId },
    refreshTokenSignOptions,
  );

  const accessToken = signToken({
    userId: user.userId,
    sessionId: session.sessionId,
    roleId: validRole.roleId,
  });

  // Return user & tokens
  return {
    user: mapEntityToDto(user),
    accessToken,
    refreshToken,
  };
};

export type LoginAccountType = {
  email?: string;
  username?: string;
  password: string;
  userAgent?: string;
};

export const loginAccount = async ({
  username,
  email,
  password,
  userAgent,
}: LoginAccountType) => {
  // Get the user by email or username
  const user = await user_repository.findByEmailOrUsername(username, email);
  appAssert(user, UNAUTHORIZED, "Invalid username or email");

  console.log(user);

  // Validate password from the request
  const isValid = await user.comparePassword(password);
  appAssert(isValid, UNAUTHORIZED, "Invalid email or password");

  // Create a session
  const session = await session_repository.createSession({
    user: user,
    userAgent: userAgent,
    expiresAt: thirtyDaysFromNow(),
  });

  // Sign AccessToken & RefreshToken
  const refreshToken = signToken(
    { sessionId: session.sessionId },
    refreshTokenSignOptions,
  );

  const accessToken = signToken({
    userId: user.userId,
    sessionId: session.sessionId,
    roleId: user.role.roleId,
  });

  // return user & tokens
  return {
    user: mapEntityToDto(user),
    accessToken,
    refreshToken,
  };
};

export const logoutAccount = async (token: string): Promise<void> => {
  // Verify access token
  const { payload } = verfifyToken(token);

  // Delete session
  if (payload) {
    await session_repository.delete(payload.sessionId);
  }
};

export const refreshAccountAccessToken = async (refreshToken: string) => {
  const { payload } = verfifyToken<RefreshTokenPayload>(refreshToken, {
    secret: refreshTokenSignOptions.secret,
  });
  appAssert(payload, UNAUTHORIZED, "Invalid refresh token");

  const session = await session_repository.findBySessionId(payload.sessionId);
  appAssert(
    session && session.expiresAt.getTime() > Date.now(),
    UNAUTHORIZED,
    "Session expired",
  );

  // Refresh the session if it expires in the next 24 hours
  const sessionNeedRefresh =
    session.expiresAt.getTime() - Date.now() <= 24 * 60 * 60 * 1000;

  if (sessionNeedRefresh) {
    session.expiresAt = thirtyDaysFromNow();
    await session_repository.save(session);
  }

  const newRefreshToken = sessionNeedRefresh
    ? signToken(
        {
          sessionId: session.sessionId,
        },
        refreshTokenSignOptions,
      )
    : undefined;

  console.log("SESSION:", session);
  const accessToken = signToken({
    userId: session.user.userId,
    sessionId: session.sessionId,
  });

  return {
    accessToken,
    newRefreshToken,
  };
};

export const verifyEmail = async (code: string) => {
  // Get the verfication code
  const validCode = await verificationCode_repository.findOne({
    where: {
      verificationId: code,
      type: verificationCodeType.EmailVerification,
      expiresAt: MoreThan(new Date(Date.now())),
    },
    relations: ["user", "user.role"],
  });
  appAssert(validCode, NOT_FOUND, "Invalid or expired verification code");

  // Get user by id
  const updatedUser = validCode.user;

  // Update user to verified true
  updatedUser.verified = true;
  await user_repository.save(updatedUser);

  // Delete verification code
  await verificationCode_repository.delete(validCode);

  // Return user
  return {
    user: mapEntityToDto(updatedUser),
  };
};

export const sendPasswordResetEmail = async (email: string) => {
  // Get user by email
  const user = await user_repository.findOne({ where: { email } });
  appAssert(user, NOT_FOUND, "User not found");
  // Check email rate limit
  const timeThreshold = fiveMinsAgo();
  const count = await verificationCode_repository.countRecentResetCode(
    user,
    timeThreshold,
  );
  appAssert(count <= 1, TOO_MANY_REQUESTS, "Too many requests");
  // Create verification code
  const expiresTime = fiveMinsFromNow();
  const verificationCode = await verificationCode_repository.createVerifyCode({
    user: user,
    type: verificationCodeType.ResetPassword,
    expiresAt: expiresTime,
  });
  // Send verification email
  const verify_url = `localhost:3000/password/reset?code=${verificationCode.verificationId}&exp=${expiresTime.getTime()}`;

  await sendMail({
    to: user.email,
    ...getPasswordResetTemplate(verify_url),
  });
  // Return response
  return {
    verify_url,
  };
};

type ResetPasswordParams = {
  password: string;
  verificationCode: string;
};

export const resetPassword = async ({
  password,
  verificationCode,
}: ResetPasswordParams) => {
  // Get verification code
  const validCode = await verificationCode_repository.findOne({
    where: {
      verificationId: verificationCode,
      type: verificationCodeType.ResetPassword,
      expiresAt: MoreThan(new Date()),
    },
    relations: ["user"],
  });
  appAssert(validCode, NOT_FOUND, "Invalid or expired verification code");
  // Update user with new password};
  validCode.user.password = await hashValue(password);
  // Save updated user
  await user_repository.save(validCode.user);
  // Delete verification code
  await verificationCode_repository.delete(validCode);
  // Delete all previous sessions
  await session_repository.delete({ user: { userId: validCode.user.userId } });
};
