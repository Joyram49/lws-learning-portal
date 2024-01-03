export default function Error({ message }) {
  return (
    <div className='w-full max-w-7xl p-2 bg-rose-700/60 rounded-lg mt-4'>
      <p className='text-center font-medium text-slate-50'>{message}</p>
    </div>
  );
}
