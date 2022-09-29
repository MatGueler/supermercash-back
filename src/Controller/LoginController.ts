import * as userService from "../Service/UserService";
import { Request, Response } from "express";

export async function RegisterUser(req: Request, res: Response) {
  const body = req.body;
  const token = await userService.loginUser();
  res.status(200).send(token);
}

export async function LoginUser(req: Request, res: Response) {
  const body = req.body;
  const token = await userService.loginUser();
  res.status(200).send(token);
}
