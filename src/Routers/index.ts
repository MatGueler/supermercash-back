import { Router } from "express";
import productsRouter from "./ProductsRouter";
import loginRouter from "./UserRouter";

const routes = Router();

routes.use(loginRouter);
routes.use(productsRouter);

export default routes;
