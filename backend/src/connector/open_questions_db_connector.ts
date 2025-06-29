import {Collection, Db} from 'mongodb';
import {OpenQuestion} from "../types";


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
        return result as OpenQuestion[];
    }

    async getOpenQuestion(question_id: number): Promise<OpenQuestion> {
        const result = await this.collection.findOne({id: question_id});
        if (!result) {
            throw new Error(`Question not found: ${question_id}`);
        }
        return result;
    }

    async insertOpenQuestions(questions: OpenQuestion[]) {
        await this.collection.insertMany(questions)
    }
}