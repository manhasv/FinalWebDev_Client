import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAnswer } from "../Attempt/your_attempt_reducer";
import { isDisabled } from "@testing-library/user-event/dist/utils";

export default function FillInTheBlank({
  questionIndex,
  question,
  handleAnswerChange,
  isDisabled,
} : {
  questionIndex: number;
  question: any;
  handleAnswerChange?: (questionIndex: number, answer: any) => void;
  isDisabled: boolean;
}) {
  const { attempt } = useSelector((state: any) => state.attemptReducer);
  const dispatch = useDispatch();

  const [theseAnswers, setTheseAnswers] = useState<string[]>(
    attempt.answers[questionIndex] ? [ ...attempt.answers[questionIndex] ] : question.content.blanks.map((_:any) => "")
  );
  

  const updateBlank = (st: string, ind: number) => {
    let newAnswers = [...theseAnswers];
    newAnswers[ind] = st;
    setTheseAnswers(newAnswers);
    dispatch(
      setAnswer({
        questionIndex,
        answer: [...newAnswers],
      })
    );
    if (handleAnswerChange) {
      handleAnswerChange(questionIndex, [...newAnswers]);
    }
  };

  return (
    <div>
      {question.content.text}
      {question.content.blanks.map((textForBlank: string, index: number) => {
        return (
          <>
            <br />
            <label>
              {textForBlank}
              <input
                defaultValue={
                  attempt.answers[questionIndex] ? attempt.answers[questionIndex][index] : ""
                }
                onChange={(e) => {
                  updateBlank(e.target.value, index);
                }}
                disabled={isDisabled}
              ></input>
            </label>
          </>
        );
      })}
    </div>
  );
}
