import * as questionsService from "../Service/QuestionsServices";
import { Request, Response } from "express";

export async function GetAllQuestionsWithAnswers(req: Request, res: Response) {
  const questions = await questionsService.getAllQuestions();
  res.status(200).send(questions);
}
