import { Link, useNavigate } from "react-router-dom";
import { learningportal } from "../../assets";
import { useEffect, useState } from "react";
import { useRegisterMutation } from "../../features/auth/authApi";
import Error from "../../components/ui/Error";

export default function Registration() {
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resError, setResError] = useState("");

  const [register, { isLoading, isError, error, isSuccess }] =
    useRegisterMutation();

  const navigate = useNavigate();

  // reset input field
  const reset = () => {
    setStudentEmail("");
    setStudentName("");
    setPassword("");
    setConfirmPassword("");
  };

  // form's  onSubmit  function
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setResError("passwords do not match");
    } else {
      register({
        email: studentEmail,
        name: studentName,
        role: "student",
        password,
      });
    }
    reset();
  };

  //handle error state and  success state
  useEffect(() => {
    if (isError) {
      setResError(error?.error || error?.data);
    }
    if (isSuccess) {
      navigate("/courseplayer");
    }
  }, [isError, error, isSuccess, navigate]);

  return (
    <section className='py-6 bg-primary h-screen grid place-items-center'>
      <div className='mx-auto max-w-md px-5 lg:px-0'>
        <div>
          <img className='h-12 mx-auto' src={learningportal} />
          <h2 className='mt-6 text-center text-3xl font-extrabold text-slate-100'>
            Create Your New Account
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
              <label htmlFor='name' className='sr-only'>
                Name
              </label>
              <input
                id='name'
                name='name'
                type='text'
                autoComplete='name'
                required
                className='login-input rounded-t-md'
                placeholder='Student Name'
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
              />
            </div>
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
                className='login-input '
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
                className='login-input'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='confirm-password' className='sr-only'>
                Confirm Password
              </label>
              <input
                id='confirm-password'
                name='confirm-password'
                type='password'
                autoComplete='confirm-password'
                required
                className='login-input rounded-b-md'
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <div className='flex items-center justify-end'>
            <div className='text-sm'>
              <Link
                to='/'
                className='font-medium text-violet-600 hover:text-violet-500'
              >
                Already have an account?
              </Link>
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500'
              disabled={isLoading}
            >
              Create Account
            </button>
          </div>
          {resError !== "" && <Error message={resError} />}
        </form>
      </div>
    </section>
  );
}
