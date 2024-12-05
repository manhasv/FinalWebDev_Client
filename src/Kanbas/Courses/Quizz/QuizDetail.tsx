import { useParams, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setAttempt } from "./Attempt/your_attempt_reducer";
import * as client from "./client";
import { useEffect } from "react";

export default function QuizDetails() {
  const { qid } = useParams();
  const navigate = useNavigate();
  const quiz = useSelector(
    (state: any) => state.quizzesReducer.quizzes.find((q: any) => q._id === qid) // this would use the server
  );

  const { attempt } = useSelector((state: any) => state.attemptReducer);

  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser.role === "FACULTY";
  const isStudent = currentUser.role === "STUDENT";

  const dispatch = useDispatch();
  const fetchAttempt = async () => {
    try {
      let response = await client.getLatestAttempt(qid || "", currentUser._id);
      console.log("fetch attempt", response);
      dispatch(setAttempt(response)); // the response is now the attempt
    } catch (error) {
      console.error("Failed to fetch or start attempt:", error);
    }
  };

  const startAttempt = async () => {
    try {
      let response = await client.startAttempt(qid || "", currentUser._id); // i think this should return the latest attempt
      console.log("start attempt", response);
      dispatch(setAttempt(response));
    } catch (error) {
      console.error("Failed to fetch or start attempt:", error);
    }
  };

  useEffect(() => {
    fetchAttempt();
  }, []);

  const attemptActive: boolean = attempt; // check for time ?

  const handleTakeQuiz = async (startNew: boolean = false) => {
    if (!attemptActive || startNew) {
      await startAttempt();
    }
    navigate(`/Kanbas/Courses/${quiz.course}/Quizzes/${quiz._id}/Take${quiz.oneQuestionAtATime ? "/1" : ""}`);
  };

  const handlePreview = async () => {
    if (!attemptActive) {
      await startAttempt();
    }
    navigate(`/Kanbas/Courses/${quiz.course}/Quizzes/${quiz._id}/Preview`);
  };

  const handleEdit = () => {
    navigate(`/Kanbas/Courses/${quiz.course}/Quizzes/${quiz._id}/Edit`);
  };

  const startButtonText = () => {
    if (attemptActive && !attempt.submitted) {
      return "Resume Quiz";
    }
    if (attemptActive && attempt.submitted) {
      if (quiz.multipleAttempts) {
        return "View Last Attempt";
      } else {
        return "View Quiz";
      }
    }
    return "Start Quiz";
  };

  return (
    <div className="container mt-4 text-center">
      {attempt == undefined && "UNDEFINED HEY"}
      {JSON.stringify(attempt)}
      {/* Centered Buttons and Divider */}
      <div className="d-flex justify-content-center mb-2">
        {isStudent && (
          <>
            {attempt && attempt.submitted && quiz.multipleAttempts && (
              <button className="btn btn-danger me-2" onClick={(e) => {
                handleTakeQuiz(true); // start new attempt
              }}>Start New Attempt</button>
            )}
            <button
              className="btn btn-danger me-2"
              onClick={(e) => {
                handleTakeQuiz();
              }}
            >
              {startButtonText()}
            </button>
          </>
        )}
        {isFaculty && (
          <>
            <button className="btn btn-primary me-2" onClick={handlePreview}>
              Preview
            </button>
            <button className="btn btn-secondary" onClick={handleEdit}>
              Edit
            </button>
          </>
        )}
      </div>
      <hr />

      {/* Title below the divider */}
      <h2 className="quiz-title text-start">{quiz.title}</h2>

      {/* Single-column, aligned Quiz Details */}
      <div className="quiz-details mt-4 mx-auto" style={{ maxWidth: "600px" }}>
        <div className="row mb-3">
          <div className="col-4 text-end">
            <strong>Quiz Type:</strong>
          </div>
          <div className="col-8 text-start">{quiz.type || "Graded Quiz"}</div>
        </div>
        <div className="row mb-3">
          <div className="col-4 text-end">
            <strong>Points:</strong>
          </div>
          <div className="col-8 text-start">{quiz.points || 0}</div>
        </div>
        <div className="row mb-3">
          <div className="col-4 text-end">
            <strong>Assignment Group:</strong>
          </div>
          <div className="col-8 text-start">
            {quiz.assignmentGroup || "Quizzes"}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-4 text-end">
            <strong>Shuffle Answers:</strong>
          </div>
          <div className="col-8 text-start">
            {quiz.shuffleAnswers ? "Yes" : "No"}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-4 text-end">
            <strong>Time Limit:</strong>
          </div>
          <div className="col-8 text-start">
            {quiz.timeLimit || "20 Minutes"}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-4 text-end">
            <strong>Multiple Attempts:</strong>
          </div>
          <div className="col-8 text-start">
            {quiz.multipleAttempts ? "Yes" : "No"}
          </div>
        </div>
        {quiz.multipleAttempts && (
          <div className="row mb-3">
            <div className="col-4 text-end">
              <strong>How Many Attempts:</strong>
            </div>
            <div className="col-8 text-start">{quiz.attempts || 1}</div>
          </div>
        )}
        <div className="row mb-3">
          <div className="col-4 text-end">
            <strong>Show Correct Answers:</strong>
          </div>
          <div className="col-8 text-start">
            {quiz.showCorrectAnswers ? "Yes" : "No"}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-4 text-end">
            <strong>Access Code:</strong>
          </div>
          <div className="col-8 text-start">{quiz.accessCode || "None"}</div>
        </div>
        <div className="row mb-3">
          <div className="col-4 text-end">
            <strong>One Question at a Time:</strong>
          </div>
          <div className="col-8 text-start">
            {quiz.oneQuestionAtATime ? "Yes" : "No"}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-4 text-end">
            <strong>Webcam Required:</strong>
          </div>
          <div className="col-8 text-start">
            {quiz.webcamRequired ? "Yes" : "No"}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-4 text-end">
            <strong>Lock Questions After Answering:</strong>
          </div>
          <div className="col-8 text-start">
            {quiz.lockQuestions ? "Yes" : "No"}
          </div>
        </div>
      </div>

      {/* Dates */}
      <table className="table table-borderless mt-4">
        <thead style={{ borderBottom: "2px solid #dee2e6" }}>
          <tr>
            <th className="text-center">Due</th>
            <th className="text-center">Available From</th>
            <th className="text-center">Until</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-center">{quiz.dueDate || "N/A"}</td>
            <td className="text-center">{quiz.availableDate || "N/A"}</td>
            <td className="text-center">{quiz.untilDate || "N/A"}</td>
          </tr>
        </tbody>
      </table>
      <div style={{ borderTop: "2px solid #dee2e6" }}></div>
    </div>
  );
}
