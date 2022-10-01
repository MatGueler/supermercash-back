import { Router } from "express";
import { GetCartValue } from "../Controller/CartController";
import { validatingToken } from "../Middlewares/ValidateToken";

const cartRouter = Router();

cartRouter.get("/cart", validatingToken, GetCartValue);

export default cartRouter;
