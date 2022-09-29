import * as loginRepository from "../Repository/UserRepository";

export async function registerUser() {
  // const token = generateToken();
  await loginRepository.loginUser();
  return "oi";
}

export async function loginUser() {
  // const token = generateToken();
  await loginRepository.loginUser();
  return "oi";
}
