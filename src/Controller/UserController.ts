import * as userService from "../Service/UserService";
import { Request, Response } from "express";
import { IRegisterUser } from "../Types/RegisterTypes";
import { ILoginUser } from "../Types/LoginTypes";
import { IUpdateUser, IUpdateUserImage } from "../Types/UpdateUserTypes";

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
  const accessToken: string = res.locals.token;
  const userInfo = await userService.GetUserInfos(userId);
  res.status(200).send({ userInfo, accessToken });
}

export async function UpdateUsersInfo(req: Request, res: Response) {
  const userId: number = res.locals.userId;
  const body: IUpdateUser = req.body;
  await userService.updateUserInfo(body, userId);
  res.sendStatus(201);
}

export async function UpdateUserImage(req: Request, res: Response) {
  const userId: number = res.locals.userId;
  const body: IUpdateUserImage = req.body;
  await userService.updateUserImage(body.userImage, userId);
  res.sendStatus(201);
}

export async function OAuthRegister(req: Request, res: Response) {
  const code = req.body.code;
  const token = await userService.OAuthRegisterAndLogin(code);
  res.status(201).send(token);
}

export async function OAuthLogin(req: Request, res: Response) {
  const code = req.body.code;
  const user = await userService.OAuthLogin(code);
  res.status(200).send(user);
}

export async function OAuthLoginGoogle(req: Request, res: Response) {
  const userInfos = req.body.user;
  const token = await userService.OAuthLoginGoogle(userInfos);
  res.status(200).send(token);
}

export async function OAuthRegisterGoogle(req: Request, res: Response) {
  const userInfos = req.body.user;
  const token = await userService.OAuthRegisterAndLoginWithGoogle(userInfos);
  res.status(201).send(token);
}
