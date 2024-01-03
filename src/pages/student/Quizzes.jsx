import { useLocation } from "react-router-dom";
import QuizContainer from "../../components/quiz/QuizContainer";
import { useGetQuizzesWithVideoIdQuery } from "../../features/quizzes/quizzesApi";
import Error from "../../components/ui/Error";
import SkeletonStudentQuiz from "../../components/ui/skeleton/SkeletonStudentQuiz";

export default function Quizzes() {
  const {
    state: { title, videoId },
  } = useLocation();

  const {
    data: quizzes,
    isLoading,
    isError,
    error,
  } = useGetQuizzesWithVideoIdQuery(videoId);

  // decide what to render
  let content = null;

  if (isLoading) {
    content = <SkeletonStudentQuiz />;
  }

  if (!isLoading && isError) {
    content = <Error message={error?.error || "failed to fetch quizzes"} />;
  }
  if (!isLoading && !isError && quizzes?.length > 0) {
    content = (
      <QuizContainer quizzes={quizzes} videoId={videoId} title={title} />
    );
  }

  return (
    <section className='py-6 bg-primary'>
      <div className='mx-auto max-w-7xl px-5 lg:px-0'>
        <div className='mb-8'>
          <h1 className='text-2xl font-bold'>{title}</h1>
          <p className='text-sm text-slate-200'>
            Each question contains 5 Mark
          </p>
        </div>
        {content}
      </div>
    </section>
  );
}
