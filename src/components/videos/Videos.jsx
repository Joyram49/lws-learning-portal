import Video from "./Video";
import { useGetVideosQuery } from "../../features/videos/videosApi";
import Error from "../ui/Error";
import { Link } from "react-router-dom";
import SkeletonStudentVideos from "../ui/skeleton/SkeletonStudentVideos";

export default function Videos({ video }) {
  // get all videos
  const { data: videos, isLoading, isError } = useGetVideosQuery();

  // decide what to render
  let content = null;
  if (isLoading) {
    content = (
      <div className='flex flex-col space-y-4'>
        <SkeletonStudentVideos />
        <SkeletonStudentVideos />
        <SkeletonStudentVideos />
      </div>
    );
  }
  if (!isLoading && isError) {
    content = <Error message='Error occured when fetching videos' />;
  }
  if (!isLoading && !isError && videos?.length === 0) {
    content = (
      <div className='font-medium'>
        <p>No videos found. Please try again.</p>
      </div>
    );
  }
  if (!isLoading && !isError && videos?.length > 0) {
    content = videos.map((video) => {
      const { id, title, duration, views } = video || {};
      return (
        <Link to={`/courseplayer/${id}`} key={id}>
          <Video title={title} duration={duration} id={id} views={views} />
        </Link>
      );
    });
  }
  return (
    <div className='col-span-full lg:col-auto max-h-[570px] overflow-y-auto bg-secondary p-4 rounded-md border border-slate-50/10 divide-y divide-slate-600/30'>
      {content}
    </div>
  );
}
