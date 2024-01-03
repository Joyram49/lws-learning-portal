import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { learningportal } from "../../assets";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../../features/auth/authApi";
import Error from "../../components/ui/Error";
import { toast } from "react-toastify";

let role = "student";

export default function Login() {
  const [studentEmail, setStudentEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resError, setResError] = useState("");

  //
  const [login, { data: loggedData, isError, error, isLoading, isSuccess }] =
    useLoginMutation();

  const navigate = useNavigate();

  // reset input field
  const reset = () => {
    setStudentEmail("");
    setPassword("");
  };

  // form's  onSubmit  function
  const handleSubmit = (e) => {
    e.preventDefault();
    login({
      role,
      data: {
        email: studentEmail,
        password,
      },
    });
    reset();
  };

  // if success navigate to courseplayer on student log in
  useEffect(() => {
    if (isError) {
      setResError(error?.error || error?.data);
    }

    if (isSuccess) {
      if (loggedData?.user?.role !== role) {
        setResError("user doesn't exist");
      } else {
        navigate("/courseplayer");
      }
    }
  }, [isSuccess, navigate, error, loggedData, isError]);

  return (
    <section className='py-6 bg-primary h-screen grid place-items-center'>
      <div className='mx-auto max-w-md px-5 lg:px-0'>
        <div>
          <img className='h-12 mx-auto' src={learningportal} />
          <h2 className='mt-6 text-center text-3xl font-extrabold text-slate-100'>
            Sign in to Student Account
          </h2>
        </div>
        <form
          className='mt-8 space-y-6'
          action='#'
          method='POST'
          onSubmit={handleSubmit}
        >
          <input type='hidden' name='remember' value='true' />
          <div className='rounded-md shadow-sm -space-y-px'>
            <div>
              <label htmlFor='email-address' className='sr-only'>
                Email address
              </label>
              <input
                id='email-address'
                name='email'
                type='email'
                autoComplete='email'
                required
                className='login-input rounded-t-md'
                placeholder='Email address'
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='password' className='sr-only'>
                Password
              </label>
              <input
                id='password'
                name='password'
                type='password'
                autoComplete='current-password'
                required
                className='login-input rounded-b-md'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className='flex items-center justify-end'>
            <div className='text-sm'>
              <Link
                to='./registration'
                className='font-medium text-violet-600 hover:text-violet-500'
              >
                Create New Account
              </Link>
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500'
              disabled={isLoading}
            >
              Sign in
            </button>
          </div>

          {/* showing error response */}
          {resError !== "" && <Error message={resError} />}
        </form>
      </div>
    </section>
  );
}
