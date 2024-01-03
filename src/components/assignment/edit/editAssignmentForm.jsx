import { useEffect, useState } from "react";
import TextInput from "../../ui/TextInput";
import { useNavigate } from "react-router-dom";
import { useEditAssignmentMutation } from "../../../features/assignment/assignmentApi";
import { useGetVideosQuery } from "../../../features/videos/videosApi";
import { apiSlice } from "../../../features/api/apiSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function EditAssignmentForm({ assignment }) {
  const {
    id,
    title: initialTitle,
    video_id: initialVideoId,
    totalMark: initialTotalMark,
  } = assignment || {};

  const [title, setTitle] = useState(initialTitle);
  const [videoId, setVideoId] = useState(initialVideoId);
  const [assignedVideo, setAssignedVideo] = useState({});
  const [totalMark, setTotalMark] = useState(initialTotalMark);
  const [resError, setResError] = useState("");

  // fetch all videos to get length
  const { data: videos } = useGetVideosQuery();

  const [editAssignment, { isError, isLoading, isSuccess, error }] =
    useEditAssignmentMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  // handle form submit function
  const handleSubmit = (e) => {
    e.preventDefault();
    editAssignment({
      id,
      data: {
        title,
        video_id: assignedVideo?.id,
        video_title: assignedVideo?.title,
        totalMark,
      },
    });
  };

  // handle success and error state
  useEffect(() => {
    if (isError) {
      toast.error("Failed to update assignment");
    }
    if (isSuccess) {
      toast.success("successfully edit assignment");
      navigate("/admin/assignment", { replace: true });
    }
  }, [isSuccess, navigate, isError]);

  return (
    <form className='mt-4 space-y-3' onSubmit={handleSubmit}>
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
                {(resError !== "" || !assignedVideo?.id) && videoId !== "" && (
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
  );
}
