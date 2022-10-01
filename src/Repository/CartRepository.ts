import prisma from "../Database/Prisma";

export async function getCartByUser(userId: number) {
  const purchaseValue:[] = await prisma.$queryRaw`
SELECT p."userId",p."productId",products.name as "productName",COUNT(p."productId") as quantify
FROM purchases p
JOIN products ON p."productId" = products.id
WHERE p."userId"=${userId}
GROUP BY p."productId",p."userId",products.name`;
  return purchaseValue;
}
