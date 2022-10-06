import prisma from "../../../src/Database/Prisma";
import { faker } from "@faker-js/faker";

async function CreateRandomUser() {
  const password = faker.lorem.word(6);
  return {
    name: faker.lorem.words(3),
    email: faker.internet.email(),
    password,
    confirmPassword: password,
  };
}

// async function createRandomRecomendationAndPost() {
//   const randomRecommendation = {
//     name: faker.lorem.words(3),
//     youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y",
//   };
//   await prisma.recommendation.create({ data: randomRecommendation });
// }

// async function createBadRecomendation() {
//   return {
//     name: faker.lorem.words(3),
//     youtubeLink: "asdfdsf",
//   };
// }

export const generateFactory = {
  CreateRandomUser,
};
