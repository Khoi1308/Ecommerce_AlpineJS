import z from "zod";

export const emailSchema = z.string().email();
const passwordSchema = z.string().min(6).max(255);

const baseSchema = z.object({
  username: z.string().min(6),
  email: emailSchema,
  password: passwordSchema,
  userAgent: z.string().optional(),
});

export const loginSchema = baseSchema
  .partial({ username: true, email: true })
  .refine((data) => data.username || data.email, {
    message: "At least one of username or email is required",
    path: ["username", "email"],
  });

export const registerSchema = baseSchema
  .extend({
    confirmPassword: z.string().min(6).max(255),
    role: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });

export const verificationCodeSchema = z.string().min(1);

export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string().min(6).max(255),
    verificationCode: verificationCodeSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });
