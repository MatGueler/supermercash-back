import * as userRepository from "../Repository/UserRepository";
import { IRegisterUser } from "../Types/RegisterTypes";

export async function registerUser(body: IRegisterUser) {
  // verifyUserNotExist(body.email);
  delete body.confirmPassword;
  await createUser(body);
}

export async function loginUser() {
  // const token = generateToken();
  await userRepository.loginUser();
  return "oi";
}

async function createUser(body: IRegisterUser) {
  await userRepository.insertUser(body);
}
function verifyUserNotExist(body: any) {}
