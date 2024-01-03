import TextInput from "../../ui/TextInput";
import TextArea from "../../ui/TextArea";
import { useEffect, useState } from "react";
import { useAddVideoMutation } from "../../../features/videos/videosApi";
import { toast } from "react-toastify";

export default function Modal({ open, control }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [views, setViews] = useState("");
  const [duration, setDuration] = useState("");

  const [addVideo, { isLoading, isError, isSuccess }] = useAddVideoMutation();

  // reset form hence it's not needed
  const reset = () => {
    setTitle("");
    setDescription("");
    setUrl("");
    setCreatedAt("");
    setViews("");
    setDuration("");
  };

  // handle submit function to add video
  const handleSubmit = (e) => {
    e.preventDefault();
    addVideo({
      title,
      description,
      url,
      views,
      duration,
      createdAt,
    });
    reset();
    control();
  };

  // handle eror and succes state
  useEffect(() => {
    if (!isSuccess && isError) {
      toast.error("Failed to add video!");
    }
    if (isSuccess) {
      toast.success("Successfully added new video!");
    }
  }, [control, isError, isSuccess]);

  return (
    open && (
      <>
        <div
          onClick={control}
          className='fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer'
        ></div>
        <div className='rounded w-[400px] lg:w-[700px] space-y-2 bg-white sm:px-2 lg:px-10 py-2 sm:py-6  absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2'>
          <h2 className='text-center text-3xl font-bold text-gray-900'>
            Add New Video
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
        </div>
      </>
    )
  );
}
