import { Router } from "express";
import {
  GetCartQuantifyProducts,
  GetCartValue,
} from "../Controller/CartController";
import { validatingToken } from "../Middlewares/ValidateToken";

const cartRouter = Router();

cartRouter.get("/cart", validatingToken, GetCartValue);
cartRouter.get("/cart/products", validatingToken, GetCartQuantifyProducts);

export default cartRouter;
