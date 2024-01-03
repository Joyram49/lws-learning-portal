import { useEffect, useState } from "react";
import TextArea from "../../ui/TextArea";
import TextInput from "../../ui/TextInput";
import { useEditVideoMutation } from "../../../features/videos/videosApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function EditVideoForm({ video, id }) {
  const {
    title: initialTitle,
    description: initialDescription,
    url: initialUrl,
    createdAt: initialCreatedAt,
    views: initialViews,
    duration: initialDuration,
  } = video || {};

  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [url, setUrl] = useState(initialUrl);
  const [createdAt, setCreatedAt] = useState(initialCreatedAt);
  const [views, setViews] = useState(initialViews);
  const [duration, setDuration] = useState(initialDuration);

  const [editVideo, { isError, isLoading, isSuccess, error }] =
    useEditVideoMutation();

  const navigate = useNavigate();

  // handle submit function to edit video
  const handleSubmit = (e) => {
    e.preventDefault();
    editVideo({
      id,
      data: {
        title,
        description,
        url,
        createdAt,
        views,
        duration,
      },
    });
  };

  // handle error and success state
  useEffect(() => {
    if (!isSuccess && isError) {
      toast.error("Failed to update video!");
    }
    if (isSuccess) {
      toast.success("Successfully edited the video");
      navigate("/admin/videos", { replace: true });
    }
  }, [isSuccess, navigate, isError, error]);

  return (
    <form className='mt-4 space-y-3' onSubmit={handleSubmit}>
      <div className='shadow overflow-hidden sm:rounded-md'>
        <div className='px-4 py-4 bg-white sm:p-6'>
          <div className='grid grid-cols-6 gap-4 sm:gap-6'>
            <div className='col-span-6 '>
              <TextInput
                title='Video Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className='col-span-6'>
              <TextArea
                title='Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className='col-span-6'>
              <TextInput
                title='YouTube Video link'
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
            </div>

            <div className='col-span-6 sm:col-span-6 lg:col-span-2'>
              <TextInput
                title='Upload Date'
                value={createdAt}
                onChange={(e) => setCreatedAt(e.target.value)}
                required
              />
            </div>

            <div className='col-span-6 sm:col-span-3 lg:col-span-2'>
              <TextInput
                title='Video Duration'
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
              />
            </div>

            <div className='col-span-6 sm:col-span-3 lg:col-span-2'>
              <TextInput
                title='Video no of views'
                value={views}
                onChange={(e) => setViews(e.target.value)}
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
            Save
          </button>
        </div>

        {/* <Success message="Video was added successfully" /> */}
      </div>

      {/* <Error message="There was an error" /> */}
    </form>
  );
}
