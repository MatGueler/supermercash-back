import * as loginRepository from "../Repository/UserRepository";
import { IRegisterUser } from "../Types/RegisterTypes";

export async function registerUser(body: IRegisterUser) {
  verifyUserNotExist(body.email);
  // const token = generateToken();
  await loginRepository.loginUser();
  return "oi";
}

export async function loginUser() {
  // const token = generateToken();
  await loginRepository.loginUser();
  return "oi";
}

function verifyUserNotExist(body: any) {}
