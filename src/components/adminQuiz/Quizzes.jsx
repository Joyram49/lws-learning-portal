import { useGetQuizzesQuery } from "../../features/quizzes/quizzesApi";
import Quiz from "./Quiz";
import Error from "../ui/Error";
import SkeletonAdmin from "../ui/skeleton/SkeletonAdmin";

export default function Quizzes() {
  const { data: quizzes, isLoading, isError } = useGetQuizzesQuery();

  // decide what to render
  let content = null;
  if (isLoading) {
    content = <SkeletonAdmin />;
  }
  if (!isLoading && isError) {
    content = (
      <tr>
        <td>
          <Error message='Error occured when fetching quizzes' />
        </td>
      </tr>
    );
  }
  if (!isLoading && !isError && quizzes?.length === 0) {
    content = (
      <tr className='bg-cyan-700/30 grid grid-cols-1 p-2 rounded mt-4'>
        <td className='w-full flex gap-x-2 text-lg'>
          No quizzes found. To add new quiz please click on{" "}
          <pre className='font-bold underline underline-offset-2'>Add Quiz</pre>{" "}
          button.{" "}
        </td>
      </tr>
    );
  }
  if (!isLoading && !isError && quizzes?.length > 0) {
    content = quizzes.map((quiz) => (
      <tr key={quiz?.id} className='w-full grid grid-cols-3 gap-x-10'>
        <Quiz
          title={quiz?.video_title}
          question={quiz?.question}
          id={quiz?.id}
        />
      </tr>
    ));
  }

  return <tbody className='divide-y divide-slate-600/50'>{content}</tbody>;
}
