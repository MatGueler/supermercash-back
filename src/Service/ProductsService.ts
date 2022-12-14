//  * Functions
import * as productsRepository from "../Repository/ProductsRepository";
import { notFoundError, unauthorizedError } from "../Utils/ErrorUtils";

//  # Libs

//  - Types

//  ! Errors

export async function getAllProducts() {
  const products = await productsRepository.getAllProducts();
  return products;
}

export async function getProduct(id: number) {
  const products = await productsRepository.GetProductById(id);
  return products;
}

export async function getListProductsByName(name: string) {
  const products = await productsRepository.getListProductsByName(name);
  return products;
}

export async function getQuantifyProductisHistoric(userId: number) {
  const products = await productsRepository.getQuantifyProductisHistoric(
    userId
  );
  if (products[0]) {
    const quantifyProducts = products[0]._sum.quantifyProducts;
    return { quantifyProducts };
  }

  return { quantifyProducts: "" };
}

export async function addProduct(name: string, userId: number) {
  const product = await productsRepository.getProductIdByName(name);
  await productsRepository.addProduct(product.id, userId);
}

export async function removeOneProduct(productName: string, userId: number) {
  const product = await productsRepository.getProductIdByName(productName);
  const firstProduct = await productsRepository.getFirstProduct(
    product.id,
    userId
  );
  await verifyProductExistInCart(firstProduct);
  await productsRepository.removeOneProduct(firstProduct.id);
}

export async function removeAllProducts(userId: number) {
  await productsRepository.removeAllProducts(userId);
}

export async function getQuantifyByProduct(name: string, userId: number) {
  const product = await productsRepository.getProductIdByName(name);
  const quantifyProduct = await productsRepository.getQuantifyByProduct(
    product.id,
    userId
  );
  return quantifyProduct;
}

async function verifyProductExistInCart(firstProduct: any) {
  if (!firstProduct) {
    throw notFoundError("Your cart does not own this product");
  }
}
