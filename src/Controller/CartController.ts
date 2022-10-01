import * as cartService from "../Service/CartService";
import { Request, Response } from "express";

export async function GetCartValue(req: Request, res: Response) {
  const userId: number = res.locals.userId;
  const purchaseValue = await cartService.getPurchaseValue(userId);
  res.status(200).send(purchaseValue);
}
