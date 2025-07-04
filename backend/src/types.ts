import {ObjectId} from "mongodb";

export type QuestionType = 'open' | 'closed';

export interface OpenQuestion {
    question: string;
    correctAnswer: string;
}

export interface OpenQuestionResponse {
    _id: ObjectId,
    question: string;
    correctAnswer: string;
}

export interface ClosedQuestion {
    question: string;
    answers: string[];
    correctAnswer: string;
}

export interface ClosedQuestionResponse {
    _id: ObjectId,
    question: string;
    answers: string[];
    correctAnswer: string;
}

export interface UserAnswer {
    type: QuestionType;
    _id: ObjectId;
    answer: string;
}

export interface AnswerResult {
    type: QuestionType;
    _id: ObjectId;
    answer: string;
    correctAnswer: string | null;
}
