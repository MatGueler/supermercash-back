import { Router } from "express";
import {
  AddProduct,
  GetAllProducts,
  getListProducts,
  getQuantifyByProduct,
  GetQuantifyProductisHistoric,
  RemoveAllProducts,
  RemoveOneProduct,
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
productsRouter.get("/products/:product", getListProducts);
productsRouter.delete("/products/delete", validatingToken, RemoveAllProducts);
productsRouter.delete(
  "/products/delete/:product",
  validatingToken,
  RemoveOneProduct
);
productsRouter.get(
  "/products/historic",
  validatingToken,
  GetQuantifyProductisHistoric
);

export default productsRouter;
