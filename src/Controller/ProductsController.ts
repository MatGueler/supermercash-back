import * as productsService from "../Service/ProductsService";
import { Request, Response } from "express";

export async function GetAllProducts(req: Request, res: Response) {
  const products = await productsService.getAllProducts();
  res.status(200).send(products);
}

export async function AddProduct(req: Request, res: Response) {
  const body: { name: string } = req.body;
  const userId: number = res.locals.userId;
  await productsService.addProduct(body.name, userId);
  res.sendStatus(201);
}

export async function getQuantifyByProduct(req: Request, res: Response) {
  const body: { name: string } = req.body;
  const userId: number = res.locals.userId;
  const quantify = await productsService.getQuantifyByProduct(
    body.name,
    userId
  );
  res.status(200).send(quantify);
}
