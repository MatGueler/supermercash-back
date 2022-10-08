import prisma from "../src/Database/Prisma";

async function main() {
  createProducts();
  createSupermarkets();
  // createProductsMarkets();
}
async function createSupermarkets() {
  await prisma.supermarkets.upsert({
    where: { name: "Perim" },
    update: {},
    create: { name: "Perim" },
  });
  await prisma.supermarkets.upsert({
    where: { name: "Carone" },
    update: {},
    create: { name: "Carone" },
  });
  await prisma.supermarkets.upsert({
    where: { name: "Extra" },
    update: {},
    create: { name: "Extra" },
  });
  await prisma.supermarkets.upsert({
    where: { name: "Atacadão" },
    update: {},
    create: { name: "Atacadão" },
  });
  await prisma.supermarkets.upsert({
    where: { name: "Casagrande" },
    update: {},
    create: { name: "Casagrande" },
  });
  await prisma.supermarkets.upsert({
    where: { name: "Calvi" },
    update: {},
    create: { name: "Calvi" },
  });
}

async function createProducts() {
  await prisma.products.upsert({
    where: {
      name: "Negresco",
    },
    update: {},
    create: {
      name: "Negresco",
      urlImage:
        "https://cf.shopee.com.br/file/88996460900e006b53a7b0deb4cb9154",
    },
  });

  await prisma.products.upsert({
    where: {
      name: "Leite",
    },
    update: {},
    create: {
      name: "Leite",
      urlImage:
        "https://m.media-amazon.com/images/I/51wNnRI8zTL._AC_SX385_.jpg",
    },
  });

  await prisma.products.upsert({
    where: {
      name: "Pringles",
    },
    update: {},
    create: {
      name: "Pringles",
      urlImage:
        "https://www.imigrantesbebidas.com.br/bebida/images/products/full/54001-batata-pringles-original-114g.jpg",
    },
  });

  await prisma.products.upsert({
    where: {
      name: "Skol Beats",
    },
    update: {},
    create: {
      name: "Skol Beats",
      urlImage:
        "https://a-static.mlcdn.com.br/800x560/skol-beats-senses-long-neck-313ml-pack-6-unidades/flordepitangah/3b011852c7c211ebb5204201ac18500e/f3ea5a6e595e62798291da10cf20fd10.jpeg",
    },
  });

  await prisma.products.upsert({
    where: {
      name: "Leite condensado",
    },
    update: {},
    create: {
      name: "Leite condensado",
      urlImage: "https://static.paodeacucar.com/img/uploads/1/667/20081667.jpg",
    },
  });

  await prisma.products.upsert({
    where: {
      name: "Skol lata",
    },
    update: {},
    create: {
      name: "Skol lata",
      urlImage:
        "https://www.bistek.com.br/media/catalog/product/cache/15b2f1f06e1cd470c80b1f3fd7ec8301/9/9/990574.jpg",
    },
  });

  await prisma.products.upsert({
    where: {
      name: "Sucrilhos",
    },
    update: {},
    create: {
      name: "Sucrilhos",
      urlImage:
        "https://http2.mlstatic.com/D_NQ_NP_2X_858458-MLA45994361397_052021-V.webp",
    },
  });
}

async function createProductsMarkets() {
  await prisma.productsMarkets.create({
    data: { productId: 1, supermarketId: 1, price: 2 },
  });
  await prisma.productsMarkets.create({
    data: { productId: 1, supermarketId: 1, price: 4 },
  });
  await prisma.productsMarkets.create({
    data: { productId: 2, supermarketId: 1, price: 22 },
  });
  await prisma.productsMarkets.create({
    data: { productId: 3, supermarketId: 1, price: 23.5 },
  });
  await prisma.productsMarkets.create({
    data: { productId: 4, supermarketId: 1, price: 26 },
  });
  await prisma.productsMarkets.create({
    data: { productId: 5, supermarketId: 1, price: 27 },
  });
  await prisma.productsMarkets.create({
    data: { productId: 6, supermarketId: 1, price: 28 },
  });
  await prisma.productsMarkets.create({
    data: { productId: 7, supermarketId: 1, price: 29.99 },
  });

  await prisma.productsMarkets.create({
    data: { productId: 1, supermarketId: 2, price: 25 },
  });
  await prisma.productsMarkets.create({
    data: { productId: 1, supermarketId: 2, price: 20 },
  });
  await prisma.productsMarkets.create({
    data: { productId: 2, supermarketId: 2, price: 26 },
  });
  await prisma.productsMarkets.create({
    data: { productId: 3, supermarketId: 2, price: 10 },
  });
  await prisma.productsMarkets.create({
    data: { productId: 4, supermarketId: 2, price: 11 },
  });
  await prisma.productsMarkets.create({
    data: { productId: 5, supermarketId: 2, price: 62.5 },
  });
  await prisma.productsMarkets.create({
    data: { productId: 6, supermarketId: 2, price: 65.99 },
  });
  await prisma.productsMarkets.create({
    data: { productId: 7, supermarketId: 2, price: 54.3 },
  });

  await prisma.productsMarkets.create({
    data: { productId: 1, supermarketId: 3, price: 32.4 },
  });
  await prisma.productsMarkets.create({
    data: { productId: 1, supermarketId: 3, price: 12 },
  });
  await prisma.productsMarkets.create({
    data: { productId: 2, supermarketId: 3, price: 150 },
  });
  await prisma.productsMarkets.create({
    data: { productId: 3, supermarketId: 3, price: 94 },
  });
  await prisma.productsMarkets.create({
    data: { productId: 4, supermarketId: 3, price: 99.99 },
  });
  await prisma.productsMarkets.create({
    data: { productId: 5, supermarketId: 3, price: 45 },
  });
  await prisma.productsMarkets.create({
    data: { productId: 6, supermarketId: 3, price: 4 },
  });
  await prisma.productsMarkets.create({
    data: { productId: 7, supermarketId: 3, price: 2 },
  });

  await prisma.productsMarkets.create({
    data: { productId: 1, supermarketId: 4, price: 1 },
  });
  await prisma.productsMarkets.create({
    data: { productId: 1, supermarketId: 4, price: 23 },
  });
  await prisma.productsMarkets.create({
    data: { productId: 2, supermarketId: 4, price: 3 },
  });
  await prisma.productsMarkets.create({
    data: { productId: 3, supermarketId: 4, price: 13 },
  });
  await prisma.productsMarkets.create({
    data: { productId: 4, supermarketId: 4, price: 41 },
  });
  await prisma.productsMarkets.create({
    data: { productId: 5, supermarketId: 4, price: 69 },
  });
  await prisma.productsMarkets.create({
    data: { productId: 6, supermarketId: 4, price: 85.6 },
  });
  await prisma.productsMarkets.create({
    data: { productId: 7, supermarketId: 4, price: 54 },
  });

  await prisma.productsMarkets.create({
    data: { productId: 1, supermarketId: 5, price: 7.65 },
  });
  await prisma.productsMarkets.create({
    data: { productId: 1, supermarketId: 5, price: 78.54 },
  });
  await prisma.productsMarkets.create({
    data: { productId: 2, supermarketId: 5, price: 55 },
  });
  await prisma.productsMarkets.create({
    data: { productId: 3, supermarketId: 5, price: 10 },
  });
  await prisma.productsMarkets.create({
    data: { productId: 4, supermarketId: 5, price: 2 },
  });
  await prisma.productsMarkets.create({
    data: { productId: 5, supermarketId: 5, price: 2 },
  });
  await prisma.productsMarkets.create({
    data: { productId: 6, supermarketId: 5, price: 3 },
  });
  await prisma.productsMarkets.create({
    data: { productId: 7, supermarketId: 5, price: 5 },
  });

  await prisma.productsMarkets.create({
    data: { productId: 1, supermarketId: 6, price: 4 },
  });
  await prisma.productsMarkets.create({
    data: { productId: 1, supermarketId: 6, price: 85 },
  });
  await prisma.productsMarkets.create({
    data: { productId: 2, supermarketId: 6, price: 120.65 },
  });
  await prisma.productsMarkets.create({
    data: { productId: 3, supermarketId: 6, price: 65.41 },
  });
  await prisma.productsMarkets.create({
    data: { productId: 4, supermarketId: 6, price: 45 },
  });
  await prisma.productsMarkets.create({
    data: { productId: 5, supermarketId: 6, price: 12 },
  });
  await prisma.productsMarkets.create({
    data: { productId: 6, supermarketId: 6, price: 27 },
  });
  await prisma.productsMarkets.create({
    data: { productId: 7, supermarketId: 6, price: 29 },
  });
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
