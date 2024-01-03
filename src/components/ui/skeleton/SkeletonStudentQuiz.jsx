import React from "react";
import SkeletonElement from "./SkeletonElement";

export default function SkeletonStudentQuiz() {
  return (
    <div className='flex flex-col gap-y-12 animate-pulse'>
      <div className=' flex flex-col gap-y-2 '>
        <SkeletonElement type='title' />
        <SkeletonElement type='half-text' />
      </div>
      <div className='flex flex-col space-y-10'>
        <div className='flex flex-col rounded-lg border border-slate-600/30 p-6 space-y-8'>
          <SkeletonElement type='title' />
          <div className='w-full grid grid-cols-2  items-center gap-10'>
            <SkeletonElement type='option' />
            <SkeletonElement type='option' />
            <SkeletonElement type='option' />
            <SkeletonElement type='option' />
          </div>
        </div>
        <div className='flex flex-col rounded-lg border border-slate-600/30 p-6 space-y-8'>
          <SkeletonElement type='title' />
          <div className='w-full grid grid-cols-2  items-center gap-10'>
            <SkeletonElement type='option' />
            <SkeletonElement type='option' />
            <SkeletonElement type='option' />
            <SkeletonElement type='option' />
          </div>
        </div>
      </div>
    </div>
  );
}
