import { useDispatch, useSelector } from "react-redux";
import { setAnswer } from "../Attempt/your_attempt_reducer";

export default function TrueFalse({
  questionIndex,
  question,
  handleAnswerChange,
  isDisabled,
}: {
  questionIndex: number;
  question: any;
  handleAnswerChange?: (questionIndex: number, answer: any) => void;
  isDisabled: boolean;
}) {
  const { attempt } = useSelector((state: any) => state.attemptReducer);
  const dispatch = useDispatch();

  if (!attempt) {
    return <></>;
  }

  return (
    <div>
      {question.content.text}
      <br />
      
      <label>
        <input
          name={`TF#${questionIndex}`}
          type="radio"
          value="true"
          checked={attempt.answers[questionIndex] === true}
          onChange={(e) => {
            if (attempt.answers[questionIndex] !== true && e.target.checked) {
              dispatch(setAnswer({ questionIndex, answer: true }));
              if (handleAnswerChange) {
                handleAnswerChange(questionIndex, true); // Call if exists
              }
            }
            // if (e.target.checked) {
            //   const answer = true;
            //   dispatch(setAnswer({ questionIndex, answer }));
            //   if (handleAnswerChange) {
            //     handleAnswerChange(questionIndex, answer); // Call if exists
            //   }
            // }
          }}
          disabled={isDisabled}
        />
        True
      </label>
      <br />
      <label>
        <input
          name={`TF#${questionIndex}`}
          type="radio"
          value="false"
          checked={attempt.answers[questionIndex] === false}
          onChange={(e) => {
            if (attempt.answers[questionIndex] !== false && e.target.checked) {
              dispatch(setAnswer({ questionIndex, answer: false }));
              if (handleAnswerChange) {
                handleAnswerChange(questionIndex, false); // Call if exists
              }
            }
            // if (attempt[questionIndex] !== !e.target.checked) {
            //   dispatch(setAnswer({ questionIndex, answer: !e.target.checked }));
            // }
          }}
          disabled={isDisabled}
        />
        False
      </label>
    </div>
  );
}
