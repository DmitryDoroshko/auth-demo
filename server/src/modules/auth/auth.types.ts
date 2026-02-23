import { z } from "zod";

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export type LoginBody = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
  name: z.string().min(2),
});

export type RegisterBody = z.infer<typeof registerSchema>;