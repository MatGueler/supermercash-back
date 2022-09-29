import prisma from "../Database/Prisma";
import { IRegisterUser } from "../Types/RegisterTypes";

export async function insertUser(body: IRegisterUser) {
  await prisma.users.create({ data: body });
}
export async function loginUser() {
  return "0";
}
