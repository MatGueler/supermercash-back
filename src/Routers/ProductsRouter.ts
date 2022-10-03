import { Router } from "express";
import {
  AddProduct,
  GetAllProducts,
  getQuantifyByProduct,
  RemoveAllProducts,
} from "../Controller/ProductsController";
import { validatingToken } from "../Middlewares/ValidateToken";

const productsRouter = Router();

productsRouter.get("/products", GetAllProducts);
productsRouter.post("/products", validatingToken, AddProduct);
productsRouter.get(
  "/products/quantify/:product",
  validatingToken,
  getQuantifyByProduct
);
productsRouter.delete("/products/delete", validatingToken, RemoveAllProducts);

export default productsRouter;
