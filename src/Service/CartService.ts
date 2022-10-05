//  * Functions
import * as cartRepository from "../Repository/CartRepository";

export async function getPurchaseValue(userId: number) {
  const cartProducts = await cartRepository.getCartByUser(userId);
  const supermarkets = await cartRepository.getSupermarkets();
  const totalValueCarts = await getAllCartValue(supermarkets, cartProducts);
  const ordenedValuesCarts = await orderValuesCarts(totalValueCarts);
  return ordenedValuesCarts;
}

async function orderValuesCarts(totalValueCarts: any) {
  let hashTable = {};
  const ordenedValues = [];
  for (let counter = 0; counter < totalValueCarts.length; counter++) {
    hashTable[totalValueCarts[counter].total] = true;
  }

  const arrayHash = Object.keys(hashTable);

  for (let outer = 0; outer < arrayHash.length; outer++) {
    for (let inner = 0; inner < totalValueCarts.length; inner++) {
      if (totalValueCarts[inner].total === Number(arrayHash[outer])) {
        ordenedValues.push(totalValueCarts[inner]);
      }
    }
  }
  return ordenedValues;
}

async function getAllCartValue(supermarkets: any, purchaseValue: any) {
  const result = await Promise.all(
    supermarkets.map(async (supermarket: { id: number; name: string }) => {
      let sum = 0;
      const value = await Promise.all(
        purchaseValue.map(
          async (item: {
            userId: number;
            productId: number;
            productName: string;
            quantify: number;
          }) => {
            const getPrice = await cartRepository.getPriceBySupermarket(
              supermarket.id,
              item.productId
            );
            sum += Number(getPrice.price) * Number(item.quantify);
          }
        )
      );
      return { total: sum, supermarket: supermarket.name };
    })
  );
  return result;
}

export async function getCartProductsQuantify(userId: number) {
  const cartQuantifyProducts = await cartRepository.getCartProductsQuantify(
    userId
  );
  console.log(cartQuantifyProducts);
  return cartQuantifyProducts;
}
