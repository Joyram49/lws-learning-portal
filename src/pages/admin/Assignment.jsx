import AssignmentBody from "../../components/assignment/AssignmentBody";
import AssignmentHead from "../../components/assignment/AssignmentHead";
import AddAssignment from "../../components/assignment/button/AddAssignment";
import { useGetAssignmentsQuery } from "../../features/assignment/assignmentApi";
import Error from "../../components/ui/Error";
import AddAssignmentModal from "../../components/assignment/add/AddAssignmentModal";
import { useState } from "react";
import SkeletonAdmin from "../../components/ui/skeleton/SkeletonAdmin";

export default function Assignment() {
  const [opened, setOpened] = useState(false);

  const controlModal = () => {
    setOpened((prevState) => !prevState);
  };

  const {
    data: assignments,
    isLoading,
    isError,
    error,
  } = useGetAssignmentsQuery();

  // decide what to render
  let content = null;
  if (isLoading) {
    content = <SkeletonAdmin />;
  }
  if (!isLoading && isError) {
    content = (
      <tr>
        <td>
          <Error
            message={error?.error || "Error occured when fetching assignments"}
          />
        </td>
      </tr>
    );
  }
  if (!isLoading && !isError && assignments?.length === 0) {
    content = (
      <tr className='bg-cyan-700/30 grid grid-cols-1 p-2 rounded mt-4'>
        <td className='w-full flex gap-x-2 text-lg'>
          No Assignments found. To add new video please click on{" "}
          <pre className='font-bold underline underline-offset-2'>
            Add Assignment
          </pre>{" "}
          button.{" "}
        </td>
      </tr>
    );
  }
  if (!isLoading && !isError && assignments?.length > 0) {
    content = assignments.map((a) => (
      <AssignmentBody key={a?.id} assignment={a} />
    ));
  }

  return (
    <section className='py-6 bg-primary'>
      <div className='mx-auto max-w-full px-5 lg:px-20'>
        <div className='px-3 py-20 bg-opacity-10'>
          <AddAssignment control={controlModal} />
          <div className='overflow-x-auto mt-4'>
            <table className='divide-y-1 text-base divide-gray-600 w-full'>
              <thead className='w-full'>
                <AssignmentHead />
              </thead>
              <tbody
                className='divide-y divide-slate-600/50 w-full'
                role='list'
              >
                {content}
              </tbody>
            </table>
          </div>
        </div>
        <AddAssignmentModal open={opened} control={controlModal} />
      </div>
    </section>
  );
}
