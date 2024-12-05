import { useDispatch, useSelector } from "react-redux";
import Question from "./Questions/Question";
import { useNavigate, useParams } from "react-router";
import { setAttempt, setAnswer } from "./Attempt/your_attempt_reducer";
import Timer from "./Timer";
import { useEffect, useState } from "react";
import * as client from "./client";
import Time from "./Time";

export default function Quiz({ isPreview }: { isPreview: boolean }) {
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const { qid } = useParams();
  let questionNum = parseInt(useParams().questionNum || "1");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const quizzes = useSelector(
    (state: any) => state.quizzesReducer?.quizzes ?? []
  );
  const { currentUser } = useSelector(
    (state: any) => state.accountReducer ?? []
  );
  const { attempt } = useSelector((state: any) => state.attemptReducer ?? []);
  const thisQuiz = quizzes.find((quiz: any) => quiz._id === qid); // this would pull from server

  if (questionNum < 1 || questionNum > thisQuiz.questions.length) {
    questionNum = 1;
  }

  const fetchAttempt = async () => {
    try {
      let response = await client.getLatestAttempt(qid || "", currentUser._id);
      console.log("attempt", response);
      dispatch(setAttempt(response));
    } catch (error) {
      console.error("Failed to fetch or start attempt:", error);
    }
  };

  const handleAnswerChange = async (questionIndex: any, answer: any) => {
    try {
      const updatedAnswers = [...attempt.answers];
      updatedAnswers[questionIndex] = answer;

      dispatch(setAnswer({ questionIndex, answer }));

      await client.updateAttemptAnswers(
        qid || "",
        currentUser._id,
        updatedAnswers
      );
    } catch (error) {
      console.error("Failed to update answer:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      await client.submitAttempt(qid || "", currentUser._id);
      setShowSubmitDialog(false);
      // // Fetch the latest attempt to get updated data
      await fetchAttempt();
      // console.log('attempt after fetch after submit', attempt);
    } catch (error) {
      console.error("Failed to submit attempt:", error);
    }
  };

  return (
    <div id="wd-quiz">
      {JSON.stringify(attempt)}
      <br />
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>{thisQuiz.title}</h2>
        {attempt.submitted ? (
          <Time
            elapsedS={Math.floor((attempt.submittedAt - attempt.start) / 1000)}
          />
        ) : (
          <Timer startTime={attempt.start} />
        )}
      </div>

      <ul className="list-group">
        {(thisQuiz.oneQuestionPerPage ? [thisQuiz.questions[questionNum - 1]] : thisQuiz.questions).map((q: any, index: any) => (
          <li key={index} className="list-group-item">
            <Question
              question={q}
              questionNumber={thisQuiz.oneQuestionPerPage ? questionNum : index + 1}
              point={q.content.point}
              isDisabled={attempt.submitted}
              handleAnswerChange={handleAnswerChange}
            />
          </li>
        ))}
      </ul>

      {thisQuiz.oneQuestionPerPage && (
        <div className="p-2">
          {questionNum < thisQuiz.questions.length && <button 
            className="float-end btn btn-secondary" 
            onClick={() => navigate(`/Kanbas/Courses/${thisQuiz.course}/Quizzes/${thisQuiz._id}/Take/${questionNum + 1}`)}>
            Next Question
          </button>}
          {questionNum > 1 && <button 
            className="btn btn-secondary" 
            onClick={() => navigate(`/Kanbas/Courses/${thisQuiz.course}/Quizzes/${thisQuiz._id}/Take/${questionNum - 1}`)}>
            Previous Question
          </button>}
        </div>
      )}

      <br />

      {attempt.submitted ? (
        <div className="d-flex justify-content-end mt-3">
          <h4>
            Your score: {attempt.score} / {thisQuiz.points}
          </h4>
        </div>
      ) : (
        <div className="d-flex justify-content-end mt-3">
          <button
            className="btn btn-primary"
            onClick={() => setShowSubmitDialog(true)}
          >
            Submit Quiz
          </button>
        </div>
      )}

      {showSubmitDialog && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              {/* Modal content as before */}
              <div className="modal-header">
                <h5 className="modal-title">Submit Quiz</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowSubmitDialog(false)}
                />
              </div>
              <div className="modal-body">
                <p>Are you sure you want to submit your answers?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowSubmitDialog(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
