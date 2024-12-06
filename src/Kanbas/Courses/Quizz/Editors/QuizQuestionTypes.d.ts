// Define types for each QuizQuestion type
export declare type TrueFalseQuestionContent = {
    text: string;
    answer: boolean;
    point: number;
  };
  
export declare type TrueFalseQuestion = {
    _id: number;
    type: "TRUEFALSE";
    content: TrueFalseQuestionContent
  };
  
export declare type MultipleChoiceQuestionContent = {
    text: string;
    choices: Array<string>;
    answer: string;
    point: number;
  };
  
  export declare type MultipleChoiceQuestion = {
    _id: number;
    type: "MULTIPLECHOICE";
    content: MultipleChoiceQuestionContent;
  };
  
  export declare type FillInTheBlankQuestionContent = {
    text: string;
    blanks: string[];
    answer: string[][];
    point: number;
  };
  
  export declare type FillInTheBlankQuestion = {
    _id: number;
    type: "FILLINTHEBLANK";
    content: FillInTheBlankQuestionContent;
  };
  
  export declare type QuizQuestion = TrueFalseQuestion | MultipleChoiceQuestion | FillInTheBlankQuestion;
  export declare type QuizQuestionContent = TrueFalseQuestionContent | MultipleChoiceQuestionContent | FillInTheBlankQuestionContent;