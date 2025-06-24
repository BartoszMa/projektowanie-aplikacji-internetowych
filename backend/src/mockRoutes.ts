// TODO: remove when real data and endpoints are present

import { Router } from 'express';
import { closedQuestions, openQuestions } from './mockData';
import { UserAnswer, AnswerResult } from './types';

const router = Router();

function getRandomItems<T>(arr: T[], count: number): T[] {
    return [...arr].sort(() => 0.5 - Math.random()).slice(0, count);
}

function shuffleArray<T>(arr: T[]): T[] {
    return [...arr].sort(() => Math.random() - 0.5);
}

router.get('/mock-closed', (req, res) => {
    const questions = getRandomItems(closedQuestions, 10).map(q => ({
        type: 'closed',
        question: {
            id: q.id,
            question: q.question,
            answers: q.answers
        }
    }));
    res.json(questions);
});

router.get('/mock-open', (req, res) => {
    const questions = getRandomItems(openQuestions, 10).map(q => ({
        type: 'open',
        question: {
            id: q.id,
            question: q.question
        }
    }));
    res.json(questions);
});

router.get('/mock-mix', (req, res) => {
    const closed = getRandomItems(closedQuestions, 5).map(q => ({
        type: 'closed',
        question: {
            id: q.id,
            question: q.question,
            answers: q.answers
        }
    }));

    const open = getRandomItems(openQuestions, 5).map(q => ({
        type: 'open',
        question: {
            id: q.id,
            question: q.question
        }
    }));

    const mixed = shuffleArray([...closed, ...open]);

    res.json(mixed);
});

router.post('/mock-check-answers', (req, res) => {
    const answers: UserAnswer[] = req.body.answers;
    const results: AnswerResult[] = answers.map(({ type, id, answer }) => {
        if (type === 'open') {
            const found = openQuestions.find(q => q.id === id);
            return {
                type,
                id,
                answer,
                correctAnswer: found?.correctAnswer ?? null
            };
        } else {
            const found = closedQuestions.find(q => q.id === id);
            return {
                type,
                id,
                answer,
                correctAnswer: found?.correctAnswer ?? null
            };
        }
    });

    res.json(results);
});

export default router;
