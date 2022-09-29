import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { unauthorizedError } from "../Utils/ErrorUtils";
import prisma from "../Database/Prisma";
import { NextFunction, Request, Response } from "express";
dotenv.config();

export async function validatingToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  if (!token) {
    throw unauthorizedError("Token is missing");
  }
  try {
    const JWT_SECRET_TOKEN = String(process.env.JWT_SECRET);
    const { userId } = jwt.verify(token, JWT_SECRET_TOKEN) as {
      userId: number;
    };
    const user = await prisma.users.findFirst({
      where: { id: userId },
    });
    res.locals.userId = user.id;
    next();
  } catch {
    throw unauthorizedError("Invalid token");
  }
}
