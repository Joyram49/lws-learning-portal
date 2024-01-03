import { useDispatch, useSelector } from "react-redux";
import MyPostion from "../../components/leader/MyPostion";
import Top20 from "../../components/leader/Top20";
import { useEffect, useState } from "react";
import { apiSlice } from "../../features/api/apiSlice";
import getOptimizedResult from "../../utils/getOptimizedResult";
import Error from "../../components/ui/Error";
import SkeletonLeaderboard from "../../components/ui/skeleton/SkeletonLeaderboard";

export default function LeaderBoard() {
  const [usersResult, setUsersResult] = useState([]);
  const [error, setError] = useState("");

  // get logged in user info
  const {
    user: { id: student_id, name: student_name },
  } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  // get assignment marks
  useEffect(() => {
    const fetchData = async () => {
      try {
        // get all assignment mark in database
        const assignmentMarks = await dispatch(
          apiSlice.endpoints.getAssignmentMarks.initiate()
        );

        // get all quiz mark in database
        const quizMarks = await dispatch(
          apiSlice.endpoints.getQuizMarks.initiate()
        );
        setUsersResult(
          getOptimizedResult(assignmentMarks?.data, quizMarks?.data)
        );
        setError("");
      } catch (err) {
        setError(err);
      }
    };
    fetchData();
  }, [dispatch]);
  useEffect(() => {
    if (!usersResult) {
      setError("No result found yet. Pleas try again later");
    }
  }, [usersResult]);

  let content = null;
  if (usersResult.length === 0) {
    content = <SkeletonLeaderboard />;
  }

  if (error === undefined || error !== "") {
    <Error message={"Failed to load data"} />;
  }

  if (usersResult.length > 0) {
    content = (
      <>
        {" "}
        <MyPostion usersResult={usersResult} studentId={student_id} />
        <div className='my-8'>
          <h3 className='text-lg font-bold'>Top 20 Result</h3>
          <Top20 usersResult={usersResult} />
        </div>{" "}
      </>
    );
  }

  return (
    <section className='py-6 bg-primary'>
      <div className='mx-auto max-w-7xl px-5 lg:px-0'>{content}</div>
    </section>
  );
}
