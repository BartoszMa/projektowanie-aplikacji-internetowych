import {Collection, Db, ObjectId} from 'mongodb';
import {OpenQuestion, OpenQuestionResponse} from "../types";


const COLLECTION_NAME = "openQuestions";
type OpenQuestionWithType = OpenQuestionResponse & { type: 'open' };

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

    async getOpenQuestionsIds(): Promise<ObjectId[]> {
        try {
            const cursor = this.collection.find({}, { projection: { _id: 1 } });
            const documents = await cursor.toArray();
            return documents.map(q => q._id);
        } catch (error) {
            console.error(error);
            throw new Error(`Error retrieving OpenQuestionsIds: ${error}`);
        }
    }

    async getOpenQuestion(question_id: ObjectId): Promise<OpenQuestionWithType> {
        try {
            const result = await this.collection.findOne({_id: question_id});
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

    async editOpenQuestion(question_id: ObjectId, question: OpenQuestion): Promise<void> {
        try {
            await this.collection.replaceOne({_id: question_id}, question)
        } catch (error) {
            console.error(error);
            throw new Error(`Error updating open question: ${error}`);
        }
    }

    async deleteOpenQuestion(question_id: ObjectId): Promise<void> {
        try {
            await this.collection.deleteOne({_id: question_id});
        } catch (error) {
            console.error(error);
            throw new Error(`Error deleting Open question: ${error}`);
        }
    }
}