import { createSlice } from "@reduxjs/toolkit";
// import { quizzes as initialQuizzes } from "../../Database";

const initialState = {
  quizzes: <any>[],
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuiz: (state, { payload: quizzes }) => {
      state.quizzes = quizzes;
    },
    addQuiz: (state, { payload: quiz }) => {

      const newQuiz = {
        _id: new Date().getTime().toString(),
        ...quiz,
        questions: quiz.questions || []
      };
      state.quizzes.push(newQuiz);
    },
    deleteQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.filter((q:any) => q._id !== quizId);
    },
    updateQuiz: (state, { payload: quiz }) => {
      state.quizzes = state.quizzes.map((q:any) =>
        q._id === quiz._id
          ? quiz
          : q
      ); 
    },
    editQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.map((q:any) =>
        q._id === quizId ? { ...q, editing: true } : q
      );
    },
    publishQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.map((q:any) =>
        q._id === quizId ? { ...q, publish: true } : q
      );
    },
    unPublishQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.map((q:any) =>
        q._id === quizId ? { ...q, publish: false } : q
      );
    },
    setQuizScore: (state, { payload: { quizId, score } }) => {
      state.quizzes = state.quizzes.map((q:any) =>
        q._id === quizId ? { ...q, score } : q
      );
    },
  },
});

export const { unPublishQuiz, publishQuiz, addQuiz, deleteQuiz, updateQuiz, editQuiz, setQuizScore, setQuiz } = quizzesSlice.actions;
export default quizzesSlice.reducer;
