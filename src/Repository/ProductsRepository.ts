import prisma from "../Database/Prisma";

export async function getAllProducts() {
  const products = await prisma.$queryRaw`
SELECT AVG(p.price) as "precoMedio", products.name,products."urlImage" FROM "productsMarkets" p
JOIN products ON p."productId"=products.id
GROUP BY p."productId",products.name,products."urlImage"`;
  return products;
}

export async function getListProductsByName(name:string) {
  const products = prisma.products.findMany({
    where: {
      name: {
        contains: name,
        mode: "insensitive",
      },
    },
  });
  return products;
}

export async function addProduct(productId: number, userId: number) {
  await prisma.purchases.create({
    data: { productId, userId },
  });
}

export async function getFirstProduct(productId: number, userId: number) {
  const firstProduct = await prisma.purchases.findFirst({
    where: { productId, userId },
  });
  return firstProduct;
}

export async function removeOneProduct(firstProductId: number) {
  await prisma.purchases.delete({
    where: {
      id: firstProductId,
    },
  });
}

export async function removeAllProducts(userId: number) {
  await prisma.purchases.deleteMany({ where: { userId } });
}

export async function getProductIdByName(name: string) {
  const id = await prisma.products.findFirst({ where: { name } });
  return id;
}

export async function getQuantifyByProduct(productId: number, userId: number) {
  const quantify = await prisma.purchases.aggregate({
    where: { productId, userId },
    _count: true,
  });
  return quantify;
}

export async function getQuantifyProductisHistoric(userId: number) {
  const quantify = await prisma.historic.groupBy({
    by: ["userId"],
    where: { userId },
    _sum: {
      quantifyProducts: true,
    },
  });
  return quantify;
}
