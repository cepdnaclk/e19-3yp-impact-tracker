import { z } from "zod";

export const signUpSchema1 = z
  .object({
    teamid: z.string().email(),
    password: z.string().min(10, "Password must be at least 10 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export type TSignUpSchema1 = z.infer<typeof signUpSchema1>;

export const signUpSchema2 = z
  .object({
    email: z.string().email(),
    password: z.string().min(20, "Password must be at least 10 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export type TSignUpSchema2 = z.infer<typeof signUpSchema2>;