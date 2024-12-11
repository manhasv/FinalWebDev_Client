import { BsGripVertical, BsCheck2Circle, BsThreeDotsVertical, BsXCircle } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import ReactDOM from "react-dom";
import { useEffect, useState } from "react";
import { deleteQuiz, unPublishQuiz, publishQuiz } from "./reducer";
import * as quizClient from "./client";
import { setAttempt } from "./Attempt/your_attempt_reducer";

interface QuizItemProps {
  quiz: any;
  isFaculty: boolean;
  scores: any; // map of quiz id to score for user
}
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  // Use UTC
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${month}/${day}/${year}`;
}

export default function QuizItem({ quiz, isFaculty, scores }: QuizItemProps) {
  const { cid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const [showMenu, setShowMenu] = useState(false);
  const [isPublished, setIsPublished] = useState(quiz.publish);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  const toggleMenu = (event: React.MouseEvent) => {
    const { bottom, left } = event.currentTarget.getBoundingClientRect();
    setMenuPosition({ top: bottom, left: left });
    setShowMenu(!showMenu);
  };

  const handleEdit = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`);
  };

  const handleDelete = async () => {
    await quizClient.deleteQuizz(quiz._id);
    dispatch(deleteQuiz(quiz._id));
  };



  const handlePublishToggle = async () => {
    setIsPublished(!isPublished);
    await quizClient.updateQuizz({ ...quiz, publish: !isPublished });
    if (!isPublished) {
      dispatch(publishQuiz(quiz._id));
    } else {
      dispatch(unPublishQuiz(quiz._id));
    }
  };

  const handleCopy = () => {
    console.log("Copy Quiz to another course");
  };

  const quizStatusText = () => {
    const today = new Date();
    if (today < new Date(quiz.availableDate)) {
      // alert(`available at: ${JSON.stringify(new Date(quiz.availableDate))}`)
      return `Not available until ${quiz.availableDate.split("T")[0]}`;
    }
    if (today <= new Date(quiz.dueDate)) {
      // alert(`available at: ${JSON.stringify(new Date(quiz.availableDate))}`);
      return "Available";
    } else {
      return "Closed";
    }
  }

  const quizStatusColor = new Date() < new Date(quiz.availableDate) || new Date() > new Date(quiz.dueDate)
    ? "text-danger" // Red for "Not available until" and "Closed"
    : "text-dark";  // Black for "Available"

  return (
    <li className="wd-quiz-item list-group-item p-3 ps-1 d-flex align-items-center">
      <BsGripVertical className="me-2 fs-3" />
      <FaRegEdit className="me-4 text-success fs-5" />
      <div className="flex-grow-1">
        <a
          className="fw-bold text-dark text-decoration-none"
          href={`#/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`}
        >
          {quiz.title}
        </a>
        <div>
          <span className="d-block">
            <span className="me-2">Status:</span>
            <span className={`${quizStatusColor} me-2`}>{quizStatusText()}</span>
            {/* {quizStatusText === "Not available until" && (
              <span className="text-dark"> {formatDate(quiz.availableDate)}</span>
            )}
            {quizStatusText === "Available"} */}
            <span className="me-2">|</span>
            <strong className="me-2">Due</strong>
            <span className="me-2">
              {quiz.dueDate ? formatDate(quiz.dueDate) : "N/A"} at 11:59pm
            </span>
            <span className="me-2">|</span>
            <span className="me-2">{quiz.points ?? 0} pts</span>
            <span className="me-2">|</span>
            <span className="me-2">{quiz.questions.length} questions</span>
          </span>
          {(currentUser?.role === "STUDENT" && scores[quiz._id] !== undefined) ? (
            <span className="d-block mt-1">
              <strong>Last Score:</strong> {scores[quiz._id]}/{quiz.points} pts
            </span>
          ) : <></>}
        </div>
      </div>

      {/* Checkmark and Settings Icons */}
      <div className="d-flex align-items-center position-relative">
        {isPublished ? (
          <BsCheck2Circle className="text-success fs-4 me-3" title="Completed" />
        ) : (
          <BsXCircle className="text-danger fs-4 me-3" title="Not Completed" />
        )}
        {isFaculty && <BsThreeDotsVertical
          className="fs-5"
          title="Settings"
          onClick={toggleMenu}
          style={{ cursor: "pointer" }}
        />}
      </div>

      {showMenu && (
        <QuizContextMenu
          position={menuPosition}
          onClose={() => setShowMenu(false)}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onPublishToggle={handlePublishToggle}
          isPublished={isPublished}
          onCopy={handleCopy}
        />
      )}
    </li>
  );
}

// QuizContextMenu component using React Portal
function QuizContextMenu({ position, onClose, onEdit, onDelete, onPublishToggle, isPublished, onCopy }: {
  position: { top: number, left: number },
  onClose: () => void,
  onEdit: () => void,
  onDelete: () => void,
  onPublishToggle: () => void,
  isPublished: boolean,
  onCopy: () => void
}) {
  return ReactDOM.createPortal(
    <div
      className="quiz-context-menu position-fixed bg-white border shadow p-2 rounded"
      style={{ top: position.top, left: position.left - 50, zIndex: 1000 }}
      onClick={(e) => e.stopPropagation()}>
      <ul className="list-unstyled mb-0">
        <li className="p-2" onClick={() => { onEdit(); onClose(); }}>Edit</li>
        <li className="p-2" onClick={() => { onDelete(); onClose(); }}>Delete</li>
        <li className="p-2" onClick={() => { onPublishToggle(); onClose(); }}>
          {isPublished ? "Unpublish" : "Publish"}
        </li>
        <li className="p-2" onClick={() => { onCopy(); onClose(); }}>Copy</li>
      </ul>
    </div>,
    document.body // Renders the menu at the root level
  );
}

