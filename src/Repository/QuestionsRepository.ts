import prisma from "../Database/Prisma";

export async function getQuestionsAndAnswers() {
  const questionsAnswers = await prisma.questions.findMany({
    select: {
      id: true,
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

export async function getQuestionsLikes(questionId: number) {
  const questionsAnswers = await prisma.assessments.count({
    where: { 
      questionId,
    },
  });

  return questionsAnswers;
}
