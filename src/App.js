import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import IndexPage from './IndexPage';
import QuestionDetailPage from './QuestionDetailPage';
import QuestionResultPage from './QuestionResultPage';

function App() {
  return (
    <Router>
      <div>
        <nav>
        </nav>

        <Routes>
          <Route path="/polls/:questionId/results" element={<QuestionResultPage />} />
          <Route path="/polls/:questionId/" element={<QuestionDetailPage />} />
          <Route path="/polls/" element={<IndexPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
