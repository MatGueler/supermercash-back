import prisma from "../Database/Prisma";

export async function getAllProducts() {
  const products = await prisma.$queryRaw`
SELECT AVG(p.price) as "precoMedio", products.name,products."urlImage" FROM "productsMarkets" p
JOIN products ON p."productId"=products.id
GROUP BY p."productId",products.name,products."urlImage"`;
  return products;
}

export async function addProduct(name) {
  // await prisma.purchases.createMany;
}
