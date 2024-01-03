import RowData from "../ui/RowData";
import { apiSlice } from "../../features/api/apiSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import setAssignmentMark from "../../utils/setAssignmentMark";

export default function TableRow({ result }) {
  const [status, setStatus] = useState("");
  const {
    rank,
    student_name,
    sumOfQuizMark,
    assignmentMark,
    total,
    assignment_id,
    student_id,
  } = result || {};

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
      } catch (error) {}
    };
    fetchData();
  }, [dispatch, student_id, assignment_id]);

  return (
    <tr className='border-b border-slate-600/50'>
      <RowData dataText={rank} />
      <RowData dataText={student_name} />
      <RowData dataText={sumOfQuizMark} />
      <RowData dataText={setAssignmentMark(status, assignmentMark)} />
      <RowData dataText={total} />
    </tr>
  );
}
