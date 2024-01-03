import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mark: [],
};

const quizMarkSlice = createSlice({
  name: "quizMark",
  initialState,
  reducers: {
    addMark: (state, action) => {
      state.mark = action.payload;
    },
  },
});

export const { addMark } = quizMarkSlice.actions;
export default quizMarkSlice.reducer;
