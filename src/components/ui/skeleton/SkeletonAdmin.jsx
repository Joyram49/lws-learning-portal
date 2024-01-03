import SkeletonElement from "./SkeletonElement";

export default function SkeletonAdmin() {
  return (
    <tr className='flex flex-col space-y-10 px-4 animate-pulse'>
      <td className='w-full flex flex-col space-y-5  '>
        <div className='w-full flex justify-between '>
          <SkeletonElement type='pill' />
          <SkeletonElement type='pill' />
          <SkeletonElement type='pill' />
          <SkeletonElement type='pill' />
        </div>
        <div className='flex gap-x-6 border-b border-slate-600/80 mb-2 pb-1 rounded '>
          <SkeletonElement type='text' />
          <SkeletonElement type='text' />
          <SkeletonElement type='text' />
          <div className='w-full flex space-x-2 justify-end items-center'>
            <SkeletonElement type='s-round' />
            <SkeletonElement type='s-round' />
          </div>
        </div>
        <div className='flex gap-x-6 border-b border-slate-600/80 mb-2 pb-1 rounded '>
          <SkeletonElement type='text' />
          <SkeletonElement type='text' />
          <SkeletonElement type='text' />
          <div className='w-full flex space-x-2 justify-end items-center'>
            <SkeletonElement type='s-round' />
            <SkeletonElement type='s-round' />
          </div>
        </div>
        <div className='flex gap-x-6 border-b border-slate-600/80 mb-2 pb-1 rounded '>
          <SkeletonElement type='text' />
          <SkeletonElement type='text' />
          <SkeletonElement type='text' />
          <div className='w-full flex space-x-2 justify-end items-center'>
            <SkeletonElement type='s-round' />
            <SkeletonElement type='s-round' />
          </div>
        </div>
        <div className='flex gap-x-6 border-b border-slate-600/80 mb-2 pb-1 rounded '>
          <SkeletonElement type='text' />
          <SkeletonElement type='text' />
          <SkeletonElement type='text' />
          <div className='w-full flex space-x-2 justify-end items-center'>
            <SkeletonElement type='s-round' />
            <SkeletonElement type='s-round' />
          </div>
        </div>
        <div className='flex gap-x-6 border-b border-slate-600/80 mb-2 pb-1 rounded '>
          <SkeletonElement type='text' />
          <SkeletonElement type='text' />
          <SkeletonElement type='text' />
          <div className='w-full flex space-x-2 justify-end items-center'>
            <SkeletonElement type='s-round' />
            <SkeletonElement type='s-round' />
          </div>
        </div>
        <div className='flex gap-x-6 border-b border-slate-600/80 mb-2 pb-1 rounded '>
          <SkeletonElement type='text' />
          <SkeletonElement type='text' />
          <SkeletonElement type='text' />
          <div className='w-full flex space-x-2 justify-end items-center'>
            <SkeletonElement type='s-round' />
            <SkeletonElement type='s-round' />
          </div>
        </div>
      </td>
    </tr>
  );
}
