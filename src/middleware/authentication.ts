import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import {  User } from "@prisma/client";
import { UnauthenticatedError } from "../errors/";

export interface RequestWithUser extends Request {
  user?: User;
}

export default async function authenticateUser(
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) {
  //check the header
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthenticatedError("Authentication Invalid");
    }

    const token = authHeader.split(" ")[1];

    const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
      user: User;
    };
    req.user = payload.user;
    next();
  } catch (e) {
    next(e);
  }
}
