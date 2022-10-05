import prisma from "../Database/Prisma";
import { IPayment } from "../Types/PaymentType";

export async function createPayment(body: IPayment, userId: number) {
  await prisma.historic.create({
    data: {
      userId,
      quantifyProducts: body.quantifyProducts,
      purchaseValue: body.purchaseValue,
    },
  });
}

export async function deletePurchases(userId: number) {
  await prisma.historic.deleteMany({
    where: {
      userId,
    },
  });
}
