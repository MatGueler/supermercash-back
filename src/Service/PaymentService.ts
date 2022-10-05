//  * Functions
import * as paymentRepository from "../Repository/PaymentRepository";
import { getUserById } from "../Repository/UserRepository";
import { IPayment } from "../Types/PaymentType";
import { conflictError, wrongSchemaError } from "../Utils/ErrorUtils";
import { verifyPassword } from "./UserService";

export async function makePayment(body: IPayment, userId: number) {
  const user = await getUserById(userId);
  verifyCartIsEmpy(body.quantifyProducts);
  await verifyPassword(body.password, user.password);
  await paymentRepository.createPayment(body, userId);
  await paymentRepository.deletePurchases(userId);
}

function verifyCartIsEmpy(quantifyProducts: number) {
  if (quantifyProducts === 0) {
    throw wrongSchemaError("Cart can't be empty");
  }
}
