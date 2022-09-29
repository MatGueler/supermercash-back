import { Router } from "express";
import { LoginUser, RegisterUser } from "../Controller/LoginController";
import { validateSchema } from "../Middlewares/ValidateSchemaMiddleware";
import registerSchema from "../Schemas/RegisterSchema";

const userRouter = Router();

userRouter.post("/sign-up", validateSchema(registerSchema), RegisterUser);
userRouter.post("/sign-in", LoginUser);

export default userRouter;
