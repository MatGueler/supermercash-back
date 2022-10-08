import { Router } from "express";
import {
  AddProduct,
  GetAllProducts,
  getListProducts,
  getOneProductById,
  getQuantifyByProduct,
  GetQuantifyProductisHistoric,
  RemoveAllProducts,
  RemoveOneProduct,
} from "../Controller/ProductsController";
import { validatingToken } from "../Middlewares/ValidateToken";
import { GetProductById } from "../Repository/ProductsRepository";

const productsRouter = Router();

productsRouter.get(
  "/products/historic",
  validatingToken,
  GetQuantifyProductisHistoric
);
productsRouter.get("/products", GetAllProducts);
productsRouter.get("/product/:id", getOneProductById);
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

export default productsRouter;
