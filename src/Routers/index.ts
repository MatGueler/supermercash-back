import { Router } from "express";
import cartRouter from "./CartRouter";
import paymentRouter from "./PaymentRouter";
import productsRouter from "./ProductsRouter";
import loginRouter from "./UserRouter";

const routes = Router();

routes.use(loginRouter);
routes.use(productsRouter);
routes.use(cartRouter);
routes.use(paymentRouter);

export default routes;
