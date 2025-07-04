import { Router } from 'express';
import {ClosedQuestion, OpenQuestion, UserAnswer} from '../types';
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
        try {
            const answers: UserAnswer[] = req.body.answers;
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
            res.status(401).json({ "authenticated": false });
        }
    })

    router.get("/questions-id/open", async (_, res) => {
        try {
            const result = await questionService.getOpenQuestionsIds();
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get open questions.' });
        }
    })

    router.get("/questions-id/closed", async (_, res) => {
        try {
            const result = await questionService.getClosedQuestionsIds();
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get close questions.' });
        }
    })

    router.get("/question/open/:id", async (req, res) => {
        try {
            const id = parseInt(req.params.id, 10);
            await questionService.getOpenQuestion(id);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get open question.' });
        }
    })

    router.get("/question/closed/:id", async (req, res) => {
        try {
            const id = parseInt(req.params.id, 10);
            await questionService.getClosedQuestion(id);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get open question.' });
        }
    })

    router.post("/question/open", async (req, res) => {
        if (req.headers.username === "admin" || req.headers.username === "admin") {
            try {
                const question: OpenQuestion = req.body
                await questionService.addOpenQuestion(question);
            } catch (error) {
                res.status(500).json({ error: 'Failed to add question.' });
            }
        } else {
            res.status(401).json("User not allowed");
        }
    })

    router.post("/question/closed", async (req, res) => {
        if (req.headers.username === "admin" || req.headers.username === "admin") {
            try {
                const question: ClosedQuestion = req.body
                await questionService.addClosedQuestion(question);
            } catch (error) {
                res.status(500).json({ error: 'Failed to add question.' });
            }
        } else {
            res.status(401).json("User not allowed");
        }
    })

    router.put("/question/closed", async (req, res) => {
        if (req.headers.username === "admin" || req.headers.username === "admin") {
            try {
                const question: ClosedQuestion = req.body
                await questionService.editClosedQuestion(question);
            } catch (error) {
                res.status(500).json({ error: 'Failed to update close question.' });
            }
        } else {
            res.status(401).json("User not allowed");
        }
    })

    router.put("/question/close", async (req, res) => {
        if (req.headers.username === "admin" || req.headers.username === "admin") {
            try {
                const question: OpenQuestion = req.body
                await questionService.editOpenQuestion(question);
            } catch (error) {
                res.status(500).json({ error: 'Failed to update open question.' });
            }
        }
    })

    return router;
}
