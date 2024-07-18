import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

class AuthService {
  public async register(registerParams: Prisma.UserCreateInput) {
    const { email, password, name } = registerParams;
    const hashedPassword = (await hashPassword(password)) || "";

    const user = await prisma.user.create({
      data: { email, name, password: hashedPassword },
    });

    const token = signToken({
      id: user.id,
      email: user.email,
      name: user.name,
    });
    return { user, token };
  }
}

export const authService = new AuthService();

async function hashPassword(password: string) {
  if (!password) return;
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

function signToken(tokenData: { id: string; email: string; name: string }) {
  return jwt.sign(
    {
      tokenData,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: process.env.JWT_LIFETIME!,
    },
  );
}
