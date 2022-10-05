import { Router } from "express";
import { CreatePayment } from "../Controller/PaymentController";
import { validateSchema } from "../Middlewares/ValidateSchemaMiddleware";
import { validatingToken } from "../Middlewares/ValidateToken";
import paymentSchema from "../Schemas/PaymentSchema";

const paymentRouter = Router();

paymentRouter.post(
  "/payment",
  validateSchema(paymentSchema),
  validatingToken,
  CreatePayment
);

export default paymentRouter;
