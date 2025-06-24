export type QuestionType = 'open' | 'closed';

export interface OpenQuestion {
    id: number;
    question: string;
    correctAnswer: string;
}

export interface ClosedQuestion {
    id: number;
    question: string;
    answers: string[];
    correctAnswer: string;
}

export interface UserAnswer {
    type: QuestionType;
    id: number;
    answer: string;
}

export interface AnswerResult {
    type: QuestionType;
    id: number;
    answer: string;
    correctAnswer: string | null;
}
