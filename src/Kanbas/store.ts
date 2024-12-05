import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import accountReducer from "./Account/reducer";
import assignmentsReducer from "./Courses/Assignments/reducer";
import enrollmentsReducer from "./Enrollment/reducer";
import quizzesReducer from "./Courses/Quizz/reducer";
import attemptReducer from "./Courses/Quizz/Attempt/your_attempt_reducer"
const store = configureStore({
  reducer: {
    modulesReducer,
    accountReducer,
    assignmentsReducer,
    enrollmentsReducer,
    quizzesReducer,
    attemptReducer,
  },
});
export default store;