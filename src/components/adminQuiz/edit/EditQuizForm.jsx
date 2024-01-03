import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetVideosQuery } from "../../../features/videos/videosApi";
import { apiSlice } from "../../../features/api/apiSlice";
import { useEditQuizMutation } from "../../../features/quizzes/quizzesApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function EditQuizForm({ quizz }) {
  const {
    id: initialQuizzId,
    options: initialOptions,
    question: initialQuestion,
    video_id: initailVideoId,
  } = quizz || {};

  const [newQuestionData, setNewQuestionData] = useState({
    options: initialOptions,
  });
  const [question, setQuestion] = useState(initialQuestion);
  const [videoId, setVideoId] = useState(initailVideoId);
  const [assignedVideo, setAssignedVideo] = useState({});
  const [resError, setResError] = useState("");

  const [editQuiz, { isLoading, isSuccess, isError }] = useEditQuizMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // fetch all videos to get length
  const { data: videos } = useGetVideosQuery();

  // fetch single video by videoId
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (videoId !== "") {
          const result = await dispatch(
            apiSlice.endpoints.getVideo.initiate(videoId)
          );
          setAssignedVideo(result?.data);
        }
      } catch (err) {
        setResError(err);
        // console.log(err);
      }
    };
    fetchData();
  }, [dispatch, videoId]);

  //  function to handle options and answer
  const handleOptionChange = (index, e) => {
    const { value, checked } = e.target;
    setNewQuestionData((prevData) => ({
      ...prevData,
      options: prevData.options.map((option, i) => {
        // i === index ? { ...option, option: value, isCorrect: checked } : option
        if (i === index) {
          if (value === "on") {
            return { ...option, isCorrect: checked };
          } else {
            return { ...option, option: value };
          }
        } else {
          return option;
        }
      }),
    }));
  };

  //   reset form hence it's not needed
  const reset = () => {
    setQuestion("");
    setNewQuestionData({
      options: [
        { id: 1, option: "", isCorrect: false },
        { id: 2, option: "", isCorrect: false },
        { id: 3, option: "", isCorrect: false },
        { id: 4, option: "", isCorrect: false },
      ],
    });
    setVideoId("");
  };

  // handle form submit function
  const handleAddQuestion = (e) => {
    e.preventDefault();

    editQuiz({
      id: initialQuizzId,
      data: {
        question,
        video_id: assignedVideo?.id,
        video_title: assignedVideo?.title,
        ...newQuestionData,
      },
    });
    reset();
  };

  // handle success and error state
  useEffect(() => {
    if (isError) {
      toast.error("Failed to update the quiz");
    }
    if (isSuccess) {
      toast.success("Successfully edited the quiz");
      navigate("/admin/quizzes", { replace: true });
    }
  }, [isSuccess, navigate, isError]);

  return (
    <form className='mt-4 space-y-3' onSubmit={handleAddQuestion}>
      <div className='shadow overflow-hidden sm:rounded-md'>
        <div className='px-4 py-4 bg-white sm:p-6'>
          <label className=' block text-base font-medium text-gray-900 min-w-max mt-2'>
            Question:
            <input
              type='text'
              name='question'
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className='mt-1 py-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm  border border-gray-900/20 rounded-md text-gray-900 px-2'
              required
            />
          </label>
          <label className='block text-base font-medium text-gray-900 min-w-max mt-2'>
            Video Id:
            <input
              type='text'
              name='video_id'
              value={videoId}
              placeholder={`please enter id from 1 to ${videos?.length}`}
              onChange={(e) => setVideoId(e.target.value)}
              className='mt-1 py-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm  border border-gray-900/20 rounded-md text-gray-900 px-2'
              required
            />
            {(resError !== "" || !assignedVideo?.id) && videoId !== "" && (
              <p className='col-span-6 text-rose-500 font font-medium '>
                *video not found
              </p>
            )}
          </label>
          <label className='block text-base font-medium text-gray-900 min-w-max mt-2'>
            Options:
            {newQuestionData.options.map((option, index) => (
              <div
                key={option.id}
                className='flex justify-center items-center gap-x-4'
              >
                <input
                  type='text'
                  value={option.option}
                  onChange={(e) => handleOptionChange(index, e)}
                  className='mt-1 py-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm  border border-gray-900/20 rounded-md text-gray-900 px-2'
                  required
                />

                <label className='flex justify-center items-center gap-x-2'>
                  Correct:
                  <input
                    type='checkbox'
                    checked={option.isCorrect}
                    onChange={(e) => handleOptionChange(index, e)}
                  />
                </label>
              </div>
            ))}
          </label>
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
  );
}
