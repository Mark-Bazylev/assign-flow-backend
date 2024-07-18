import { StatusCodes } from "http-status-codes";
import {Prisma, PrismaClient} from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import {authService} from "../services/auth-service/auth.service";

interface UserRequest extends Request {
  body: Prisma.UserCreateInput;
}

const prisma = new PrismaClient();
export async function register(req: UserRequest, res: Response, next: NextFunction) {
  try {
    const user = await authService.register(req.body);
    console.log(req.body);
    res.status(StatusCodes.OK).json({ msg: "Registered", user });
  } catch (e) {
    next(e);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  res.status(StatusCodes.OK).json({ msg: "Logged In" });
}
