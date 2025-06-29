import {Collection, Db} from 'mongodb';
import {OpenQuestion} from "../types";


const COLLECTION_NAME = "a";

export class OpenQuestionsDbConnector {
    private readonly collection: Collection<OpenQuestion>;

    public constructor(db: Db) {
        this.collection = db.collection(COLLECTION_NAME);
    }

    async getRandomOpenQuestions(questions_number: number=10): Promise<OpenQuestion[]> {
        try {
            const result = await this.collection.aggregate([{ $sample: {size: questions_number} }]).toArray();

            return result as OpenQuestion[];

        } catch (error) {
            console.error(error);
            throw new Error(`Error retrieving OpenQuestions: ${error}`);
        }
    }

    async getOpenQuestion(question_id: number): Promise<OpenQuestion> {
        try {
            const result = await this.collection.findOne({id: question_id});

            return result as OpenQuestion;
        } catch (error) {
            console.error(error);
            throw new Error(`Error retrievin Question: ${error}`);
        }
    }

    async insertOpenQuestions(questions: OpenQuestion[]) {
        try {
            await this.collection.insertMany(questions)
        }
        catch (error) {
            console.log(error);
            throw new Error(`Error adding OpenQuestions: ${error}`);
        }

    }
}