//  * Functions
import * as questionsRepository from "../Repository/QuestionsRepository";
import { conflictError, wrongSchemaError } from "../Utils/ErrorUtils";

export async function getAllQuestions() {
  const questionsAndAnswers =
    await questionsRepository.getQuestionsAndAnswers();
  return questionsAndAnswers;
}
