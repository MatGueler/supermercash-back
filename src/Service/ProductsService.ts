//  * Functions
import * as productsRepository from "../Repository/ProductsRepository";

//  # Libs

//  - Types

//  ! Errors

export async function getAllProducts() {
  const products = await productsRepository.getAllProducts();
  return products;
}

export async function addProduct(name: string) {
  await productsRepository.addProduct(name)
}
