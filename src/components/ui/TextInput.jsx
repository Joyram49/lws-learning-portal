export default function TextInput({ title, ...attributes }) {
  return (
    <>
      <label className='block text-sm font-medium text-gray-900 min-w-max mt-2'>
        {title}
      </label>
      <input
        type='text'
        className='mt-1 py-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm  border border-gray-900/20 rounded-md text-gray-900 px-2'
        {...attributes}
      />
    </>
  );
}
