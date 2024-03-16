import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IndexPage from './IndexPage';
import QuestionDetailPage from './QuestionDetailPage';
import QuestionResultPage from './QuestionResultPage';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  spacing: 4, 
  palette: {
    contrastThreshold: 4.5,
    primary: {
      main: '#e97816',
      light: '#fcdeb3',
      dark: '#d75012'
    },
    secondary: {
      contrastThreshold: 4.5,
      main: '#438c8a',
      dark: '#324f4c',
      light: '#bae0e1'
    }
  },
});

function App() {
  return (
    <div>
    
      <Router>
        <Routes>
          <Route path="/polls/:questionId/results" element={<QuestionResultPage />} />
          <Route path="/polls/:questionId/" element={<QuestionDetailPage />} />
          <Route path="/polls/" element={<IndexPage />} />
        </Routes>
      </Router>
      </div>
  );
}

export default App;
