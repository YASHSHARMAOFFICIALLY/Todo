import { Request, Response } from "express";
import { signinService, signupService } from "../service/auth.service";
import { SignupSchema, SigninSchema } from "../utils/zodSchema";

export async function signupController(req: Request, res: Response) {
  try {
    const parsed = SignupSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: "Invalid Crediential",
        errors: parsed.error.flatten(),
      });
    }
    const response = await signupService(parsed.data);
    return res.status(201).json(response);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "something went wrong";
    return res.status(500).json({ message });
  }
}
export async function signinController(req: Request, res: Response) {
  try {
    const parsed = SigninSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: "Invalid credentials",
        errors: parsed.error.flatten(),
      });
    }

    const response = await signinService(parsed.data);
    return res.status(200).json(response);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";
    return res.status(500).json({ message });
  }
}
