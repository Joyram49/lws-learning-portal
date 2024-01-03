import { apiSlice } from "../api/apiSlice";
import { addMark } from "./quizMarkSlice";

export const quizMarkApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuizMarks: builder.query({
      query: () => ({
        url: "/quizMark",
      }),
      providesTags: ["QuizMarks"],
    }),
    getQuizMark: builder.query({
      query: ({ userId, videoId }) => ({
        url: `/quizMark?student_id=${userId}&video_id=${videoId}`,
      }),
      providesTags: (result, error, arg) => [
        { type: "QuizMark", id: arg.userId },
      ],
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(addMark(result?.data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    addQuizMarks: builder.mutation({
      query: (data) => ({
        url: "/quizMark",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        "QuizMarks",
        { type: "QuizMark", id: arg?.data?.student_id },
      ],
    }),
  }),
});

export const {
  useGetQuizMarksQuery,
  useGetQuizMarkQuery,
  useAddQuizMarksMutation,
} = quizMarkApi;
