import {Collection, Db} from 'mongodb';
import {OpenQuestion} from "../types";


const COLLECTION_NAME = "openQuestions";
type OpenQuestionWithType = OpenQuestion & { type: 'open' };

export class OpenQuestionsDbConnector {
    private readonly collection: Collection<OpenQuestion>;

    public constructor(db: Db) {
        this.collection = db.collection(COLLECTION_NAME);
    }

    async getRandomOpenQuestions(questions_number: number=10): Promise<OpenQuestionWithType[]> {
        try {
            const result = await this.collection.aggregate([{ $sample: {size: questions_number} }]).toArray();
            const typedResult = result.map(q => ({
                ...q,
                type: 'open' as const
            }));
            return typedResult as OpenQuestionWithType[];
        } catch (error) {
            console.error(error);
            throw new Error(`Error retrieving OpenQuestions: ${error}`);
        }
    }

    async getOpenQuestion(question_id: number): Promise<OpenQuestionWithType> {
        try {
            const result = await this.collection.findOne({id: question_id});
            if (!result) throw new Error(`Question with id ${question_id} not found`);
            const typedResult = {
                ...result,
                type: 'open' as const
            };
            return typedResult as OpenQuestionWithType;
        } catch (error) {
            console.error(error);
            throw new Error(`Error retrievin Question: ${error}`);
        }
    }

    async insertOpenQuestions(questions: OpenQuestion[]) {
        try {
            await this.collection.insertMany(questions)
        } catch (error) {
            console.error(error);
            throw new Error(`Error adding OpenQuestions: ${error}`);
        }

    }
}