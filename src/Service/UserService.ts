//  * Functions
import * as userRepository from "../Repository/UserRepository";

//  # Libs
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//  - Types
import { IRegisterUser } from "../Types/RegisterTypes";

//  ! Errors
import { notFoundError, unauthorizedError } from "../Utils/ErrorUtils";
import { ILoginUser } from "../Types/LoginTypes";

export async function registerUser(body: IRegisterUser) {
  await verifyUserExist(body.email, false);
  const encryptedPassword = encryptPassword(body.password);
  // * Remove property confirmPassword of body
  delete body.confirmPassword;
  await createUser({ ...body, password: encryptedPassword });
}

export async function loginUser(body: ILoginUser) {
  await verifyUserExist(body.email, true);
  // const token = generateToken();
  await userRepository.loginUser();
  return "oi";
}

async function createUser(body: IRegisterUser) {
  await userRepository.insertUser(body);
}

//  * verifyUserExist function recive two params, email and a boolean, if user sould exist boolean is true, if must not exist is false

async function verifyUserExist(email: string, shouldExist: boolean) {
  const user = await userRepository.getUserByEmail(email);
  if (user && shouldExist === false) {
    throw unauthorizedError("Unable to create account");
  }
  if (!user && shouldExist === true) {
    throw notFoundError("User not found");
  }
}

// - Aux functions

function encryptPassword(password: string) {
  const SALT = 10;
  const cryptPassword = bcrypt.hashSync(password, SALT);
  return cryptPassword;
}

function generateToken(id: number) {
  const JWT_SECRET = String(process.env.JWT_SECRET);
  const token = jwt.sign(
    {
      userId: Number(id),
    },
    JWT_SECRET,
    { expiresIn: process.env.TIME_JWT }
  );
}
