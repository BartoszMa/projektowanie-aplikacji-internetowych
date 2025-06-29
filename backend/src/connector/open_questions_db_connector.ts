import {Collection, Db} from 'mongodb';
import {ClosedQuestion, OpenQuestion} from "../types";


const COLLECTION_NAME = "OpenQuestions";

export class OpenQuestionsDbConnector {
    private readonly collection: Collection<OpenQuestion>;

    public constructor(db: Db) {
        this.collection = db.collection(COLLECTION_NAME);
    }

    async getRandomOpenQuestions(questions_number: number=10): Promise<OpenQuestion[]> {
        const result = await this.collection.aggregate([{ $sample: {size: questions_number} }]).toArray();
        if (!result) {
            throw new Error(`Random OpenQuestions not found.`);
        }
        return result as ClosedQuestion[];
    }

    async insertOpenQuestions(questions: OpenQuestion[]) {
        await this.collection.insertMany(questions)
    }
}