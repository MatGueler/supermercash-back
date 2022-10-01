import * as productsService from "../Service/ProductsService";
import { Request, Response } from "express";

export async function GetAllProducts(req: Request, res: Response) {
  const products = await productsService.getAllProducts();
  res.status(200).send(products);
}

export async function AddProduct(req: Request, res: Response) {
  const body: { name: string } = req.body;
  await productsService.addProduct(body.name);
  res.sendStatus(201);
}
