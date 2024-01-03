import { Link, useParams } from "react-router-dom";
import getLocaleDate from "../../utils/getLocaleDate";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { apiSlice } from "../../features/api/apiSlice";
import StudentAssginmentModal from "./studentAssignmentModal/StudentAssginmentModal";

export default function VideoInfo({ video }) {
  const { title, createdAt, description, id: videoId } = video || {};
  const { id } = useParams();

  // get logged in user
  const {
    user: { id: userId },
  } = useSelector((state) => state.auth);

  const [assignment, setAssignment] = useState([]);
  const [error, setError] = useState("");
  const [assignmentError, setAssignmentError] = useState("");
  const [opened, setOpened] = useState(false);

  // handle modal open or close
  const controlModal = () => {
    setOpened((prevState) => !prevState);
  };

  const dispatch = useDispatch();

  // fetching required data from database and handle error state to  participating quiz
  useEffect(() => {
    const fetchData = async () => {
      try {
        // get quizzes against videoId
        const quizzesResult = await dispatch(
          apiSlice.endpoints.getQuizzesWithVideoId.initiate(videoId)
        );
        // get quizMark against videoId and userId
        const markResult = await dispatch(
          apiSlice.endpoints.getQuizMark.initiate({ userId, videoId })
        );
        setError("");

        // Check conditions and update error state based on the fetched data
        if (quizzesResult?.data && quizzesResult.data.length === 0) {
          setError("This video has no quiz");
        }

        if (markResult?.data && markResult.data.length > 0) {
          setError("You already have submitted the quiz");
        }

        if (!id) {
          setError("You haven't selected a video! Please select a video");
        }
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, [dispatch, videoId, userId, id]);

  // fetching required data from database and handle error state to  submit assignment
  useEffect(() => {
    const fetchData = async () => {
      try {
        let assignmentResult = [];
        let assignmentMarkResult = [];
        if (videoId) {
          // get assignment against videoId
          assignmentResult = await dispatch(
            apiSlice.endpoints.getAssignmentWithVideoId.initiate(videoId)
          );
          setAssignment(assignmentResult?.data[0]);
          // get assignmentMark against videoId and userId
          assignmentMarkResult = await dispatch(
            apiSlice.endpoints.getAssignmentMarkWithSid.initiate({
              userId,
              id: assignmentResult?.data[0]?.id,
            })
          );
        }
        setAssignmentError("");

        // Check conditions and update error state based on the fetched data
        if (assignmentResult?.data && assignmentResult.data.length === 0) {
          setAssignmentError("This video has no assignment");
        }

        if (
          assignmentMarkResult?.data &&
          assignmentMarkResult.data.length > 0
        ) {
          setAssignmentError("You already have submitted the assignment");
        }

        if (!id) {
          setAssignmentError(
            "You haven't selected a video! Please select a video"
          );
        }
      } catch (err) {
        setAssignmentError(err);
      }
    };
    fetchData();
  }, [dispatch, videoId, userId, id]);

  return (
    <>
      <div>
        <h1 className='text-lg font-semibold tracking-tight text-slate-100'>
          {title ||
            "Things I wish I knew as a Junior Web Developer - Sumit Saha - BASIS SoftExpo 2023"}
        </h1>
        <h2 className=' pb-4 text-sm leading-[1.7142857] text-slate-400'>
          Uploaded on{" "}
          {`${getLocaleDate(createdAt)} || Uploaded on 23 February 2020`}
        </h2>

        <div className='flex gap-4'>
          <button
            className={`px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm ${
              assignmentError === ""
                ? "hover:bg-cyan hover:text-primary"
                : "bg-transparent hover:cursor-not-allowed"
            }`}
            disabled={assignmentError}
            title={assignmentError === "" ? "" : assignmentError}
            onClick={controlModal}
          >
            এসাইনমেন্ট
          </button>

          <Link
            to={error === "" ? `quizzes` : ""}
            state={{ title, videoId }}
            className={`px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm ${
              error === ""
                ? "hover:bg-cyan hover:text-primary"
                : "bg-transparent cursor-not-allowed"
            }`}
            title={error === "" ? "" : error}
          >
            কুইজে অংশগ্রহণ করুন
          </Link>
        </div>
        <p className='mt-4 text-sm text-slate-400 leading-6'>
          {description ||
            "আপনারা যারা বিগিনার হিসেবে রিয়্যাক্ট জেস নিয়ে কাজ করা শুরু করেছেন, তারা রিয়্যাক্ট এর বেশ কিছু কনসেপ্ট ঠিক মতো আয়ত্ত না করতে পারার কারণে বিচিত্র কিছু সমস্যার সম্মুখীন হন এবং শেষপর্যন্ত বুঝতে নাপেরে হতাশ হয়ে পড়েন। তাদের জন্যই এই ভিডিওটি। এই ভিডিওতে আমি এমন ১০টি সমস্যার কথা তুলে ধরেছি যেগুলো বিগিনার হিসেবে আপনারা অহরহ সম্মুখীন হবেন। আশা করি ভিডিওটি দেখলে আপনাদের এই সমস্যাগুলো নিয়েআর কনফিউশন থাকবেনা।"}
        </p>
      </div>
      <StudentAssginmentModal
        open={opened}
        control={controlModal}
        assignment={assignment}
      />
    </>
  );
}
