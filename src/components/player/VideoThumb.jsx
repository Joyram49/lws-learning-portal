export default function VideoThumb({ url, title }) {
  return (
    <div className='col-span-full w-full space-y-8 lg:col-span-2'>
      <iframe
        width='100%'
        className='aspect-video'
        src={url || "https://www.youtube.com/embed/56zUkaXJnUA"}
        title={
          title ||
          "Things I wish I knew as a Junior Web Developer - Sumit Saha - BASIS SoftExpo 2023"
        }
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
      ></iframe>
    </div>
  );
}
