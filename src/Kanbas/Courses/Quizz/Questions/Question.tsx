import FillInTheBlank from "./FillInTheBlank";
import MultipleChoice from "./MultipleChoice";
import QuestionHeader from "./QuestionHeader";
import TrueFalse from "./TrueFalse";

export default function Question({
  question,
  questionNumber,
  point,
  isDisabled,
  handleAnswerChange, 
}: {
  question: any;
  questionNumber: number;
  point: number;
  isDisabled: boolean;
  handleAnswerChange?: (questionIndex: number, answer: any) => void;
}) {
  const questionType: string = question.type; // get this based on the quiz id and question number
  return (
    <div>
      <QuestionHeader
        isStudentTaking={isDisabled}
        questionNumber={questionNumber}
        points={point}
      />
      <div className="bg-light border border-2 border-top-0 border-dark p-2">
        {questionType == "TRUEFALSE" && <TrueFalse isDisabled={isDisabled} questionIndex={questionNumber - 1} question={question} 
        handleAnswerChange={handleAnswerChange}/>}
        {questionType == "MULTIPLECHOICE" && (
          <MultipleChoice isDisabled={isDisabled} questionIndex={questionNumber - 1} question={question} handleAnswerChange={handleAnswerChange}/>
        )}
        {questionType == "FILLINTHEBLANK" && (
          <FillInTheBlank isDisabled={isDisabled} questionIndex={questionNumber - 1} question={question} handleAnswerChange={handleAnswerChange}/>
        )}
      </div>
    </div>
  );
}
