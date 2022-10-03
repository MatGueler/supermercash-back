//  * Functions
import * as productsRepository from "../Repository/ProductsRepository";
import { notFoundError } from "../Utils/ErrorUtils";

//  # Libs

//  - Types

//  ! Errors

export async function getAllProducts() {
  const products = await productsRepository.getAllProducts();
  return products;
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
  verifyProductExistInCart(firstProduct);
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
