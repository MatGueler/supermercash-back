//  * Functions
import * as userRepository from "../Repository/UserRepository";

//  # Libs
import bcrypt from 'bcrypt'

//  - Types
import { IRegisterUser } from "../Types/RegisterTypes";

//  ! Errors
import { unauthorizedError } from "../Utils/ErrorUtils";

export async function registerUser(body: IRegisterUser) {
  await verifyUserNotExist(body.email);
  const encryptedPassword = encryptPassword(body.password);
  // * Remove property confirmPassword of body
  delete body.confirmPassword;
  await createUser({ ...body, password: encryptedPassword });
}

export async function loginUser() {
  // const token = generateToken();
  await userRepository.loginUser();
  return "oi";
}

async function createUser(body: IRegisterUser) {
  await userRepository.insertUser(body);
}

async function verifyUserNotExist(email: string) {
  const user = await userRepository.getUserByEmail(email);
  if (user) {
    throw unauthorizedError("Unable to create account");
  }
}

// - Aux functions

function encryptPassword(password: string) {
  const SALT = 10;
  const cryptPassword = bcrypt.hashSync(password, SALT);
  return cryptPassword;
}
