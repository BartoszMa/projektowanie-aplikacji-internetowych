import {ClosedQuestionsDbConnector} from "../connector/closed_questions_db_connector";
import {AnswerResult, ClosedQuestion, OpenQuestion, UserAnswer} from "../types";
import {OpenQuestionsDbConnector} from "../connector/open_questions_db_connector";

export class QuestionsService {
    private readonly dbOpenConnector: OpenQuestionsDbConnector;
    private readonly dbClosedConnector: ClosedQuestionsDbConnector;

    constructor(dbOpenConnector: OpenQuestionsDbConnector, dbClosedConnector: ClosedQuestionsDbConnector) {
        this.dbOpenConnector = dbOpenConnector;
        this.dbClosedConnector = dbClosedConnector;
    }

    async getRandomClosedQuestions(question_number: number=10): Promise<ClosedQuestion[]> {
        return await this.dbClosedConnector.getRandomClosedQuestions(question_number);
    }

    async getRandomOpenQuestions(question_number: number=10): Promise<OpenQuestion[]> {
        return await this.dbOpenConnector.getRandomOpenQuestions(question_number);
    }

    async getOpenQuestion(id: number): Promise<OpenQuestion> {
        return await this.dbOpenConnector.getOpenQuestion(id)
    }

    async getOpenQuestionsIds(): Promise<number[]> {
        return await this.dbOpenConnector.getOpenQuestionsIds();
    }

    async getMixedQuestions(question_number: number=10): Promise<(OpenQuestion | ClosedQuestion)[]> {
        const open_question_number = question_number - Math.floor(question_number / 2)
        const closed_question_number = question_number - open_question_number

        const open_questions = await this.dbOpenConnector.getRandomOpenQuestions(open_question_number);
        const closed_questions = await this.dbClosedConnector.getRandomClosedQuestions(closed_question_number);

        return [...open_questions, ...closed_questions];
    }

    async checkAnswers(answers: UserAnswer[]): Promise<AnswerResult[]> {
        return await Promise.all(
            answers.map(async ({type, id, answer}) => {
                if (type === 'open') {
                    const found = await this.dbOpenConnector.getOpenQuestion(id);
                    return {
                        type,
                        id,
                        answer,
                        correctAnswer: found?.correctAnswer ?? null
                    };
                }
                const found = await this.dbClosedConnector.getClosedQuestion(id);
                return {
                    type,
                    id,
                    answer,
                    correctAnswer: found?.correctAnswer ?? null
                };
            })
        );
    }

    async addOpenQuestion(question: OpenQuestion): Promise<void> {
        await this.dbOpenConnector.insertOpenQuestions([question])
    }
}