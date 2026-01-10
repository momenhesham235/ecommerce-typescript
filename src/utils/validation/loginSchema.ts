import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email address is required" })
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type TLoginType = z.infer<typeof loginSchema>;

export { loginSchema, type TLoginType };
