import { Router } from "express";
import { LoginUser, RegisterUser } from "../Controller/UserController";
import { validateSchema } from "../Middlewares/ValidateSchemaMiddleware";
import registerSchema from "../Schemas/RegisterSchema";
import loginSchema from "../Schemas/LoginSchema";

const userRouter = Router();

userRouter.post("/sign-up", validateSchema(registerSchema), RegisterUser);
userRouter.post("/sign-in", validateSchema(loginSchema), LoginUser);

export default userRouter;
