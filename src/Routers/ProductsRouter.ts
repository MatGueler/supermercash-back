import { Router } from "express";
import { GetAllProducts } from "../Controller/ProductsController";

const productsRouter = Router();

productsRouter.get("/products", GetAllProducts);

export default productsRouter;
