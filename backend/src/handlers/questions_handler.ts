import { Router } from 'express';
import { UserAnswer } from '../types';
import {ClosedQuestionsDbConnector} from "../connector/closed_questions_db_connector";
import {OpenQuestionsDbConnector} from "../connector/open_questions_db_connector";
import {MongoConnector} from "../connector/db_connector";
import {QuestionsService} from "../services/questions_service";

const router = Router();

const mongoConnector = MongoConnector.getInstance();
const closedQuestionsConnector = new ClosedQuestionsDbConnector(mongoConnector.getDb())
const openQuestionsConnector = new OpenQuestionsDbConnector(mongoConnector.getDb())

const questionService = new QuestionsService(openQuestionsConnector, closedQuestionsConnector);

router.get('/closed', async (_, res) => {
    try {
        const questions = await questionService.getRandomClosedQuestions();
        res.json(questions);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch questions.' });
    }
});

router.get('/open', async (_, res) => {
    try {
        const questions = await questionService.getRandomOpenQuestions();
        res.json(questions);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch questions.' });
    }
});

router.get('/mix', async (_, res) => {
    try {
        const questions = await questionService.getMixedQuestions();
        res.json(questions);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch questions.' });
    }
});

router.post('/check-answers', async (req, res) => {
    const answers: UserAnswer[] = req.body.answers;
    try {
        const results = await questionService.checkAnswers(answers);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch answers.' });
    }
});

export default router;
