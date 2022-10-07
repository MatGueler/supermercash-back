import * as cartService from "../Service/CartService";
import { Request, Response } from "express";

export async function GetCartValue(req: Request, res: Response) {
  const userId: number = res.locals.userId;
  const purchaseValue = await cartService.getPurchaseValue(userId);
  res.status(200).send(purchaseValue);
}

export async function GetCartQuantifyProducts(req: Request, res: Response) {
  const userId: number = res.locals.userId;
  const cartProductsQuantify = await cartService.getCartProductsQuantify(
    userId
  );
  res.status(200).send({ quantify: cartProductsQuantify });
}
