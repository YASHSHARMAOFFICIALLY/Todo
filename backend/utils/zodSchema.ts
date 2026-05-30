import z from "zod";
export const SignupSchema = z.object({
  name: z.string().min(4, "username must be 4 character atleast"),

  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(8, "password must be atleast 8 character ")
    .regex(/[A-Z]/, "Must contain uppercase")
    .regex(/[a-z]/, "Must contain lowercase")
    .regex(/[0-9]/, "Must contain number"),
});

export const SigninSchema = z.object({
  email: z.string().min(4, "username must be 4 character atleast"),
  password: z
    .string()
    .min(8, "password must be atleast 8 character ")
    .regex(/[A-Z]/, "Must contain uppercase")
    .regex(/[a-z]/, "Must contain lowercase")
    .regex(/[0-9]/, "Must contain number"),
});

export const todoschema = z.object({
  title: z.string().min(3, "title should be 3 character atleast"),
  description: z.string().min(4, "description should be 4 character"),
  status: z.enum(["NOT_STARTED", "IN_PROGRESS", "COMPLETED"]),
});
