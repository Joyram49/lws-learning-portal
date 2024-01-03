import SkeletonElement from "./SkeletonElement";

export default function SkeletonPlayer() {
  return (
    <div>
      <div className='skeleton-courseplayer '>
        <SkeletonElement type='banner' />
        <SkeletonElement type='title' />
        <SkeletonElement type='text' />
        <div className='flex gap-x-2'>
          <SkeletonElement type='span' />
          <SkeletonElement type='line' />
          <SkeletonElement type='span' />
        </div>
        <SkeletonElement type='text' />
        <SkeletonElement type='text' />
        <SkeletonElement type='half-text' />
      </div>
    </div>
  );
}
