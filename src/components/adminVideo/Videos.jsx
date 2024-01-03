import Video from "./Video";
import { useGetVideosQuery } from "../../features/videos/videosApi";
import Error from "../../components/ui/Error";
import SkeletonAdmin from "../ui/skeleton/SkeletonAdmin";

export default function Videos() {
  const { data: videos, isLoading, isError } = useGetVideosQuery();

  // decide what to render
  let content = null;
  if (isLoading) {
    content = <SkeletonAdmin />;
  }
  if (!isLoading && isError) {
    content = (
      <tr>
        <td>
          <Error message='Error occured when fetching videos' />
        </td>
      </tr>
    );
  }
  if (!isLoading && !isError && videos?.length === 0) {
    content = (
      <tr className='bg-cyan-700/30 grid grid-cols-1 p-2 rounded mt-4 text-center'>
        <td className='w-full flex gap-x-2 text-lg'>
          No videos found. To add new video please click on{" "}
          <pre className='font-bold underline underline-offset-2'>
            Add Video
          </pre>{" "}
          button.{" "}
        </td>
      </tr>
    );
  }
  if (!isLoading && !isError && videos?.length > 0) {
    content = videos.map((video) => (
      <tr key={video?.id} className='w-full grid grid-cols-3 gap-x-10'>
        <Video
          title={video?.title}
          description={video?.description}
          id={video?.id}
        />
      </tr>
    ));
  }

  return (
    <tbody className='divide-y divide-slate-600/50 w-full'>{content}</tbody>
  );
}
