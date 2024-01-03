import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizAnswer: undefined,
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    addQuizAnswer: (state, action) => {
      state.quizAnswer = action.payload;
    },
  },
});

export const { addQuizAnswer } = quizzesSlice.actions;

export default quizzesSlice.reducer;
