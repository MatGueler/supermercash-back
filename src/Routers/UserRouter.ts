import { Router } from "express";
import { LoginUser } from "../Controller/LoginController";

const userRouter = Router();

userRouter.post("/sign-in", LoginUser);

export default userRouter;
