//  * Functions
import * as questionsRepository from "../Repository/QuestionsRepository";
import { conflictError, wrongSchemaError } from "../Utils/ErrorUtils";

export async function getAllQuestions() {
  const questionsAndAnswers =
    await questionsRepository.getQuestionsAndAnswers();
  const assessmentsByQuestions = await Promise.all(
    questionsAndAnswers.map(async (question) => {
      const questionId = question.id;
      const assesments = await questionsRepository.getQuestionsLikes(
        questionId
      );
      return {
        question: question.question,
        answer: question.Answers ?? "",
        likes: assesments,
        dislikes: 0,
      };
    })
  );
  return assessmentsByQuestions;
}
