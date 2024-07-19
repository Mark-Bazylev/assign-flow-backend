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
    const token = await authService.register(req.body);
    res.status(StatusCodes.OK).json( {token} );
  } catch (e) {
    next(e);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try{
    const token = await authService.login(req.body);
    res.status(StatusCodes.OK).json({token});
  }
  catch (e){
    next(e);
  }
}
