import { useEffect, useState } from "react";
import { useAddAssignmentMarkMutation } from "../../../features/assignmentMark/assignmentMarkApi";
import TextInput from "../../ui/TextInput";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function StudentAssginmentModal({ open, control, assignment }) {
  const [repoLink, setRepoLink] = useState("");

  const { title, id: assignment_id, totalMark } = assignment || {};

  const navigate = useNavigate();

  // get logged in user
  const {
    user: { id: student_id, name: student_name },
  } = useSelector((state) => state.auth);

  const [addAssignmentMark, { isLoading, isSuccess, isError }] =
    useAddAssignmentMarkMutation();

  // handle submit function for add student assignment
  const handleSubmit = (e) => {
    e.preventDefault();
    addAssignmentMark({
      student_id,
      student_name,
      assignment_id,
      title,
      createdAt: new Date(),
      totalMark,
      mark: 0,
      repo_link: repoLink,
      status: "pending",
    });
    setRepoLink("");
    control();
  };

  // handle error and success state
  useEffect(() => {
    if (isError) {
      toast.error("failed to submit data");
    }
    if (isSuccess) {
      navigate("/", { replace: true });
    }
  }, [isSuccess, navigate, isError]);

  return (
    open && (
      <>
        <div
          onClick={control}
          className='fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer'
        ></div>
        <div className='rounded w-[400px] lg:w-[700px] space-y-2 bg-white sm:px-2 lg:px-10 py-2 sm:py-6  absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2'>
          <h2 className='text-center text-3xl font-bold text-gray-900'>
            Add New Assignment
          </h2>
          <form
            className='mt-4 space-y-3'
            action='#'
            method='POST'
            onSubmit={handleSubmit}
          >
            <div className='shadow overflow-hidden sm:rounded-md'>
              <div className='px-4 py-4 bg-white sm:p-6'>
                <div className='grid grid-cols-6 gap-4'>
                  <h2 className='col-span-6 font-bold text-slate-900 text-lg'>
                    Assignment: <span className='font-medium'>{title}</span>
                  </h2>
                  <div className='col-span-6 '>
                    <TextInput
                      title='Github Repository Link:'
                      placeholder='Enter github repository link'
                      value={repoLink}
                      onChange={(e) => setRepoLink(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className=' bg-indigo-500 text-center sm:mx-6 rounded-md mb-0 lg:mb-4'>
                <button
                  type='submit'
                  className='w-full  inline-flex justify-center py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-indigo-500'
                  disabled={isLoading}
                >
                  Submit
                </button>
              </div>

              {/* <Success message="Video was added successfully" /> */}
            </div>

            {/* <Error message="There was an error" /> */}
          </form>
        </div>
      </>
    )
  );
}
