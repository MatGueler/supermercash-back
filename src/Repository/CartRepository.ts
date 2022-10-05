import prisma from "../Database/Prisma";

export async function getCartByUser(userId: number) {
  const purchaseValue: [] = await prisma.$queryRaw`
SELECT p."userId",p."productId",products.name as "productName",COUNT(p."productId") as quantify
FROM purchases p
JOIN products ON p."productId" = products.id
WHERE p."userId"=${userId}
GROUP BY p."productId",p."userId",products.name`;
  return purchaseValue;
}

export async function getSupermarkets() {
  const supermarkets = await prisma.supermarkets.findMany({});
  return supermarkets;
}

export async function getPriceBySupermarket(
  supermarketId: number,
  productId: number
) {
  const supermarkets = await prisma.productsMarkets.findFirst({
    where: { supermarketId, productId },
    select: {
      price: true,
    },
  });
  return supermarkets;
}

export async function getCartProductsQuantify(userId: number) {
  const cartProductsQuantify = await prisma.purchases.count({
    where: { userId },
  });
  return cartProductsQuantify;
}
