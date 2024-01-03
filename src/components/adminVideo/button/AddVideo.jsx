import React from "react";

export default function AddVideo({ control }) {
  return (
    <div className='w-full flex'>
      <button className='btn ml-auto' onClick={control}>
        Add Video
      </button>
    </div>
  );
}
