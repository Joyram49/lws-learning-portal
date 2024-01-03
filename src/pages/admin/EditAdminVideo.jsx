import { useParams } from "react-router-dom";
import { useGetVideoQuery } from "../../features/videos/videosApi";
import EditVideoForm from "../../components/adminVideo/edit/EditVideoForm";
import Error from "../../components/ui/Error";

export default function EditAdminVideo() {
  const { videoId } = useParams();

  const { data: video, isLoading, isError, error } = useGetVideoQuery(videoId);

  // decide what to render
  let content = null;
  if (isLoading) {
    content = <div>Loading......</div>;
  }
  if (!isLoading && isError) {
    content = (
      <Error
        message={
          error?.data || error?.error || "Error occured when fetching video"
        }
      />
    );
  }
  if (!isLoading && !isError && video?.id) {
    content = <EditVideoForm video={video} id={videoId} />;
  }

  return (
    <section className='py-6 bg-primary'>
      <div className='mx-auto max-w-7xl px-5 lg:px-0'>
        <div className='px-3 md:lg:xl:px-40 bg-white  py-20 '>
          <h2 className='text-center text-3xl font-bold text-gray-900'>
            Update a Video
          </h2>
          {content}
        </div>
      </div>
    </section>
  );
}
