import {Collection, Db} from 'mongodb';
import {ClosedQuestion} from "../types";


const COLLECTION_NAME = "closedQuestions";
type ClosedQuestionWithType = ClosedQuestion & { type: 'closed' };

export class ClosedQuestionsDbConnector {
    private readonly collection: Collection<ClosedQuestion>;

    public constructor(db: Db) {
        this.collection = db.collection(COLLECTION_NAME);
    }

    async getRandomClosedQuestions(questions_number: number=10): Promise<ClosedQuestionWithType[]> {
        try {
            const result = await this.collection.aggregate([{$sample: {size: questions_number}}]).toArray();
            const typedResult = result.map(q => ({
                ...q,
                type: 'closed' as const
            }));
            return typedResult as ClosedQuestionWithType[];
        } catch (error) {
            console.error(error);
            throw new Error(`Error getting closed questions: ${error}`);
        }
    }

    async getClosedQuestion(question_id: number): Promise<ClosedQuestionWithType> {
        try {
            const result = await this.collection.findOne({id: question_id});
            if (!result) throw new Error(`Question with id ${question_id} not found`);
            const typedResult = {
                ...result,
                type: 'closed' as const
            };
            return typedResult as ClosedQuestionWithType;
        } catch (error) {
            console.error(error);
            throw new Error(`Error getting closed question: ${error}`);
        }
    }

    async insertClosedQuestions(questions: ClosedQuestion[]) {
        try {
            await this.collection.insertMany(questions)
        } catch (error) {
            console.error(error);
            throw new Error(`Error inserting closed questions: ${error}`);
        }

    }
}