import { apiSlice } from "../api/apiSlice";

export const quizzesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuizzes: builder.query({
      query: () => ({
        url: "/quizzes",
      }),
      providesTags: ["Quizzes"],
    }),
    getQuizzesWithVideoId: builder.query({
      query: (id) => {
        let queryString = `video_id=${id}`;
        return {
          url: `/quizzes?${queryString}`,
        };
      },
      providesTags: ["QuizzesWithVideoId"],
    }),
    getQuiz: builder.query({
      query: (id) => ({
        url: `/quizzes/${id}`,
      }),
      providesTags: (result, error, arg) => [{ type: "Quiz", id: arg }],
    }),
    addQuiz: builder.mutation({
      query: (data) => ({
        url: `/quizzes`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Quizzes", "QuizzesWithVideoId"],
    }),
    editQuiz: builder.mutation({
      query: ({ id, data }) => ({
        url: `/quizzes/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        "Quizzes",
        "QuizzesWithVideoId",
        { type: "Quiz", id: arg.id },
      ],
    }),
    deleteQuiz: builder.mutation({
      query: (id) => ({
        url: `quizzes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Quizzes", "QuizzesWithVideoId"],
    }),
  }),
});

export const {
  useGetQuizQuery,
  useGetQuizzesQuery,
  useAddQuizMutation,
  useEditQuizMutation,
  useDeleteQuizMutation,
  useGetQuizzesWithVideoIdQuery,
} = quizzesApi;
