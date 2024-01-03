import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import authSliceReducer from "../features/auth/authSlice";
import videosSliceReducer from "../features/videos/videosSlice";
import quizzesSliceReducer from "../features/quizzes/quizzesSlice";
import assignmentSliceReducer from "../features/assignment/assignmentSlice";
import assignmentMarkSliceReducer from "../features/assignmentMark/assignmentMarkSlice";
import quizMarkSliceReducer from "../features/quizMark/quizMarkSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    videos: videosSliceReducer,
    quizzes: quizzesSliceReducer,
    assignment: assignmentSliceReducer,
    assignmentMark: assignmentMarkSliceReducer,
    quizMark: quizMarkSliceReducer,
  },
  devTools: import.meta.env.MODE !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
