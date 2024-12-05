import { createSlice } from "@reduxjs/toolkit";
// import { attempts as initialAttempts } from "../../../Database";
const initialState = {
  attempts: <any>[],
};

const attemptsSlice = createSlice({
  name: "attempts",
  initialState,
  reducers: {
    setAttempts: (state, { payload: attempts }) => {
      state.attempts = attempts;
    },
    addAttempt: (state, { payload: attempt }) => {
      const newAttempt = {
        _id: new Date().getTime().toString(),
        ...attempt,
      };
      state.attempts.push(newAttempt);
    },
    updateAttempt: (state, { payload: attempt }) => {
      state.attempts = state.attempts.map((a:any) =>
        a._id === attempt._id ? attempt : a
      );
    },
  },
});

export const {
  setAttempts,
  addAttempt,
  updateAttempt,
} = attemptsSlice.actions;
export default attemptsSlice.reducer;
