import { useEffect, useState } from "react";
import RowData from "../ui/RowData";

import { useEditAssignmentMarkMutation } from "../../features/assignmentMark/assignmentMarkApi";
import { toast } from "react-toastify";

export default function MarkBody({ assignmentMark }) {
  const {
    title,
    createdAt,
    repo_link,
    student_name,
    mark,
    status,
    totalMark,
    id,
  } = assignmentMark || {};

  const [givenMark, setGivenMark] = useState(mark);

  const [editAssignmentMark, { isLoading, isError, isSuccess }] =
    useEditAssignmentMarkMutation();

  // function to help admin to give correct mark under limitation
  const handleClick = () => {
    if (givenMark >= 0 && givenMark <= totalMark) {
      editAssignmentMark({
        id,
        data: {
          ...assignmentMark,
          mark: +givenMark,
          status: "published",
        },
      });
    } else {
      toast.warning(`you can give mark from 0 to ${totalMark}`);
      setGivenMark(mark);
    }
  };

  // handle error and success state
  useEffect(() => {
    if (isError) {
      toast.error("Failed to update assignment mark");
    }
    if (isSuccess) {
      toast.success("Succesfully added mark");
    }
  }, [isError, isSuccess]);

  return (
    <tr>
      <RowData dataText={title} />
      <RowData dataText={createdAt} />
      <RowData dataText={student_name} />
      <RowData dataText={repo_link} />
      <td className='table-td input-mark'>
        <input
          type='number'
          max={totalMark}
          value={givenMark}
          onChange={(e) => setGivenMark(e.target.value)}
          disabled={status === "published"}
        />
        {status === "pending" && (
          <svg
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='2'
            stroke='currentColor'
            className='w-6 h-6 text-green-500 cursor-pointer hover:text-green-400'
            onClick={handleClick}
            aria-disabled={isLoading}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M4.5 12.75l6 6 9-13.5'
            />
          </svg>
        )}
      </td>
    </tr>
  );
}
