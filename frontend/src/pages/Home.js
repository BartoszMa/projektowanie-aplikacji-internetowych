import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <h2>Wybierz tryb testu</h2>
            <button onClick={() => navigate('/closed-questions')}>Pytania zamknięte</button>
            <button onClick={() => navigate('/open-questions')} style={{ margin: '0 1rem' }}>Pytania otwarte</button>
            <button onClick={() => navigate('/questions-mix')}>Mix</button>
        </div>
    );
};

export default Home;
