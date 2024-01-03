import { useParams } from "react-router-dom";
import EditQuizForm from "../../components/adminQuiz/edit/EditQuizForm";
import { useGetQuizQuery } from "../../features/quizzes/quizzesApi";

export default function EditAdminQuiz() {
  const { id } = useParams();

  const { data: quizz, isLoading, isError } = useGetQuizQuery(id);

  // decide what to render
  let content = null;
  if (isLoading) {
    content = <div>Loading......</div>;
  }
  if (!isLoading && isError) {
    content = <div>error occured when fetching quizz</div>;
  }
  if (!isLoading && !isError && quizz?.id) {
    content = <EditQuizForm quizz={quizz} />;
  }

  return (
    <section className='py-6 bg-primary'>
      <div className='mx-auto max-w-7xl px-5 lg:px-0'>
        <div className='px-3 md:lg:xl:px-40 bg-white  py-20 '>
          <h2 className='text-center text-3xl font-bold text-gray-900'>
            Update a Quizz
          </h2>
          {content}
        </div>
      </div>
    </section>
  );
}
