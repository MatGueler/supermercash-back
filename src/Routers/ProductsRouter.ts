import { Router } from "express";
import { AddProduct, GetAllProducts } from "../Controller/ProductsController";
import { validatingToken } from "../Middlewares/ValidateToken";

const productsRouter = Router();

productsRouter.get("/products", GetAllProducts);
productsRouter.post("/products", validatingToken, AddProduct);

export default productsRouter;
