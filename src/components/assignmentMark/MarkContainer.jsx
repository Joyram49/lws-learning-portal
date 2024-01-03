import MarkStatus from "./MarkStatus";
import MarkBody from "./MarkBody";
import MarkHead from "./MarkHead";

export default function MarkContainer({ assignmentMarks = [] }) {
  // assignments list status
  const total = assignmentMarks?.length;
  const pending = assignmentMarks?.filter(
    (marks) => marks?.status === "pending"
  );
  const published = assignmentMarks?.filter(
    (marks) => marks?.status === "published"
  );

  let content = assignmentMarks?.map((assignmentMark) => {
    return (
      <MarkBody key={assignmentMark?.id} assignmentMark={assignmentMark} />
    );
  });

  return (
    <div className='px-3 py-20 bg-opacity-10'>
      <MarkStatus
        total={total}
        pending={pending.length}
        published={published.length}
      />
      <div className='overflow-x-auto mt-4'>
        <table className='divide-y-1 text-base divide-gray-600 w-full'>
          <MarkHead />
          <tbody className='divide-y divide-slate-600/50'>{content}</tbody>
        </table>
      </div>
    </div>
  );
}
