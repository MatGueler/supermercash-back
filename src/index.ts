import express from "express";
import cors from "cors";
import "express-async-errors";
import { errorHandlerMiddleware } from "./Middlewares/errorHandler";
import routes from "./Routers/index";

const server = express();
server.use(express.json());
server.use(cors());
server.use(routes);
server.use(errorHandlerMiddleware);

export default server;
