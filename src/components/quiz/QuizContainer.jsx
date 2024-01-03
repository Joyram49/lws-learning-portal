import { useEffect, useState } from "react";
import { useAddQuizMarksMutation } from "../../features/quizMark/quizMarkApi";
import { useSelector } from "react-redux";
import calculateScore from "../../utils/calculateScore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

//  userAnswers = [
//   {questionId: 1, selectedOptionsId: [1, 2]},
//   {questionId: 2, selectedOptionsId: [ 2]},
//   {questionId: 2, selectedOptionsId: [ 2, 4]},
// ]

export default function QuizContainer({ quizzes = [], videoId, title }) {
  const [userAnswers, setUserAnswers] = useState([]);
  const [isActive, setIsActive] = useState(false);

  // get user information
  const { user } = useSelector((state) => state.auth);
  const { id: userId, name } = user || {};

  const [addQuizMarks, { isLoading, isSuccess, isError, error }] =
    useAddQuizMarksMutation();
  const navigate = useNavigate();

  // Handle select function after clicking onChange
  const handleAnswerSelection = (questionId, selectedOptionId) => {
    const updatedAnswers = [...userAnswers];
    const existingAnswerIndex = updatedAnswers.findIndex(
      (answer) => answer.questionId === questionId
    );

    if (existingAnswerIndex !== -1) {
      // Toggle the selection for checkboxes
      const selectedOptionIndex =
        updatedAnswers[existingAnswerIndex].selectedOptionIds.indexOf(
          selectedOptionId
        );

      if (selectedOptionIndex !== -1) {
        // If the option is already selected, remove it
        updatedAnswers[existingAnswerIndex].selectedOptionIds.splice(
          selectedOptionIndex,
          1
        );
        if (
          updatedAnswers[existingAnswerIndex].selectedOptionIds.length === 0
        ) {
          updatedAnswers.splice(existingAnswerIndex, 1);
        }
      } else {
        // If the option is not selected, add it
        updatedAnswers[existingAnswerIndex].selectedOptionIds.push(
          selectedOptionId
        );
      }
    } else {
      // Add new answer
      updatedAnswers.push({
        questionId,
        selectedOptionIds: [selectedOptionId],
      });
    }
    setUserAnswers(updatedAnswers);
  };

  // handle Submit function
  const submitQuiz = (e, userAnswers) => {
    e.preventDefault();
    const formattedUserAnswers = userAnswers.map((answer) => ({
      questionId: answer.questionId,
      selectedOptionsId: answer.selectedOptionIds,
    }));

    // calculate result (user quiz mark)
    let totalMark = quizzes?.length * 5;
    let totalQuiz = quizzes?.length;
    let totalCorrect = calculateScore(userAnswers, quizzes).correctScore;
    let totalWrong = calculateScore(userAnswers, quizzes).incorrectScore;
    let mark = totalCorrect * 5;

    // add new quizMark to the api
    if (formattedUserAnswers.length > 0) {
      addQuizMarks({
        student_id: userId,
        student_name: name,
        video_id: videoId,
        video_title: title,
        totalQuiz,
        totalCorrect,
        totalWrong,
        totalMark,
        mark,
      });
    }
  };

  // handle isActive state
  useEffect(() => {
    let answersQuestionIdsArray = userAnswers.map(
      (answer) => answer.questionId
    );
    let quizzesQuestionIdsArray = quizzes.map((quizz) => quizz.id);
    let tempResult =
      answersQuestionIdsArray?.length === quizzesQuestionIdsArray?.length;
    setIsActive(tempResult);
  }, [userAnswers, quizzes]);

  // after successfully added quizMark navigate to leaderBoard
  useEffect(() => {
    if (isError) {
      toast.error("failed to submit quizz");
    }
    if (isSuccess) {
      navigate("/leaderboard", { replace: true });
    }
  }, [isSuccess, navigate, isError, error]);

  return (
    <form className='space-y-8 ' onSubmit={(e) => submitQuiz(e, userAnswers)}>
      {quizzes?.map((quiz) => {
        const { question, options, id } = quiz || {};
        return (
          <div key={quiz.id} className='quiz'>
            <h4 className='question'>{question}</h4>
            <div className='quizOptions'>
              {options.map((opt) => (
                <label key={opt?.id} htmlFor={`${opt.id}+ ${id}`}>
                  <input
                    type='checkbox'
                    id={`${opt.id}+ ${id}`}
                    name={`question_${id}`}
                    value={opt.id}
                    checked={userAnswers.some(
                      (answer) =>
                        answer.questionId === id &&
                        answer.selectedOptionIds.includes(opt.id)
                    )}
                    onChange={() => handleAnswerSelection(id, opt.id)}
                  />
                  {opt.option}
                </label>
              ))}
            </div>
          </div>
        );
      })}
      <button
        className={`px-4 py-2 rounded-full  border  block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95 ${
          isActive ? "bg-cyan border-none" : ""
        }`}
        type='submit'
        disabled={!isActive || isLoading}
      >
        Submit
      </button>
    </form>
  );
}
