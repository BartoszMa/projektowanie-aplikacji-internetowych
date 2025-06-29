import { Router } from 'express';
import { UserAnswer } from '../types';
import { ClosedQuestionsDbConnector } from '../connector/closed_questions_db_connector';
import { OpenQuestionsDbConnector } from '../connector/open_questions_db_connector';
import { MongoConnector } from '../connector/db_connector';
import { QuestionsService } from '../services/questions_service';

export default function createRouter(mongo_connector: MongoConnector): Router {
    const router = Router();

    const closedQuestionsConnector = new ClosedQuestionsDbConnector(mongo_connector.getDb());
    const openQuestionsConnector = new OpenQuestionsDbConnector(mongo_connector.getDb());
    const questionService = new QuestionsService(openQuestionsConnector, closedQuestionsConnector);

    router.get('/closed-questions', async (_, res) => {
        try {
            const questions = await questionService.getRandomClosedQuestions();
            res.json(questions);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch closed questions.' });
        }
    });

    router.get('/open-questions', async (_, res) => {
        try {
            const questions = await questionService.getRandomOpenQuestions();
            res.json(questions);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch open questions.' });
        }
    });

    router.get('/questions-mix', async (_, res) => {
        try {
            const questions = await questionService.getMixedQuestions();
            res.json(questions);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch mixed questions.' });
        }
    });

    router.post('/check-answers', async (req, res) => {
        const answers: UserAnswer[] = req.body.answers;
        try {
            const results = await questionService.checkAnswers(answers);
            res.json(results);
        } catch (error) {
            res.status(500).json({ error: 'Failed to check answers.' });
        }
    });

    router.get('/authentication', async (req, res) => {
        if (req.headers.username === "admin" || req.headers.username === "admin") {
            res.status(200).json({ "authenticated": true });
        } else {
            res.status(200).json({ "authenticated": false });
        }
    })

    return router;
}
