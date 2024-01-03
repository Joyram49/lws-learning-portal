import HeadData from "../ui/HeadData";

export default function TableHead() {
  return (
    <thead>
      <tr className='border-b border-slate-600/50'>
        <HeadData headText='Rank' />
        <HeadData headText='Name' />
        <HeadData headText='Quiz Mark' />
        <HeadData headText='Assignment Mark' />
        <HeadData headText='Total' />
      </tr>
    </thead>
  );
}
