import React from "react";

export default function AddQuiz({ control }) {
  return (
    <div className='w-full flex'>
      <button className='btn ml-auto' onClick={control}>
        Add Quiz
      </button>
    </div>
  );
}
