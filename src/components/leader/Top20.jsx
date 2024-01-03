import TableHead from "./TableHead";
import TableRow from "./TableRow";

export default function Top20({ usersResult = [] }) {
  let content = usersResult.map((result) => (
    <TableRow key={result.student_id} result={result} />
  ));
  return (
    <table className='text-base w-full border border-slate-600/50 rounded-md my-4'>
      <TableHead />

      <tbody>{content}</tbody>
    </table>
  );
}
