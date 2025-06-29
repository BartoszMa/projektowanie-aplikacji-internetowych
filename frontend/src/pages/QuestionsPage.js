import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const QuestionsPage = () => {
    const { type } = useParams(); // 'closed-questions' / 'open-questions' / 'questions-mix'
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [results, setResults] = useState(null);
    const [score, setScore] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const endpointMap = {
        // TODO: change from mockData to realData
        'closed-questions': '/api/closed-questions',
        'open-questions': '/api/open-questions',
        'questions-mix': '/api/questions-mix'
        // 'closed-questions': '/api/mock-closed',
        // 'open-questions': '/api/mock-open',
        // 'questions-mix': '/api/mock-mix'
    };

    const fetchQuestions = () => {
        setLoading(true);
        setError(null);
        axios.get(endpointMap[type])
            .then(res => {
                const data = res.data;
                if (Array.isArray(data)) {
                    const preparedQuestions = data.map((item, idx) => ({
                        ...item,
                        _localId: `${item.type}-${idx}`
                    }));
                    setQuestions(preparedQuestions);
                    setAnswers({});
                    setResults(null);
                    setScore(null);
                } else {
                    console.error('Oczekiwano tablicy pytań, otrzymano:', data);
                    setQuestions([]);
                    setError('Nieprawidłowy format danych z serwera.');
                }
            })
            .catch(error => {
                console.error('Błąd przy pobieraniu pytań:', error);
                setError('Nie udało się pobrać pytań. Spróbuj ponownie później.');
                alert('Nie udało się pobrać pytań. Spróbuj ponownie później.');
            }).finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        if (type in endpointMap) {
            fetchQuestions();
        } else {
            setError('Nieznane zapytanie.');
            setLoading(false);
        }
    }, [type]);

    const handleInputChange = (localId, value) => {
        setAnswers(prev => ({ ...prev, [localId]: value }));
    };

    const handleSubmit = () => {
        const formattedAnswers = questions.map(q => ({
            type: q.type,
            id: q.id,
            answer: answers[q._localId] || ''
        }));

        // TODO: change from mockData to realData
        // '/api/check-answers'
        // '/api/mock-check-answers'
        axios.post('/api/check-answers', {
            answers: formattedAnswers
        })
            .then(res => {
                const resultData = res.data;
                if (Array.isArray(resultData)) {
                    const resultMap = {};
                    resultData.forEach(r => {
                        const index = questions.findIndex(q => q.id === r.id && q.type === r.type)
                        const localId = questions[index]._localId;
                        if (localId) resultMap[localId] = r;
                    });
                    setResults(resultMap);

                    const calculatedScore = questions.filter(q => {
                        const r = resultMap[q._localId];
                        return r && r.answer?.toLowerCase().trim() === r.correctAnswer?.toLowerCase().trim();
                    }).length;
                    setScore(calculatedScore);
                } else {
                    console.error('Nieprawidłowy format wyniku:', resultData);
                    setError('Nieprawidłowa odpowiedź z serwera.');
                }
            })
            .catch(error => {
                console.error('Błąd przy sprawdzaniu odpowiedzi:', error);
                setError('Wystąpił błąd podczas sprawdzania odpowiedzi. Spróbuj ponownie.');
                alert('Wystąpił błąd podczas sprawdzania odpowiedzi. Spróbuj ponownie później.');
            });
    };

    const renderBackButton = () => (
        <div style={{ marginTop: '2rem' }}>
            <button onClick={() => navigate('/')}>Powrót</button>
        </div>
    );

    if (loading) {
        return <div style={{ padding: '1rem' }}>
            Ładowanie pytań...
            {renderBackButton()}
        </div>;
    }

    if (error) {
        return <div style={{ padding: '1rem', color: 'red' }}>
            {error}
            {renderBackButton()}
        </div>;
    }

    return (
        <div style={{ padding: '1rem' }}>
            {renderBackButton()}

            <h2>Pytania ({type})</h2>

            <div style={{ marginTop: '2rem' }}>
                <p>Zbyt łatwe?</p>
                <button onClick={fetchQuestions}>Odśwież</button>
            </div>

            {questions.length === 0 ? (
                <p>Brak pytań do wyświetlenia.</p>
            ) : (
                questions.map((item, idx) => (
                    <div key={item._localId} style={{ marginBottom: '1.5rem' }}>
                        <p><strong>{idx + 1}. {item.question}</strong></p>

                        {item.type === 'open' ? (
                            <input
                                type="text"
                                value={answers[item._localId] || ''}
                                onChange={(e) => handleInputChange(item._localId, e.target.value)}
                                style={{ width: '100%', padding: '0.5rem' }}
                            />
                        ) : (
                            item.answers.map((ans, i) => (
                                <div key={i}>
                                    <label>
                                        <input
                                            type="radio"
                                            name={`question-${item._localId}`}
                                            value={ans}
                                            checked={answers[item._localId] === ans}
                                            onChange={() => handleInputChange(item._localId, ans)}
                                        />
                                        {ans}
                                    </label>
                                </div>
                            ))
                        )}

                        {results && results[item._localId] && (
                            <div>
                                <strong>Poprawna odpowiedź:</strong>{" "}
                                {results[item._localId].correctAnswer}
                            </div>
                        )}
                    </div>
                ))
            )}

            <div style={{ marginTop: '2rem' }}>
                <button onClick={handleSubmit} style={{ marginLeft: '1rem' }}>Sprawdź odpowiedzi</button>
            </div>

            {score !== null && (
                <div style={{ marginTop: '1.5rem', fontWeight: 'bold' }}>
                    Twój wynik: {score} / {questions.length}
                </div>
            )}
        </div>
    );
};

export default QuestionsPage;
