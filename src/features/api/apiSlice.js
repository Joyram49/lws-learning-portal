import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: async (headers, { endpoint, getState }) => {
      const token = getState()?.auth?.accessToken;
      if (token) {
        headers.set(`Authorization`, `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: [
    "Videos",
    "Video",
    "Assignment",
    "Assignment",
    "Quizzes",
    "QuizzesWithVideoId",
    "Quiz",
    "AssignmentMarks",
    "AssignmentMark",
    "QuizMarks",
    "QuizMark",
  ],
  endpoints: (builder) => ({}),
});
