// TODO: remove when real data is present

import { ClosedQuestion, OpenQuestion } from './types';

export const closedQuestions: ClosedQuestion[] = [
    {
        id: 1,
        question: "Wybierz poprawne tłumaczenie słowa 'dog'",
        answers: ["kot", "pies", "ptak", "ryba"],
        correctAnswer: "pies"
    },
    {
        id: 2,
        question: "Wybierz poprawne tłumaczenie słowa 'car'",
        answers: ["samochód", "samolot", "pies", "pociąg"],
        correctAnswer: "samochód"
    },
    {
        id: 3,
        question: "Jak przetłumaczyć 'house'?",
        answers: ["dom", "mieszkanie", "zamek", "piwnica"],
        correctAnswer: "dom"
    },
    {
        id: 4,
        question: "Wybierz rzeczownik",
        answers: ["run", "fast", "ball", "pretty"],
        correctAnswer: "ball"
    },
    {
        id: 5,
        question: "Które słowo oznacza 'książka'?",
        answers: ["pen", "book", "chair", "notebook"],
        correctAnswer: "book"
    },
    {
        id: 6,
        question: "Jak przetłumaczyć 'window'?",
        answers: ["okno", "drzwi", "podłoga", "sufit"],
        correctAnswer: "okno"
    },
    {
        id: 7,
        question: "Które to kolor?",
        answers: ["dog", "green", "run", "sing"],
        correctAnswer: "green"
    },
    {
        id: 8,
        question: "Wybierz czasownik",
        answers: ["book", "run", "table", "slow"],
        correctAnswer: "run"
    },
    {
        id: 9,
        question: "Jak przetłumaczyć 'train'?",
        answers: ["samolot", "pociąg", "tramwaj", "rower"],
        correctAnswer: "pociąg"
    },
    {
        id: 10,
        question: "Co znaczy 'apple'?",
        answers: ["banan", "pomarańcza", "jabłko", "gruszka"],
        correctAnswer: "jabłko"
    }
];

export const openQuestions: OpenQuestion[] = [
    {
        id: 1,
        question: "Uzupełnij zdanie poprawnym zwrotem: He ___ after his father",
        correctAnswer: "takes"
    },
    {
        id: 2,
        question: "Jak powiedzieć po angielsku 'dzień dobry'?",
        correctAnswer: "Good morning"
    },
    {
        id: 3,
        question: "Przetłumacz na angielski: 'Mam kota'",
        correctAnswer: "I have a cat"
    },
    {
        id: 4,
        question: "Uzupełnij zdanie poprawnym czasem: She ___ to school every day.",
        correctAnswer: "goes"
    },
    {
        id: 5,
        question: "Uzupełnij zdanie poprawnym czasem: They ___ TV when I came.",
        correctAnswer: "were watching"
    },
    {
        id: 6,
        question: "Uzupełnij zdanie poprawnym czasem: I ___ dinner at 7 p.m. yesterday.",
        correctAnswer: "was eating"
    },
    {
        id: 7,
        question: "Uzupełnij zdanie poprawnym czasem: He ___ a book right now.",
        correctAnswer: "is reading"
    },
    {
        id: 8,
        question: "Uzupełnij zdanie poprawnym czasem: If I ___ more time, I would travel.",
        correctAnswer: "had"
    },
    {
        id: 9,
        question: "Przetłumacz na angielski: 'Lubię grać w piłkę nożną'",
        correctAnswer: "I like playing football"
    },
    {
        id: 10,
        question: "Przetłumacz na angielski: 'On mieszka w Londynie'",
        correctAnswer: "He lives in London"
    }
];
