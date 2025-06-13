import { verificationCodeType } from "../../../config/verificationCodeTypes";
import { UserRepository } from "../../user/repositories/user.repository";
import { VerificationCodeRepository } from "../repositories/verificationCode.repository";

export type CreateAccountType = {
  email: string;
  username: string;
  password: string;
  userAgent?: string;
};

const user_repository = new UserRepository();
const verificationCode_repository = new VerificationCodeRepository();

export const createAccount = async (data: CreateAccountType) => {
  // Verify existing user doesn't exist
  const existingUser = await user_repository.findByEmail(data.email);

  if (existingUser) {
    throw new Error("Email already exists");
  }

  // Create user
  const user = await user_repository.createUser({
    username: data.username,
    email: data.email,
    password: data.password,
  });

  // Create verification code
  const verificationCode = await verificationCode_repository.createVerifyCode({
    user: user,
    type: verificationCodeType.EmailVerification,
    expiresAt: 
  });
  // Send verification email
  // Create session
  // Sign access token & refresh token
  // Return user & tokens
};
