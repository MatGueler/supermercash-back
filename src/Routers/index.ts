import { Router } from "express";
import loginRouter from "./LoginRouter";

const routes = Router();

routes.use(loginRouter);

export default routes;
