import { Router } from "express";
import {
  GetUserInfos,
  LoginUser,
  OAuthLogin,
  OAuthRegister,
  RegisterUser,
  UpdateUserImage,
  UpdateUsersInfo,
} from "../Controller/UserController";
import { validateSchema } from "../Middlewares/ValidateSchemaMiddleware";
import registerSchema from "../Schemas/RegisterSchema";
import loginSchema from "../Schemas/LoginSchema";
import { validatingToken } from "../Middlewares/ValidateToken";
import UpdateUserSchema from "../Schemas/UpdateUserSchema";
import UpdateUserImageSchema from "../Schemas/UpdateUserImageSchema";

const userRouter = Router();

userRouter
  .post("/sign-up", validateSchema(registerSchema), RegisterUser)
  .post("/sign-in", validateSchema(loginSchema), LoginUser)
  .get("/user/me", validatingToken, GetUserInfos)
  .put(
    "/user/me",
    validatingToken,
    validateSchema(UpdateUserSchema),
    UpdateUsersInfo
  )
  .put(
    "/user/me/image",
    validatingToken,
    validateSchema(UpdateUserImageSchema),
    UpdateUserImage
  )
  .post("/login", OAuthLogin)
  .post("/auth/register", OAuthRegister);

export default userRouter;
