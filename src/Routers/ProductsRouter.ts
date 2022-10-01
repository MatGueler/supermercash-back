import { Router } from "express";
import {
  AddProduct,
  GetAllProducts,
  getQuantifyByProduct,
} from "../Controller/ProductsController";
import { validatingToken } from "../Middlewares/ValidateToken";

const productsRouter = Router();

productsRouter.get("/products", GetAllProducts);
productsRouter.post("/products", validatingToken, AddProduct);
productsRouter.get("/products/quantify", validatingToken, getQuantifyByProduct);

export default productsRouter;
