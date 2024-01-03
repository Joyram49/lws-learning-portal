import { useEffect, useState } from "react";
import { useAddAssignmentMutation } from "../../../features/assignment/assignmentApi";
import TextInput from "../../ui/TextInput";
import { useDispatch } from "react-redux";
import { apiSlice } from "../../../features/api/apiSlice";
import { useGetVideosQuery } from "../../../features/videos/videosApi";
import { toast } from "react-toastify";

export default function AddAssignmentModal({ open, control }) {
  const [title, setTitle] = useState("");
  const [videoId, setVideoId] = useState("");
  const [assignedVideo, setAssignedVideo] = useState({});
  const [totalMark, setTotalMark] = useState("");
  const [resError, setResError] = useState("");

  const [addAssignment, { isLoading, isError, isSuccess }] =
    useAddAssignmentMutation();
  const dispatch = useDispatch();

  // fetch all videos to get length
  const { data: videos } = useGetVideosQuery();

  // fetch single video by videoId
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (videoId !== "") {
          const result = await dispatch(
            apiSlice.endpoints.getVideo.initiate(videoId)
          );
          setAssignedVideo(result?.data);
        }
      } catch (err) {
        setResError(err);
        // console.log(err);
      }
    };
    fetchData();
  }, [videoId, dispatch]);

  //   reset form hence it's not needed
  const reset = () => {
    setTitle("");
    setTotalMark("");
    setVideoId("");
  };

  // form's submit function
  const handleSubmit = (e) => {
    e.preventDefault();
    addAssignment({
      title,
      video_id: assignedVideo?.id,
      video_title: assignedVideo?.title,
      totalMark,
    });
    control();
    reset();
  };

  // handle error and success state
  useEffect(() => {
    if (isError) {
      toast.error("Failed to submit assignment");
    }
    if (isSuccess) {
      toast.success("Successfully added new assignment");
    }
  }, [isSuccess, isError, control]);

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
                <div className='grid grid-cols-6 gap-4 sm:gap-6'>
                  <div className='col-span-6 flex gap-x-2'>
                    <TextInput
                      title='Assignment Title'
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div className='col-span-6 flex gap-x-2'>
                    <label className='block text-sm font-medium text-gray-900 min-w-max mt-2'>
                      Assigned Video Id
                    </label>
                    <div className='w-full'>
                      <input
                        type='text'
                        className='mt-1 py-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm  border border-gray-900/20 rounded-md text-gray-900 px-2'
                        value={videoId}
                        onChange={(e) => setVideoId(e.target.value)}
                        placeholder={`please enter id from 1 to ${videos?.length}`}
                        required
                      />
                      {(resError !== "" || !assignedVideo?.id) &&
                        videoId !== "" && (
                          <p className='col-span-6 text-rose-500 font font-medium '>
                            *video not found
                          </p>
                        )}
                    </div>
                  </div>

                  <div className='col-span-6  flex gap-x-2'>
                    <TextInput
                      title='Total Mark'
                      value={totalMark}
                      onChange={(e) => setTotalMark(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className=' bg-indigo-500 text-center mx-3 sm:mx-6 rounded-md mb-0 lg:mb-4'>
                <button
                  type='submit'
                  className='w-full  inline-flex justify-center py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-indigo-500'
                  disabled={isLoading}
                >
                  Save
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
