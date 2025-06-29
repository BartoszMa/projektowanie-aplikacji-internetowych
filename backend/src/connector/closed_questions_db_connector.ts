import {Collection, Db} from 'mongodb';
import {ClosedQuestion} from "../types";


const COLLECTION_NAME = "closedQuestions";

export class ClosedQuestionsDbConnector {
    private readonly collection: Collection<ClosedQuestion>;

    public constructor(db: Db) {
        this.collection = db.collection(COLLECTION_NAME);
    }

    async getRandomClosedQuestions(questions_number: number=10): Promise<ClosedQuestion[]> {
        const result = await this.collection.aggregate([{ $sample: {size: questions_number} }]).toArray();
        if (!result) {
            throw new Error(`Random ClosedQuestion not found.`);
        }
        return result as ClosedQuestion[];
    }

    async getClosedQuestion(question_id: number): Promise<ClosedQuestion> {
        const result = await this.collection.findOne({id: question_id});
        if (!result) {
            throw new Error(`Question not found: ${question_id}`);
        }
        return result;
    }

    async insertClosedQuestions(questions: ClosedQuestion[]) {
        await this.collection.insertMany(questions)
    }
}