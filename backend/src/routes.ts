import { Router } from 'express';
import { UserAnswer, AnswerResult } from './types';

const router = Router();

// ====================================
// you can use functions from MockRoutes to getRandomItems and shuffleArray
// =====================================

router.get('/closed-questions', (req, res) => {
    // TODO: implement, example in: mock-closed
    res.sendStatus(501);
});

router.get('/open-questions', (req, res) => {
    // TODO: implement, example in: mock-open
    res.sendStatus(501);
});

router.get('/questions-mix', (req, res) => {
    // TODO: implement, example in: mock-mix
    res.sendStatus(501);
});

export default router;
