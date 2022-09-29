import { Router } from "express";
import { LoginUser, RegisterUser } from "../Controller/LoginController";

const userRouter = Router();

userRouter.post("/sign-up", RegisterUser);
userRouter.post("/sign-in", LoginUser);

export default userRouter;
