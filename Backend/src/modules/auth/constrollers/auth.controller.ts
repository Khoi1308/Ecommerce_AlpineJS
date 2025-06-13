import z from "zod";
import { catchErrors } from "../../../utils/catchErrors";

const registerSchema = z
  .object({
    username: z.string().min(6),
    email: z.string().email(),
    password: z.string().min(6).max(255),
    confirmPassword: z.string().min(6).max(255),
    userAgent: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });

export const registerHandler = catchErrors(async (req, res) => {
  // Validate request
  const request = registerSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  // Call service

  // Return response
});
