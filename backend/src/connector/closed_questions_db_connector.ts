import {Collection, Db} from 'mongodb';
import {ClosedQuestion} from "../types";


const COLLECTION_NAME = "closedQuestions";

export class ClosedQuestionsDbConnector {
    private readonly collection: Collection<ClosedQuestion>;

    public constructor(db: Db) {
        this.collection = db.collection(COLLECTION_NAME);
    }

    async getRandomClosedQuestions(questions_number: number=10): Promise<ClosedQuestion[]> {
        try {
            const result = await this.collection.aggregate([{$sample: {size: questions_number}}]).toArray();
            return result as ClosedQuestion[];
        } catch (error) {
            console.log(error);
            throw new Error(`Error getting closed questions: ${error}`);
        }
    }

    async getClosedQuestion(question_id: number): Promise<ClosedQuestion> {
        try {
            const result = await this.collection.findOne({id: question_id});

            return result as ClosedQuestion;
        } catch (error) {
            console.log(error);
            throw new Error(`Error getting closed question: ${error}`);
        }
    }

    async insertClosedQuestions(questions: ClosedQuestion[]) {
        try {
            await this.collection.insertMany(questions)
        } catch (error) {
            console.log(error);
            throw new Error(`Error inserting closed questions: ${error}`);
        }

    }
}