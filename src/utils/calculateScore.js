function calculateScore(userAnswers, quizzes) {
  let correctScore = 0;
  let incorrectScore = 0;

  // get quizzes correct optionIds and quiz id
  let correctQuizzes = quizzes.map((quizz) => {
    let correctOptionIds = [];
    quizz.options.map((option) => {
      if (option.isCorrect) {
        correctOptionIds.push(option.id);
      }
    });
    return {
      quizzId: quizz.id,
      correctOptionIds,
    };
  });

  // calculate right answer and wrong answer
  userAnswers.map((answer) => {
    const { questionId, selectedOptionIds } = answer;
    correctQuizzes.forEach((correctQuiz) => {
      if (correctQuiz.quizzId === questionId) {
        const correctOptionsString = correctQuiz.correctOptionIds.join(",");
        const selectedOptionsString = selectedOptionIds.join(",");
        if (correctOptionsString === selectedOptionsString) {
          correctScore++;
        } else {
          incorrectScore++;
        }
      }
    });
  });

  return { correctScore, incorrectScore };
}

export default calculateScore;
