import { verifyToken } from "./jwt";
import type { Request } from "express";

export const getUserId = (req: Request) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("unauthoirzed");
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    throw new Error("Unauthorized");
  }
  const decoded = verifyToken(token);
  return decoded.userId;
};
