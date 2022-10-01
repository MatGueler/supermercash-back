import prisma from "../Database/Prisma";

export async function getAllProducts() {
  const products = await prisma.$queryRaw`
SELECT AVG(p.price) as "precoMedio", products.name,products."urlImage" FROM "productsMarkets" p
JOIN products ON p."productId"=products.id
GROUP BY p."productId",products.name,products."urlImage"`;
  return products;
}

export async function addProduct(productId: number, userId: number) {
  await prisma.purchases.create({
    data: { productId, userId },
  });
}

export async function getProductIdByName(name: string) {
  const id = await prisma.products.findFirst({ where: { name } });
  return id;
}

export async function getQuantifyByProduct(productId: number, userId: number) {
  const quantify = await prisma.purchases.aggregate({
    where: { productId, userId },
    _count:true
  });
  return quantify;
}
