//  * Functions
import * as paymentRepository from "../Repository/PaymentRepository";
import { getUserById } from "../Repository/UserRepository";
import { IPayment } from "../Types/PaymentType";
import { verifyPassword } from "./UserService";

export async function makePayment(body: IPayment, userId: number) {
  const user = await getUserById(userId);
  await verifyPassword(body.password, user.password);
  await paymentRepository.createPayment(body, userId);
  await paymentRepository.deletePurchases(userId);
}
