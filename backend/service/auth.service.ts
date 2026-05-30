import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";
import { generateToken } from "../lib/jwt";

export const signupService = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const { name, email, password } = data;
  const existingUser = await prisma.user.findFirst({
    where: { email },
  });

  if (existingUser) {
    throw new Error("User already exists ");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  return {
    message: "User created successfully",
  };
};

export const signinService = async (data: {
  email: string;
  password: string;
}) => {
  const { email, password } = data;
  const existingUser = await prisma.user.findFirst({
    where: { email },
  });

  if (!existingUser) {
    throw new Error("User did not exist");
  }

  const isMatch = await bcrypt.compare(password, existingUser.password);
  if (!isMatch) {
    throw new Error("Invalid credential");
  }
  const token = generateToken(existingUser.id);
  return {
    message: "signinsuccesfull",
    token,
  };
};
