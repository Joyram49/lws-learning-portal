import SkeletonElement from "./SkeletonElement";

export default function SkeletonStudentVideos() {
  return (
    <div className='grid grid-cols-12 space-x-4 justify-center items-center p-2 animate-pulse'>
      <div className='col-span-1'>
        <SkeletonElement type='small-round' />
      </div>
      <div className='col-span-11 w-full flex flex-col gap-y-2'>
        <SkeletonElement type='text' />
        <SkeletonElement type='text' />
        <div className='flex gap-x-2'>
          <SkeletonElement type='pill' />
          <SkeletonElement type='line' />
          <SkeletonElement type='pill' />
        </div>
      </div>
    </div>
  );
}
