import { useState } from "react";
import Videos from "../../components/adminVideo/Videos";
import AddVideo from "../../components/adminVideo/button/AddVideo";
import AddVideoModal from "../../components/adminVideo/add/AddVideoModal";

export default function AdminVideos() {
  const [opened, setOpened] = useState(false);

  const controlModal = () => {
    setOpened((prevState) => !prevState);
  };

  return (
    <section className='py-6 bg-primary'>
      <div className='mx-auto max-w-full px-5 lg:px-20'>
        <div className='px-3 py-20 bg-opacity-10'>
          <AddVideo control={controlModal} />

          <div className='overflow-x-auto mt-4'>
            <table className='divide-y-1 text-base divide-gray-600 w-full'>
              <thead className='w-full'>
                <tr className='w-full grid grid-cols-3 gap-x-10'>
                  <th className='table-th'>Video Title</th>
                  <th className='table-th'>Description</th>
                  <th className='table-th justify-self-end'>Action</th>
                </tr>
              </thead>
              <Videos />
            </table>
          </div>
        </div>
        <AddVideoModal open={opened} control={controlModal} />
      </div>
    </section>
  );
}
