import VideoInfo from "./VideoInfo";
import VideoThumb from "./VideoThumb";
export default function VideoPlayer({ data }) {
  const { url, title } = data || {};
  return (
    <div className='col-span-full w-full space-y-8 lg:col-span-2'>
      <VideoThumb url={url} title={title} />
      <VideoInfo video={data} />
    </div>
  );
}
