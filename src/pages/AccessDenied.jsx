import { Link } from "react-router-dom";
export default function AccessDenied() {
  return (
    <div className='w-full h-[85vh] flex flex-col justify-center items-center '>
      <div className='text-2xl'>Access Denied</div>
      <button className='bg-cyan-400/30 p-2 mt-2 rounded hover:bg-cyan-400/50'>
        <Link to='/'>
          <p>Return to Home</p>
        </Link>
      </button>
    </div>
  );
}
