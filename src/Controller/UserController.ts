import * as userService from "../Service/UserService";
import { Request, Response } from "express";
import { IRegisterUser } from "../Types/RegisterTypes";
import { ILoginUser } from "../Types/LoginTypes";

export async function RegisterUser(req: Request, res: Response) {
  const body: IRegisterUser = req.body;
  await userService.registerUser(body);
  res.sendStatus(201);
}

export async function LoginUser(req: Request, res: Response) {
  const body: ILoginUser = req.body;
  const token = await userService.loginUser(body);
  res.status(200).send(token);
}

export async function GetUserInfos(req: Request, res: Response) {
  const userId: number = res.locals.userId;
  const userInfo = await userService.GetUserInfos(userId);
  res.status(200).send(userInfo);
}
