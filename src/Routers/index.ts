import { Router } from "express";
import cartRouter from "./CartRouter";
import productsRouter from "./ProductsRouter";
import loginRouter from "./UserRouter";

const routes = Router();

routes.use(loginRouter);
routes.use(productsRouter);
routes.use(cartRouter);

export default routes;
