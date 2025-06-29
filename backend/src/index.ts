import express from 'express';
import { MongoConnector } from './connector/db_connector';
import createRouter from './handlers/questions_handler';
import cors from 'cors';
import 'dotenv/config';
import {ClosedQuestionsDbConnector} from "./connector/closed_questions_db_connector";
import {closedQuestions, openQuestions} from "./mockData";
import {OpenQuestionsDbConnector} from "./connector/open_questions_db_connector";

const app = express();
const port = 4200;

(async function main() {
    const mongoConnector = MongoConnector.getInstance();

    try {
        await mongoConnector.init();
        console.log('MongoDB connected.');

        const is_dev = (process.env.DEV_ENVIRONMENT === "true")
        const router = createRouter(mongoConnector);

        if (is_dev) {
            const closedQuestionsConnector = new ClosedQuestionsDbConnector(mongoConnector.getDb());
            const openQuestionsConnector = new OpenQuestionsDbConnector(mongoConnector.getDb());
            await closedQuestionsConnector.insertClosedQuestions(closedQuestions)
            await openQuestionsConnector.insertOpenQuestions(openQuestions)
        }

        app.use(cors());
        app.use(express.json());

        app.use('/api', router);

        app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });

    } catch (err) {
        console.error('Failed to connect to MongoDB:', err);
    }
})()
