import HeadData from "../ui/HeadData";

export default function MarkHead() {
  return (
    <thead>
      <tr>
        <HeadData headText='Assignment' />
        <HeadData headText='Date' />
        <HeadData headText='Student Name' />
        <HeadData headText='Repo Link' />
        <HeadData headText='Mark' />
      </tr>
    </thead>
  );
}
