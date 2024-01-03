import { useParams } from "react-router-dom";
import VideoPlayer from "../../components/player/VideoPlayer";
import Videos from "../../components/videos/Videos";
import { useGetVideoQuery } from "../../features/videos/videosApi";
import Error from "../../components/ui/Error";
import SkeletonPlayer from "../../components/ui/skeleton/SkeletonPlayer";

export default function CoursePlayer() {
  const { id: videoId } = useParams();

  // get single video using videoId
  const {
    data: video,
    isLoading,
    isError,
  } = useGetVideoQuery(videoId, { skip: !videoId, refetchOnReconnect: true });

  // decide what to render
  let content = null;
  if (isLoading) {
    content = <SkeletonPlayer />;
  }
  if (!isLoading && isError) {
    content = <Error message={"error occured when fetching video"} />;
  }
  if (!isLoading && !isError && video?.id) {
    content = <VideoPlayer data={video} />;
  }

  return (
    <section className='py-6 bg-primary'>
      <div className='mx-auto max-w-7xl px-5 lg:px-0'>
        <div className='grid grid-cols-3 gap-2 lg:gap-8'>
          {videoId ? content : <VideoPlayer />}
          <Videos data={video} />
        </div>
      </div>
    </section>
  );
}
