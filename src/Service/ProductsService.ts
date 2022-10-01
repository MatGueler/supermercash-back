//  * Functions
import * as productsRepository from "../Repository/ProductsRepository";

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

export async function getQuantifyByProduct(name: string, userId: number) {
  const product = await productsRepository.getProductIdByName(name);
  const quantifyProduct = await productsRepository.getQuantifyByProduct(
    product.id,
    userId
  );
  console.log(quantifyProduct);
  return quantifyProduct;
}
