import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { addQuiz, setQuiz, updateQuiz } from "../reducer";
import { Link } from "react-router-dom";
import * as coursesClient from "../../client";
import * as quizzClient from "../client";

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes);

  const quizData = quizzes.find((q: any) => q._id === qid) || {
    title: "",
    description: "",
    points: 0,
    availableDate: "",
    dueDate: "",
    untilDate: "",
    type: "Graded Quiz",
    multipleAttempts: false,
    allowedAttempts: 3,
    shuffleAnswers: false,
    timeLimit: 20,
    assignmentGroup: "Quizzes",
  };

  const [quiz, setLocalQuiz] = useState(quizData);

  const handleSave = async () => {
    alert(`saving quiz ${JSON.stringify(quiz)}`);
    if (!qid || qid === "New") {
      await coursesClient.createQuizzForCourse(cid as string, quiz);
      dispatch(addQuiz({ ...quiz, course: cid }));
    } else {
      await quizzClient.updateQuizz(quiz);
      dispatch(updateQuiz({ ...quiz, _id: qid, course: cid }));
    }
    navigate(`/Kanbas/Courses/${cid}/Quizzes`);
  };

  const handleChange = (field: string, value: string | number | boolean) => {
    setLocalQuiz({ ...quiz, [field]: value });
  };

  const fetchQuiz = async () => {
    const quiz = await coursesClient.findQuizForCourse(cid as string);
    alert('populating reducer')
    dispatch(setQuiz(quiz));
    setLocalQuiz(quiz.find((q: any) => q._id === qid) || {
      title: "",
      description: "",
      points: 0,
      availableDate: "",
      dueDate: "",
      untilDate: "",
      type: "Graded Quiz",
      multipleAttempts: false,
      allowedAttempts: 3,
      shuffleAnswers: false,
      timeLimit: 20,
      assignmentGroup: "Quizzes",
    });
  };
  useEffect(() => {
    if (quizzes.length === 0) {
      fetchQuiz();
    }
  }, [qid]);

  return (
    <div id="quiz-editor" className="container mt-4">
      {/* Tab Navigation */}
      <div className="d-flex mb-4">
        <div
          className="tab"
          onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Edit`)}
          style={{
            cursor: "pointer",
            padding: "10px",
            fontWeight: "bold",
            borderBottom: "2px solid black"
          }}
        >
          Details
        </div>
        <div
          className="tab"
          onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Questions`)}
          style={{
            cursor: "pointer",
            padding: "10px",
            fontWeight: "normal",
            borderBottom: "1px solid lightgray"
          }}
        >
          Questions
        </div>
      </div>

      <hr />

      {/* Details Tab Content */}
      <div className="mb-4">
        <label htmlFor="quiz-title" className="form-label fw-bold">Quiz Title</label>
        <input
          type="text"
          id="quiz-title"
          className="form-control"
          value={quiz.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="quiz-description" className="form-label fw-bold">Description</label>
        <textarea
          id="quiz-description"
          className="form-control"
          rows={5}
          value={quiz.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
      </div>

      <table className="table table-borderless w-100">
        <tbody>
          <tr className="mb-3">
            <td>
              <div className="row align-items-center">
                <div className="col-md-2 text-end">
                  <label htmlFor="quiz-points">Points</label>
                </div>
                <div className="col-md-10">
                  <input
                    type="number"
                    id="quiz-points"
                    className="form-control"
                    value={quiz.points}
                    onChange={(e) => handleChange("points", Number(e.target.value))}
                  />
                </div>
              </div>
            </td>
          </tr>

          <tr className="mb-3">
            <td>
              <div className="row align-items-center">
                <div className="col-md-2 text-end">
                  <label htmlFor="quiz-available-date">Available From</label>
                </div>
                <div className="col-md-10">
                  <input
                    type="date"
                    id="quiz-available-date"
                    className="form-control"
                    value={quiz.availableDate}
                    onChange={(e) => handleChange("availableDate", e.target.value)}
                  />
                </div>
              </div>
            </td>
          </tr>

          <tr className="mb-3">
            <td>
              <div className="row align-items-center">
                <div className="col-md-2 text-end">
                  <label htmlFor="quiz-due-date">Due Date</label>
                </div>
                <div className="col-md-10">
                  <input
                    type="date"
                    id="quiz-due-date"
                    className="form-control"
                    value={quiz.dueDate}
                    onChange={(e) => handleChange("dueDate", e.target.value)}
                  />
                </div>
              </div>
            </td>
          </tr>

          <tr className="mb-3">
            <td>
              <div className="row align-items-center">
                <div className="col-md-2 text-end">
                  <label htmlFor="quiz-until-date">Until Date</label>
                </div>
                <div className="col-md-10">
                  <input
                    type="date"
                    id="quiz-until-date"
                    className="form-control"
                    value={quiz.untilDate}
                    onChange={(e) => handleChange("untilDate", e.target.value)}
                  />
                </div>
              </div>
            </td>
          </tr>

          <tr className="mb-3">
            <td>
              <div className="row align-items-center">
                <div className="col-md-2 text-end">
                  <label htmlFor="quiz-type">Quiz Type</label>
                </div>
                <div className="col-md-10">
                  <select
                    id="quiz-type"
                    className="form-control"
                    value={quiz.type}
                    onChange={(e) => handleChange("type", e.target.value)}
                  >
                    <option value="Graded Quiz">Graded Quiz</option>
                    <option value="Practice Quiz">Practice Quiz</option>
                    <option value="Graded Survey">Graded Survey</option>
                    <option value="Ungraded Survey">Ungraded Survey</option>
                  </select>
                </div>
              </div>
            </td>
          </tr>

          <tr className="mb-3">
            <td>
              <div className="row align-items-center">
                <div className="col-md-2 text-end">
                  <label htmlFor="quiz-time-limit">Time Limit (minutes)</label>
                </div>
                <div className="col-md-10">
                  <input 
                    className="form-control" 
                    defaultValue={quiz.timeLimit} 
                    onChange={(e) => handleChange("timeLimit", parseInt(e.target.value))}>
                  </input>
                </div>
              </div>
            </td>
          </tr>

          <tr className="mb-3">
            <td>
              <div className="row align-items-center">
                <div className="col-md-2 text-end">Shuffle Answers</div>
                <div className="col-md-10">
                  <input
                    type="checkbox"
                    className="form-check-input ms-2"
                    checked={quiz.shuffleAnswers}
                    onChange={(e) => handleChange("shuffleAnswers", e.target.checked)}
                  />
                </div>
              </div>
            </td>
          </tr>

          <tr className="mb-3">
            <td>
              <div className="row align-items-center">
                <div className="col-md-2 text-end">Multiple Attempts</div>
                <div className="col-md-10">
                  <input
                    type="checkbox"
                    className="form-check-input ms-2"
                    checked={quiz.multipleAttempts}
                    onChange={(e) => handleChange("multipleAttempts", e.target.checked)}
                  />
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Save and Cancel buttons */}
      <div className="row g-3 mt-2">
        <hr />
        <div className="d-flex justify-content-end">
          <Link to={`/Kanbas/Courses/${cid}/Quizzes`} className="btn btn-secondary me-3">
            Cancel
          </Link>
          <button onClick={handleSave} className="btn btn-danger">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

