import { createSlice, PayloadAction } from "@reduxjs/toolkit";

declare type QuestionSetter = {
  questionIndex: number;
  answer: any;
};

const initialState = {
  attempt: {
    _id: "",
    user: "",
    quiz: "",
    start: "",
    answers: [] as any[],
    submitted: false,
    score: 0,
    grade: 0,
  },
};

const attemptsSlice = createSlice({
  name: "attempt",
  initialState,
  reducers: {
    setAttempt: (state, { payload: attempt }) => {
      state.attempt = attempt;
    },
    setAnswer: (state, action: PayloadAction<QuestionSetter>) => {
      // alert(`setting answer ${action.payload.questionIndex} to ${action.payload.answer}`);
      state.attempt.answers[action.payload.questionIndex] = action.payload.answer;
    },
  },
});

export const { setAnswer, setAttempt } = attemptsSlice.actions;
export default attemptsSlice.reducer;
