import { Router } from "express";
import loginRouter from "./UserRouter";

const routes = Router();

routes.use(loginRouter);

export default routes;
