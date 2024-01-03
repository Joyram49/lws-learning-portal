import HeadData from "../ui/HeadData";

export default function AssignmentHead() {
  return (
    <tr className='w-full grid grid-cols-4 gap-x-10 '>
      <HeadData headText='title' />
      <HeadData headText='Video Title' />
      <HeadData headText='Mark' last='justify-self-end' />
      <HeadData headText='Action' last='justify-self-end' />
    </tr>
  );
}
