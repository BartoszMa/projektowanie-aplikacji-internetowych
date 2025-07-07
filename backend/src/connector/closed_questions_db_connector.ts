import {Collection, Db, ObjectId} from 'mongodb';
import {ClosedQuestion, ClosedQuestionResponse} from "../types";


const COLLECTION_NAME = "closedQuestions";
type ClosedQuestionWithType = ClosedQuestionResponse & { type: 'closed' };

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

    async getClosedQuestion(question_id: ObjectId): Promise<ClosedQuestionWithType> {
        try {
            const result = await this.collection.findOne({_id: question_id});
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

    async getClosedQuestionsIds(): Promise<ObjectId[]> {
        try {
            const cursor = this.collection.find({}, { projection: { _id: 1 } });
            const documents = await cursor.toArray();
            return documents.map(q => q._id);
        } catch (error) {
            console.error(error);
            throw new Error(`Error retrieving ClosedQuestionsIds: ${error}`);
        }
    }

    async editClosedQuestion( id: ObjectId, question: ClosedQuestion): Promise<void> {
        try {
            await this.collection.replaceOne({_id: id}, question)
        } catch (error) {
            console.error(error);
            throw new Error(`Error updating closed question: ${error}`);
        }
    }

    async deleteClosedQuestion(question_id: ObjectId): Promise<void> {
        try {
            await this.collection.deleteOne({_id: question_id});
        } catch (error) {
            console.error(error);
            throw new Error(`Error deleting closed question: ${error}`);
        }
    }
}