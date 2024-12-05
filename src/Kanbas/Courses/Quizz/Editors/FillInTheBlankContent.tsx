import { useState } from "react";
import { FillInTheBlankQuestionContent } from "./QuizQuestionTypes";
import { Button } from "react-bootstrap";

export default function FillInTheBlankContent({
  content,
  setContent,
}: {
  content: FillInTheBlankQuestionContent;
  setContent: (content: FillInTheBlankQuestionContent) => void;
}) {
  const addChoice = () => {
    setContent({
      ...content,
      answer: [...content.answer, `Answer${content.blanks.length + 1}`],
      blanks: [...content.blanks, `Prompt${content.blanks.length + 1}`],
    });
  };

  const setPrompt = (index: number, prompt: string) => {
    setContent({
      ...content,
      blanks: content.blanks.map((oldValue, i) =>
        i === index ? prompt : oldValue
      ),
    });
  };
  const setAnswer = (index: number, ans: string) => {
    setContent({
      ...content,
      answer: content.answer.map((oldValue, i) =>
        i === index ? ans : oldValue
      ),
    });
  };

  const questionTextHandler = (e: any) => {
    setContent({
      ...content,
      text: e.target.value,
    });
  };
  return (
    <div>
      <h6>Question</h6>
      <input
        className="form-control"
        value={content.text}
        onChange={questionTextHandler}
        placeholder="Question Text"
      />
      <br></br>
      {content.blanks.map((prompt, index) => (
        <div className="d-flex">
          <input
            className="form-control"
            value={prompt}
            onChange={(e) => {
              setPrompt(index, e.target.value);
            }}
            placeholder={`Prompt${index + 1}`}
          />
          <input
            className="form-control"
            value={content.answer[index]}
            onChange={(e) => {
              setAnswer(index, e.target.value);
            }}
            placeholder={`Answer${index + 1}`}
          />
        </div>
      ))}
      <br></br>
      <Button variant="primary" onClick={addChoice}>
        +Add Another Answer
      </Button>
    </div>
  );
}
