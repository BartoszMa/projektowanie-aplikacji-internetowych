import { ClosedQuestion, OpenQuestion } from './types';

export const closedQuestions: ClosedQuestion[] = [
    {
        question: "Wybierz poprawne tłumaczenie słowa 'dog'",
        answers: ["kot", "pies", "ptak", "ryba"],
        correctAnswer: "pies"
    },
    {
        question: "Wybierz poprawne tłumaczenie słowa 'car'",
        answers: ["samochód", "samolot", "pies", "pociąg"],
        correctAnswer: "samochód"
    },
    {
        question: "Jak przetłumaczyć 'house'?",
        answers: ["dom", "mieszkanie", "zamek", "piwnica"],
        correctAnswer: "dom"
    },
    {
        question: "Wybierz rzeczownik",
        answers: ["run", "fast", "ball", "pretty"],
        correctAnswer: "ball"
    },
    {
        question: "Które słowo oznacza 'książka'?",
        answers: ["pen", "book", "chair", "notebook"],
        correctAnswer: "book"
    },
    {
        question: "Jak przetłumaczyć 'window'?",
        answers: ["okno", "drzwi", "podłoga", "sufit"],
        correctAnswer: "okno"
    },
    {
        question: "Które to kolor?",
        answers: ["dog", "green", "run", "sing"],
        correctAnswer: "green"
    },
    {
        question: "Wybierz czasownik",
        answers: ["book", "run", "table", "slow"],
        correctAnswer: "run"
    },
    {
        question: "Jak przetłumaczyć 'train'?",
        answers: ["samolot", "pociąg", "tramwaj", "rower"],
        correctAnswer: "pociąg"
    },
    {
        question: "Co znaczy 'apple'?",
        answers: ["banan", "pomarańcza", "jabłko", "gruszka"],
        correctAnswer: "jabłko"
    }
];

export const openQuestions: OpenQuestion[] = [
    {
        question: "Uzupełnij zdanie poprawnym zwrotem: He ___ after his father",
        correctAnswer: "takes"
    },
    {
        question: "Jak powiedzieć po angielsku 'dzień dobry'?",
        correctAnswer: "Good morning"
    },
    {
        question: "Przetłumacz na angielski: 'Mam kota'",
        correctAnswer: "I have a cat"
    },
    {
        question: "Uzupełnij zdanie poprawnym czasem: She ___ to school every day.",
        correctAnswer: "goes"
    },
    {
        question: "Uzupełnij zdanie poprawnym czasem: They ___ TV when I came.",
        correctAnswer: "were watching"
    },
    {
        question: "Uzupełnij zdanie poprawnym czasem: I ___ dinner at 7 p.m. yesterday.",
        correctAnswer: "was eating"
    },
    {
        question: "Uzupełnij zdanie poprawnym czasem: He ___ a book right now.",
        correctAnswer: "is reading"
    },
    {
        question: "Uzupełnij zdanie poprawnym czasem: If I ___ more time, I would travel.",
        correctAnswer: "had"
    },
    {
        question: "Przetłumacz na angielski: 'Lubię grać w piłkę nożną'",
        correctAnswer: "I like playing football"
    },
    {
        question: "Przetłumacz na angielski: 'On mieszka w Londynie'",
        correctAnswer: "He lives in London"
    }
];
