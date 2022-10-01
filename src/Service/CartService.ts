//  * Functions
import * as cartRepository from "../Repository/CartRepository";

//  # Libs

//  - Types

//  ! Errors

export async function getPurchaseValue(userId: number) {
  const purchaseValue = await cartRepository.getCartByUser(userId);
  //   const value = await purchaseValue.map(async (item) => {
  //     console.log(item);
  //   });
  return "purchaseValue";
}
