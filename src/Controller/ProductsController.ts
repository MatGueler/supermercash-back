import * as productsService from "../Service/ProductsService";
import { Request, Response } from "express";

export async function GetAllProducts(req: Request, res: Response) {
  const products = await productsService.getAllProducts();
  res.status(200).send(products);
}

export async function getOneProductById(req: Request, res: Response) {
  const id: string = req.params.id;
  const products = await productsService.getProduct(Number(id));
  res.status(200).send(products);
}

export async function getListProducts(req: Request, res: Response) {
  const name: string = req.params.product;
  const products = await productsService.getListProductsByName(name);
  res.status(200).send(products);
}

export async function AddProduct(req: Request, res: Response) {
  const body: { name: string } = req.body;
  const userId: number = res.locals.userId;
  await productsService.addProduct(body.name, userId);
  res.sendStatus(201);
}

export async function RemoveOneProduct(req: Request, res: Response) {
  const name: string = req.params.product;
  const userId: number = res.locals.userId;
  await productsService.removeOneProduct(name, userId);
  res.sendStatus(200);
}

export async function RemoveAllProducts(req: Request, res: Response) {
  const userId: number = res.locals.userId;
  await productsService.removeAllProducts(userId);
  res.sendStatus(200);
}

export async function getQuantifyByProduct(req: Request, res: Response) {
  const name: string = req.params.product;
  const userId: number = res.locals.userId;
  const quantify = await productsService.getQuantifyByProduct(name, userId);
  res.status(200).send(quantify);
}

export async function GetQuantifyProductisHistoric(
  req: Request,
  res: Response
) {
  const userId: number = res.locals.userId;
  const quantify = await productsService.getQuantifyProductisHistoric(userId);
  res.status(200).send(quantify);
}
