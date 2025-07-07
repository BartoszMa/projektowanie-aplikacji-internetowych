import { Router } from 'express';
import {ClosedQuestion, ClosedQuestionResponse, OpenQuestion, OpenQuestionResponse, UserAnswer} from '../types';
import { ClosedQuestionsDbConnector } from '../connector/closed_questions_db_connector';
import { OpenQuestionsDbConnector } from '../connector/open_questions_db_connector';
import { MongoConnector } from '../connector/db_connector';
import { QuestionsService } from '../services/questions_service';
import {ObjectId} from "mongodb";

const SAMPLE_TOKEN = "$2a$12$ji0EkB4y2t3n6IxA0HEBKerR.B3CQhRN7K.ZAaqAQQ.3sjDYy/osS"

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
        if (req.headers.username === "admin" && req.headers.password === "admin") {
            res.status(200).json({ "token": SAMPLE_TOKEN });
        } else {
            res.status(401).json( "User not authenticated" );
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
            const result = await questionService.getOpenQuestion(new ObjectId(req.params.id));
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get open question.' });
        }
    })

    router.get("/question/closed/:id", async (req, res) => {
        try {
            const result = await questionService.getClosedQuestion(new ObjectId(req.params.id));
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get open question.' });
        }
    })

    router.post("/question/open", async (req, res) => {
        if (req.headers.token === SAMPLE_TOKEN) {
            try {
                const question: OpenQuestion = req.body
                await questionService.addOpenQuestion(question);
                res.status(200).json("Question added successfully.");
            } catch (error) {
                res.status(500).json({ error: 'Failed to add question.' });
            }
        } else {
            res.status(401).json("User not allowed");
        }
    })

    router.post("/question/closed", async (req, res) => {
        if (req.headers.token === SAMPLE_TOKEN) {
            try {
                const question: ClosedQuestion = req.body
                await questionService.addClosedQuestion(question);
                res.status(200).json("Question added successfully.");
            } catch (error) {
                res.status(500).json({ error: 'Failed to add question.' });
            }
        } else {
            res.status(401).json("User not allowed");
        }
    })

    router.put("/question/closed", async (req, res) => {
        if (req.headers.token === SAMPLE_TOKEN) {
            try {
                const question: ClosedQuestionResponse = req.body
                await questionService.editClosedQuestion(question);
                res.status(200).json("Question put successfully.");
            } catch (error) {
                res.status(500).json({ error: 'Failed to update close question.' });
            }
        } else {
            res.status(401).json("User not allowed");
        }
    })

    router.put("/question/open", async (req, res) => {
        if (req.headers.token === SAMPLE_TOKEN) {
            try {
                const question: OpenQuestionResponse = req.body
                await questionService.editOpenQuestion(question);
                res.status(200).json("Question put successfully.");
            } catch (error) {
                res.status(500).json({ error: 'Failed to update open question.' });
            }
        } else {
            res.status(401).json("User not allowed");
        }
    })

    router.delete("/question/closed/:id", async (req, res) => {
        if (req.headers.token === SAMPLE_TOKEN) {
            try {
                await questionService.deleteClosedQuestion(new ObjectId(req.params.id))
                res.status(200).json("Question deleted successfully.");
            } catch (error) {
                res.status(500).json({ error: 'Failed to delete closed question.' });
            }
        } else {
            res.status(401).json("User not allowed");
        }
    })

    router.delete("/question/open/:id", async (req, res) => {
        if (req.headers.token === SAMPLE_TOKEN) {
            try {
                await questionService.deleteOpenQuestion(new ObjectId(req.params.id))
                res.status(200).json("Question deleted successfully.");
            } catch (error) {
                res.status(500).json({ error: 'Failed to delete closed question.' });
            }
        } else {
            res.status(401).json("User not allowed");
        }
    })

    return router;
}
