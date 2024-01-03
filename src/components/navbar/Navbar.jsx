import { useDispatch } from "react-redux";
import { learningportal } from "../../assets";
import useAuth from "../../hooks/useAuth";
import { userLoggedOut } from "../../features/auth/authSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const auth = useAuth();
  const { user } = auth || {};
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [include, setInclude] = useState(false);

  useEffect(() => {
    if (location.pathname.startsWith("/admin")) {
      setInclude(true);
    }
  }, [location]);

  // handle return student home or admin home
  const onLogoClick = () => {
    if (include) {
      navigate("/admin/dashboard");
    } else {
      navigate("/");
    }
  };

  //  handle logged out button function
  const handleClick = () => {
    dispatch(
      userLoggedOut({
        accessToken: undefined,
        user: undefined,
      })
    );
    localStorage.clear();
  };

  return (
    <nav className='shadow-md'>
      <div className='max-w-7xl px-5 lg:px-0 mx-auto flex justify-between py-3'>
        <div className='h-10 cursor-pointer' onClick={onLogoClick}>
          <img className='h-full' src={learningportal} />
        </div>
        <div className='flex items-center gap-3'>
          {!include && <Link to='/leaderboard'>Leaderboard</Link>}
          <h2 className='font-bold'>{user.name}</h2>
          <button
            className='flex gap-2 border border-cyan items-center px-4 py-1 rounded-full text-sm transition-all hover:bg-cyan'
            onClick={handleClick}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75'
              />
            </svg>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
