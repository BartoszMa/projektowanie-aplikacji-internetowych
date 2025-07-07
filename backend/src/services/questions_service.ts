import {ClosedQuestionsDbConnector} from "../connector/closed_questions_db_connector";
import {
    AnswerResult,
    ClosedQuestion,
    ClosedQuestionResponse,
    OpenQuestion,
    OpenQuestionResponse,
    UserAnswer
} from "../types";
import {OpenQuestionsDbConnector} from "../connector/open_questions_db_connector";
import {ObjectId} from "mongodb";

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

    async getOpenQuestion(id: ObjectId): Promise<OpenQuestion> {
        return await this.dbOpenConnector.getOpenQuestion(id)
    }

    async getClosedQuestion(id: ObjectId): Promise<ClosedQuestion> {
        return await this.dbClosedConnector.getClosedQuestion(id);
    }

    async getOpenQuestionsIds(): Promise<ObjectId[]> {
        return await this.dbOpenConnector.getOpenQuestionsIds();
    }

    async getClosedQuestionsIds(): Promise<ObjectId[]> {
        return await this.dbClosedConnector.getClosedQuestionsIds();
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
            answers.map(async ({type, _id, answer}) => {
                if (type === 'open') {
                    const found = await this.dbOpenConnector.getOpenQuestion(new ObjectId(_id));
                    return {
                        type,
                        _id,
                        answer,
                        correctAnswer: found?.correctAnswer ?? null
                    };
                }
                const found = await this.dbClosedConnector.getClosedQuestion(new ObjectId(_id));
                return {
                    type,
                    _id,
                    answer,
                    correctAnswer: found?.correctAnswer ?? null
                };
            })
        );
    }

    async addOpenQuestion(question: OpenQuestion): Promise<void> {
        await this.dbOpenConnector.insertOpenQuestions([question])
    }

    async addClosedQuestion(question: ClosedQuestion): Promise<void> {
        await this.dbClosedConnector.insertClosedQuestions([question])
    }

    async editOpenQuestion(question: OpenQuestionResponse): Promise<void> {
        const question_without_id = {
            question: question.question,
            correctAnswer: question.correctAnswer,
        } as OpenQuestion

        await this.dbOpenConnector.editOpenQuestion(new ObjectId(question._id), question_without_id)
    }

    async editClosedQuestion(question: ClosedQuestionResponse): Promise<void> {
        const question_without_id = {
            question: question.question,
            answers: question.answers,
            correctAnswer: question.correctAnswer,
        } as ClosedQuestion;

        await this.dbClosedConnector.editClosedQuestion(new ObjectId(question._id), question_without_id)
    }

    async deleteClosedQuestion(question_id: ObjectId): Promise<void> {
        await this.dbClosedConnector.deleteClosedQuestion(question_id)
    }

    async deleteOpenQuestion(question_id: ObjectId): Promise<void> {
        await this.dbOpenConnector.deleteOpenQuestion(question_id)
    }
}