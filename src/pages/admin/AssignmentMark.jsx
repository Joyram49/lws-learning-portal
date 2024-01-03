import MarkContainer from "../../components/assignmentMark/MarkContainer";
import { useGetAssignmentMarksQuery } from "../../features/assignmentMark/assignmentMarkApi";
import Error from "../../components/ui/Error";
import SkeletonAssignmentMark from "../../components/ui/skeleton/SkeletonAssignmentMark";

export default function AssignmentMark() {
  const {
    data: assignmentMarks,
    isLoading,
    isError,
  } = useGetAssignmentMarksQuery();

  // decide what to render
  let content = null;
  if (isLoading) {
    content = <SkeletonAssignmentMark />;
  }
  if (!isLoading && isError) {
    content = <Error message='Error occured when fetching assignmentMarks' />;
  }
  if (!isLoading && !isError && assignmentMarks?.length === 0) {
    content = (
      <div className='bg-cyan-700/30 grid grid-cols-1 p-2 rounded mt-4 text-center text-lg'>
        <p>No assignmentMark list found. Please try again later</p>
      </div>
    );
  }
  if (!isLoading && !isError && assignmentMarks?.length > 0) {
    content = <MarkContainer assignmentMarks={assignmentMarks} />;
  }

  return (
    <section className='py-6 bg-primary'>
      <div className='mx-auto max-w-full px-5 lg:px-10 2xl:px-20'>
        {content}
      </div>
    </section>
  );
}
