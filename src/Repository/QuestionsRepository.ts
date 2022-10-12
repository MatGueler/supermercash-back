import prisma from "../Database/Prisma";

export async function getQuestionsAndAnswers() {
  const questionsAnswers = await prisma.questions.findMany({
    select: {
      question: true,
      Answers: {
        select: {
          answer: true,
        },
      },
    },
  });

  return questionsAnswers;
}
