//  * Functions
import * as userRepository from "../Repository/UserRepository";

//  # Libs
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import axios from "axios";
import qs from "query-string";

//  - Types
import { IRegisterUser } from "../Types/RegisterTypes";

//  ! Errors
import {
  conflictError,
  notFoundError,
  unauthorizedError,
} from "../Utils/ErrorUtils";
import { ILoginUser } from "../Types/LoginTypes";
import { IUpdateUser, IUpdateUserImage } from "../Types/UpdateUserTypes";

export async function registerUser(body: IRegisterUser) {
  // # User should not exist
  await verifyUserExist(body.email, false);
  await comparePasswords(body);
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
  const refreshToken = generateRefreshToken(user.id);
  await userRepository.loginUser(token, refreshToken, user.id);
  return { token };
}

export async function GetUserInfos(userId: number) {
  const user = await verifyUserExistById(userId);
  return {
    name: user.name ?? "",
    email: user.email ?? "",
    image: user.UserImages ?? "",
    adress: user.UserAdress ?? "",
    phone: user.UserPhones ?? "",
  };
}

export async function updateUserInfo(body: IUpdateUser, userId: number) {
  await verifyUserExistById(userId);
  await updateAllUserInfo(body, userId);
}

export async function updateUserImage(urlImage: string, userId: number) {
  await verifyUserExistById(userId);
  await userRepository.updateUserImage(urlImage, userId);
}

// #Oauth with github
export async function OAuthLogin(code: any) {
  const tokenGitHub = await exchangeCodeForAccessTokenLogin(code);
  const userInfosGitHub = await fetchUser(tokenGitHub);
  const user = await verifyUserExist(userInfosGitHub.email, true);
  const token = generateToken(user.id);
  const refreshToken = generateRefreshToken(user.id);
  await userRepository.loginUser(token, refreshToken, user.id);
  return token;
}

export async function OAuthRegisterAndLogin(code: any) {
  const tokenGitHub = await exchangeCodeForAccessTokenRegister(code);
  const userInfosGitHub = await fetchUser(tokenGitHub);
  await verifyUserExist(userInfosGitHub.email, false);

  const password: string = generateRandomicPassword();
  const encryptedPassword = encryptPassword(password);

  const newUser = await createUser({
    name: userInfosGitHub.name,
    email: userInfosGitHub.email,
    password: encryptedPassword,
  });
  await updateUserImage(userInfosGitHub.avatar_url, newUser.id);

  const token = generateToken(newUser.id);
  const refreshToken = generateRefreshToken(newUser.id);
  await userRepository.loginUser(token, refreshToken, newUser.id);
  return token;
}

// # Oauth with google
export async function OAuthLoginGoogle(googleToken: any) {
  const { email } = jwt.decode(googleToken) as {
    email: string;
  };
  const user = await verifyUserExist(email, true);
  const token = generateToken(user.id);
  const refreshToken = generateRefreshToken(user.id);
  await userRepository.loginUser(token, refreshToken, user.id);
  return token;
}

export async function OAuthRegisterAndLoginWithGoogle(googleToken: any) {
  const { name, email, picture } = jwt.decode(googleToken) as {
    name: string;
    email: string;
    picture: string;
  };
  await verifyUserExist(email, false);

  const password: string = generateRandomicPassword();
  const encryptedPassword = encryptPassword(password);

  const newUser = await createUser({
    name,
    email,
    password: encryptedPassword,
  });
  await updateUserImage(picture, newUser.id);

  const token = generateToken(newUser.id);
  const refreshToken = generateRefreshToken(newUser.id);
  await userRepository.loginUser(token, refreshToken, newUser.id);
  return token;
}

// - Aux functions

async function exchangeCodeForAccessTokenRegister(code: any) {
  const GITHUB_ACCESS_TOKEN_URL = "https://github.com/login/oauth/access_token";
  const { REDIRECT_URL_REGISTER, CLIENT_ID_REGISTER, CLIENT_SECRET_REGISTER } =
    process.env;
  const params = {
    code,
    grant_type: "authorization_code",
    redirect_uri: REDIRECT_URL_REGISTER,
    client_id: CLIENT_ID_REGISTER,
    client_secret: CLIENT_SECRET_REGISTER,
  };
  const { data } = await axios.post(GITHUB_ACCESS_TOKEN_URL, params, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const parsedData = qs.parse(data);
  return parsedData.access_token;
}

async function exchangeCodeForAccessTokenLogin(code: any) {
  const GITHUB_ACCESS_TOKEN_URL = "https://github.com/login/oauth/access_token";
  const { REDIRECT_URL_LOGIN, CLIENT_ID_LOGIN, CLIENT_SECRET_LOGIN } =
    process.env;
  const params = {
    code,
    grant_type: "authorization_code",
    redirect_uri: REDIRECT_URL_LOGIN,
    client_id: CLIENT_ID_LOGIN,
    client_secret: CLIENT_SECRET_LOGIN,
  };
  const { data } = await axios.post(GITHUB_ACCESS_TOKEN_URL, params, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const parsedData = qs.parse(data);
  return parsedData.access_token;
}

async function fetchUser(token: any) {
  const response = await axios.get("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

function encryptPassword(password: string) {
  const SALT = 10;
  const cryptPassword = bcrypt.hashSync(password, SALT);
  return cryptPassword;
}

export function generateToken(id: number) {
  const JWT_SECRET_TOKEN = String(process.env.JWT_SECRET_TOKEN);
  const TIME_JWT_TOKEN = Number(process.env.TIME_JWT_TOKEN);
  const token = jwt.sign(
    {
      userId: Number(id),
    },
    JWT_SECRET_TOKEN,
    { expiresIn: TIME_JWT_TOKEN }
  );
  return token;
}
export function generateRefreshToken(userId: number) {
  const JWT_SECRET_REFRESH = String(process.env.JWT_SECRET_REFRESH);
  const TIME_JWT_REFRESH = String(process.env.TIME_JWT_REFRESH);
  const token = jwt.sign({ userId }, JWT_SECRET_REFRESH, {
    expiresIn: TIME_JWT_REFRESH,
  });
  return token;
}

//  * VerifyUserExist function recive two params, email and a boolean, if user sould exist boolean is true, if must not exist is false
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

async function createUser(body: IRegisterUser) {
  return await userRepository.insertUser(body);
}

export async function verifyUserExistById(userId: number) {
  const user = await userRepository.getUserById(userId);
  if (!user) {
    throw notFoundError("User not found");
  }
  return user;
}

export async function verifyPassword(
  password: string,
  encryptedPassword: string
) {
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

async function comparePasswords(body: IRegisterUser) {
  if (body.password !== body.confirmPassword) {
    throw conflictError("Passwords are differents");
  }
}

function generateRandomicPassword() {
  return Math.random().toString(36).slice(-10);
}
