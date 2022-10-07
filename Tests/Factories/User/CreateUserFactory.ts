import prisma from "../../../src/Database/Prisma";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

async function CreateRandomUser() {
  const password = faker.lorem.word(6);
  return {
    name: faker.lorem.words(3),
    email: faker.internet.email(),
    password,
    confirmPassword: password,
  };
}

async function CreateRandomUserInfos() {
  return {
    name: faker.lorem.words(3),
    email: faker.internet.email(),
    adress: faker.random.words(2),
    phone: faker.random.numeric(11),
  };
}

async function CreateUrlImage() {
  return String(faker.internet.url);
}

async function CreateRandomId() {
  const id = faker.random.numeric();
  return Number(id);
}

async function EncryptPassword(password: string) {
  const SALT = 10;
  const cryptPassword = bcrypt.hashSync(password, SALT);
  return cryptPassword;
}

export const generateFactory = {
  CreateRandomUser,
  EncryptPassword,
  CreateRandomId,
  CreateRandomUserInfos,
  CreateUrlImage,
};
