import * as questionsService from "../Service/QuestionsServices";
import { Request, Response } from "express";

export async function GetAllQuestionsWithAnswers(req: Request, res: Response) {
  const questions = await questionsService.getAllQuestions();
  res.status(200).send(questions);
}

export async function PostNewQuestion(req: Request, res: Response) {
  const { question }: { question: string } = req.body;
  const userId: number = res.locals.userId;
  await questionsService.CreateNewQuestion(question, userId);
  res.status(200).send("Pergunta enviada!");
}
