import * as paymentService from "../Service/PaymentService";
import { Request, Response } from "express";
import { IPayment } from "../Types/PaymentType";

export async function CreatePayment(req: Request, res: Response) {
  const body: IPayment = req.body;
  const userId: number = res.locals.userId;
  await paymentService.makePayment(body, userId);
  res.sendStatus(200);
}
