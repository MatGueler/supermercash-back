import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { unauthorizedError } from "../Utils/ErrorUtils";
import prisma from "../Database/Prisma";
import { NextFunction, Request, Response } from "express";
import { generateRefreshToken, generateToken } from "../Service/UserService";
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
    const JWT_SECRET_TOKEN = String(process.env.JWT_SECRET_TOKEN);
    const { userId } = jwt.verify(token, JWT_SECRET_TOKEN) as {
      userId: number;
    };
    const user = await prisma.users.findFirst({
      where: { id: userId },
    });

    res.locals.userId = user.id;
    next();
  } catch {
    try {
      const getToken = await prisma.sessions.findFirst({
        where: { accessToken: token },
      });
      if (!getToken) {
        throw unauthorizedError("Esse token não existe mais");
      }
      const JWT_SECRET_REFRESH = String(process.env.JWT_SECRET_REFRESH);
      const rToken = String(getToken.refreshToken);
      const { userId } = jwt.verify(rToken, JWT_SECRET_REFRESH) as {
        userId: number;
      };
      const accessToken = generateToken(userId);
      const refreshToken = generateRefreshToken(userId);

      await prisma.sessions.upsert({
        create: {
          userId,
          accessToken,
          refreshToken,
        },
        update: {
          accessToken,
        },
        where: {
          accessToken: token,
        },
      });

      res.locals.token = accessToken;
      res.locals.userId = userId;
      next();
    } catch {
      throw unauthorizedError("Invalid token expirou");
    }
  }
}
