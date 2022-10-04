import { Router } from "express";
import {
  GetUserInfos,
  LoginUser,
  RegisterUser,
  UpdateUsersInfo,
} from "../Controller/UserController";
import { validateSchema } from "../Middlewares/ValidateSchemaMiddleware";
import registerSchema from "../Schemas/RegisterSchema";
import loginSchema from "../Schemas/LoginSchema";
import { validatingToken } from "../Middlewares/ValidateToken";
import UpdateUserSchema from "../Schemas/UpdateUserSchema";

const userRouter = Router();

userRouter.post("/sign-up", validateSchema(registerSchema), RegisterUser);
userRouter.post("/sign-in", validateSchema(loginSchema), LoginUser);
userRouter.get("/user/me", validatingToken, GetUserInfos);
userRouter.put(
  "/user/me",
  validatingToken,
  validateSchema(UpdateUserSchema),
  UpdateUsersInfo
);

export default userRouter;
