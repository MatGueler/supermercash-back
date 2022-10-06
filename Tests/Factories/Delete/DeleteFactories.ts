import prisma from "../../../src/Database/Prisma";

async function deleteAllData() {
  await prisma.$transaction([
    prisma.$executeRaw`DELETE FROM sessions`,
    prisma.$executeRaw`DELETE FROM users`,
  ]);
}

export const deleteFactory = {
  deleteAllData,
};
