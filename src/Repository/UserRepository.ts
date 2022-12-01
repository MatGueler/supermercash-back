import prisma from "../Database/Prisma";
import { IRegisterUser } from "../Types/RegisterTypes";

export async function insertUser(body: IRegisterUser) {
  return await prisma.users.create({ data: body });
}

export async function getUserByEmail(email: string) {
  return await prisma.users.findFirst({ where: { email } });
}

export async function getUserById(userId: number) {
  return await prisma.users.findFirst({
    where: { id: userId },
    include: {
      UserImages: {
        select: {
          urlImage: true,
        },
      },
      UserAdress: {
        select: {
          adress: true,
        },
      },
      UserPhones: {
        select: {
          phone: true,
        },
      },
    },
  });
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

export async function updateUserInfo(
  name: string,
  email: string,
  userId: number
) {
  await prisma.users.upsert({
    create: {
      name,
      email,
      password: "",
    },
    update: {
      name,
      email,
    },
    where: {
      id: userId,
    },
  });
}

export async function updateUserImage(urlImage: string, userId: number) {
  await prisma.userImages.upsert({
    create: {
      userId,
      urlImage,
    },
    update: {
      urlImage,
    },
    where: {
      userId,
    },
  });
}

export async function updateUserAdress(adress: string, userId: number) {
  await prisma.userAdress.upsert({
    create: {
      userId,
      adress,
    },
    update: {
      adress,
    },
    where: {
      userId,
    },
  });
}

export async function updateUserPhone(phone: string, userId: number) {
  await prisma.userPhones.upsert({
    create: {
      phone,
      userId,
    },
    update: {
      phone,
    },
    where: {
      userId,
    },
  });
}
