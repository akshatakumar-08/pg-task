import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentQuestion: 1,
  questionStatus: {},
};

export const userSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    setCurrentQuestion: (state, action) => {
      state.currentQuestion = action.payload;
    },
    markQuestionStatus: (state, action) => {
      const { id, status } = action.payload;
      state.questionStatus[id] = status;
    },
  },
});

export const { setCurrentQuestion, markQuestionStatus } = userSlice.actions;

export default userSlice.reducer;