import { Router } from "express";
import { GetAllQuestionsWithAnswers } from "../Controller/QuestionsController";

const questionsRouter = Router();

questionsRouter.get("/questions", GetAllQuestionsWithAnswers);

export default questionsRouter;
