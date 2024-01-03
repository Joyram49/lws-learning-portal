import SkeletonElement from "./SkeletonElement";

export default function SkeletonLeaderboard() {
  return (
    <div className='flex flex-col space-y-8 animate-pulse'>
      <div className=''>
        <SkeletonElement type='title' />
        <div className='flex  divide-x-[1px] divide-gray-600/30 border border-slate-600/80 rounded'>
          <SkeletonElement type='td' />
          <SkeletonElement type='td' />
          <SkeletonElement type='td' />
          <SkeletonElement type='td' />
        </div>
        <div className='flex  divide-x-[1px] divide-gray-600/30 border border-slate-600/80 rounded'>
          <SkeletonElement type='td' />
          <SkeletonElement type='td' />
          <SkeletonElement type='td' />
          <SkeletonElement type='td' />
        </div>
      </div>
      <div>
        <SkeletonElement type='title' />
        <div className='flex  divide-x-[1px] divide-gray-600/30 border border-slate-600/80 rounded'>
          <SkeletonElement type='td' />
          <SkeletonElement type='td' />
          <SkeletonElement type='td' />
          <SkeletonElement type='td' />
        </div>
        <div className='flex  divide-x-[1px] divide-gray-600/30 border border-slate-600/80 rounded'>
          <SkeletonElement type='td' />
          <SkeletonElement type='td' />
          <SkeletonElement type='td' />
          <SkeletonElement type='td' />
        </div>
        <div className='flex  divide-x-[1px] divide-gray-600/30 border border-slate-600/80 rounded'>
          <SkeletonElement type='td' />
          <SkeletonElement type='td' />
          <SkeletonElement type='td' />
          <SkeletonElement type='td' />
        </div>
        <div className='flex  divide-x-[1px] divide-gray-600/30 border border-slate-600/80 rounded'>
          <SkeletonElement type='td' />
          <SkeletonElement type='td' />
          <SkeletonElement type='td' />
          <SkeletonElement type='td' />
        </div>
        <div className='flex  divide-x-[1px] divide-gray-600/30 border border-slate-600/80 rounded'>
          <SkeletonElement type='td' />
          <SkeletonElement type='td' />
          <SkeletonElement type='td' />
          <SkeletonElement type='td' />
        </div>
        <div className='flex  divide-x-[1px] divide-gray-600/30 border border-slate-600/80 rounded'>
          <SkeletonElement type='td' />
          <SkeletonElement type='td' />
          <SkeletonElement type='td' />
          <SkeletonElement type='td' />
        </div>
      </div>
    </div>
  );
}
