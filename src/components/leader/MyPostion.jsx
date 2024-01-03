import { useEffect, useState } from "react";
import RowData from "../ui/RowData";
import TableHead from "./TableHead";
import { useDispatch } from "react-redux";
import { apiSlice } from "../../features/api/apiSlice";
import setAssignmentMark from "../../utils/setAssignmentMark";

export default function MyPostion({ usersResult = [], studentId }) {
  const [status, setStatus] = useState("");

  let loggedInUserResult = usersResult.find(
    (result) => result.student_id === studentId
  );

  const {
    rank,
    student_name,
    sumOfQuizMark,
    assignmentMark = undefined,
    total,
    assignment_id,
    student_id,
  } = loggedInUserResult || {};

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await dispatch(
          apiSlice.endpoints.getAssignmentMarkWithSid.initiate({
            userId: student_id,
            id: assignment_id,
          })
        );
        setStatus(result?.data[0]?.status);
      } catch (error) {
        setStatus("");
      }
    };
    fetchData();
  }, [dispatch, student_id, assignment_id]);

  return (
    <div>
      <h3 className='text-lg font-bold'>Your Position in Leaderboard</h3>
      <table className='text-base w-full border border-slate-600/50 rounded-md my-4'>
        <TableHead />
        <tbody>
          <tr className='border-2 border-cyan'>
            <RowData dataText={rank} />
            <RowData dataText={student_name} />
            <RowData dataText={sumOfQuizMark} />
            <RowData dataText={setAssignmentMark(status, assignmentMark)} />
            <RowData dataText={total} />
          </tr>
        </tbody>
      </table>
    </div>
  );
}
