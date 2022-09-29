import * as loginRepository from "../Repository/UserRepository";

export async function registerUser(body: any) {
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
