import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import QuestionsPage from './pages/QuestionsPage';

function App() {
  return (
      <Router>
          <Header />
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/:type" element={<QuestionsPage />} />
          </Routes>
          <Footer />
      </Router>
  );
}

export default App;
