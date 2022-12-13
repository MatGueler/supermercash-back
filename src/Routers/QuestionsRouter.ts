import { Router } from "express";
import {
  GetAllQuestionsWithAnswers,
  PostNewQuestion,
} from "../Controller/QuestionsController";
import { validateSchema } from "../Middlewares/ValidateSchemaMiddleware";
import { validatingToken } from "../Middlewares/ValidateToken";
import questionSchema from "../Schemas/QuestionSchema";

const questionsRouter = Router();

questionsRouter.get("/questions", GetAllQuestionsWithAnswers);
questionsRouter.post(
  "/questions",
  validateSchema(questionSchema),
  validatingToken,
  PostNewQuestion
);

export default questionsRouter;
