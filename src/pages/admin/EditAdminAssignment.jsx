import { useParams } from "react-router-dom";
import { useGetAssignmentQuery } from "../../features/assignment/assignmentApi";
import EditAssignmentForm from "../../components/assignment/edit/editAssignmentForm";

export default function EditAdminAssignment() {
  const { id } = useParams();

  const { data: assignment, isLoading, isError } = useGetAssignmentQuery(id);

  // decide what to render
  let content = null;
  if (isLoading) {
    content = <div>Loading......</div>;
  }
  if (!isLoading && isError) {
    content = <div>error occured when fetching assignment</div>;
  }
  if (!isLoading && !isError && assignment?.id) {
    content = <EditAssignmentForm assignment={assignment} />;
  }
  return (
    <section className='py-6 bg-primary'>
      <div className='mx-auto max-w-7xl px-5 lg:px-0'>
        <div className='px-3 md:lg:xl:px-40 bg-white  py-20 '>
          <h2 className='text-center text-3xl font-bold text-gray-900'>
            Update an Assignment
          </h2>
          {content}
        </div>
      </div>
    </section>
  );
}
