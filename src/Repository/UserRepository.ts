import prisma from "../Database/Prisma";
import { IRegisterUser } from "../Types/RegisterTypes";

export async function insertUser(body: IRegisterUser) {
  await prisma.users.create({ data: body });
}
export async function getUserByEmail(email: string) {
  return await prisma.users.findFirst({ where: { email } });
}
export async function loginUser(
  token: string,
  refreshToken: string,
  userId: number
) {
  await prisma.sessions.create({
    data: { accessToken: token, refreshToken, userId },
  });
}
