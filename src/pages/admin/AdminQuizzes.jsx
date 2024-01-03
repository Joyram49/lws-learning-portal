import AddQuiz from "../../components/adminQuiz/button/AddQuiz";
import Quizzes from "../../components/adminQuiz/Quizzes";
import AddQuizModel from "../../components/adminQuiz/add/AddQuizModel";
import { useState } from "react";

export default function AdminQuizzes() {
  const [opened, setOpened] = useState(false);

  const controlModal = () => {
    setOpened((prevState) => !prevState);
  };
  return (
    <section className='py-6 bg-primary'>
      <div className='mx-auto max-w-full px-5 lg:px-20'>
        <div className='px-3 py-20 bg-opacity-10'>
          <AddQuiz control={controlModal} />
          <div className='overflow-x-auto mt-4'>
            <table className='divide-y-1 text-base divide-gray-600 w-full'>
              <thead className='w-full'>
                <tr className='w-full grid grid-cols-3 gap-x-10'>
                  <th className='table-th'>Question</th>
                  <th className='table-th'>Video</th>
                  <th className='table-th justify-self-end'>Action</th>
                </tr>
              </thead>
              <Quizzes />
            </table>
          </div>
        </div>
        <AddQuizModel open={opened} control={controlModal} />
      </div>
    </section>
  );
}
