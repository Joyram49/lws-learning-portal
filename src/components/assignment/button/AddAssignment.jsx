export default function AddAssignment({ control }) {
  return (
    <div className='w-full flex'>
      <button className='btn ml-auto' onClick={control}>
        Add Assignment
      </button>
    </div>
  );
}
