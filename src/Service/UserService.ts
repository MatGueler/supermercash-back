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
import { IUpdateUser } from "../Types/UpdateUserTypes";

export async function registerUser(body: IRegisterUser) {
  // # User should not exist
  await verifyUserExist(body.email, false);
  const encryptedPassword = encryptPassword(body.password);
  // * Remove property confirmPassword of body
  delete body.confirmPassword;
  await createUser({ ...body, password: encryptedPassword });
}

export async function loginUser(body: ILoginUser) {
  // # User should exist
  const user = await verifyUserExist(body.email, true);
  await verifyPassword(body.password, user.password);
  const token = generateToken(user.id);
  const refreshToken = generateRefreshToken();
  await userRepository.loginUser(token, refreshToken, user.id);
  return { token };
}

export async function GetUserInfos(userId: number) {
  const user = await verifyUserExistById(userId);
  return {
    name: user.name,
    email: user.email,
    image: user.UserImages,
    adress: user.UserAdress ?? "",
    phone: user.UserPhones ?? "",
  };
}

async function createUser(body: IRegisterUser) {
  await userRepository.insertUser(body);
}

export async function updateUserInfo(body: IUpdateUser, userId: number) {
  await verifyUserExistById(userId);
  await updateAllUserInfo(body, userId);
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
  return user;
}

async function verifyUserExistById(userId: number) {
  const user = await userRepository.getUserById(userId);
  if (!user) {
    throw notFoundError("User not found");
  }
  return user;
}

async function verifyPassword(password: string, encryptedPassword: string) {
  const verifyPassword = bcrypt.compareSync(password, encryptedPassword);
  if (!verifyPassword) {
    throw unauthorizedError("User or password are incorrect");
  }
}

async function updateAllUserInfo(body: IUpdateUser, userId: number) {
  await userRepository.updateUserInfo(body.name, body.email, userId);
  await userRepository.updateUserAdress(body.adress, userId);
  await userRepository.updateUserPhone(body.phone, userId);
}

// - Aux functions

function encryptPassword(password: string) {
  const SALT = 10;
  const cryptPassword = bcrypt.hashSync(password, SALT);
  return cryptPassword;
}

function generateToken(id: number) {
  const JWT_SECRET_TOKEN = String(process.env.JWT_SECRET);
  const TIME_JWT_TOKEN = String(process.env.TIME_JWT_TOKEN);
  const token = jwt.sign(
    {
      userId: Number(id),
    },
    JWT_SECRET_TOKEN,
    { expiresIn: TIME_JWT_TOKEN }
  );
  return token;
}
function generateRefreshToken() {
  const JWT_SECRET_REFRESH = String(process.env.JWT_SECRET);
  const TIME_JWT_REFRESH = String(process.env.TIME_JWT_TOKEN);
  const token = jwt.sign({}, JWT_SECRET_REFRESH, {
    expiresIn: TIME_JWT_REFRESH,
  });
  return token;
}
