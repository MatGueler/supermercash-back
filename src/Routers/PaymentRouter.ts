import { Router } from "express";
import { CreatePayment } from "../Controller/PaymentController";
import { validatingToken } from "../Middlewares/ValidateToken";

const paymentRouter = Router();

paymentRouter.get("/payment", validatingToken, CreatePayment);

export default paymentRouter;
