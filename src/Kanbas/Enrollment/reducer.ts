import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Enrollment {
  user: string;
  course: string;
}

interface EnrollmentsState {
  enrollments: Enrollment[];
}

const initialState: EnrollmentsState = {
  enrollments: [],
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, action: PayloadAction<Enrollment[]>) => {
      state.enrollments = action.payload;
    },
    enroll: (state, action: PayloadAction<Enrollment>) => {
      state.enrollments.push(action.payload);
    },
    unenroll: (state, action: PayloadAction<Enrollment>) => {
      state.enrollments = state.enrollments.filter(
        (enrollment) =>
          enrollment.user !== action.payload.user || enrollment.course !== action.payload.course
      );
    },
  },
});

export const { setEnrollments, enroll, unenroll } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
