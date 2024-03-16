import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
    Button,
    Typography,
    Box
  } from '@mui/material';
import { Link } from 'react-router-dom';

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
const QuestionResultPage = () => {
    const { questionId } = useParams();
    const [question, setQuestion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Define error state

    useEffect(() => {
        const apiUrl = `http://127.0.0.1:8800/polls/${questionId}/results`;
        console.log('Request URL:', apiUrl); // Log the URL
        console.log(questionId)
        axios.get(`http://127.0.0.1:8800/polls/${questionId}/results`)
          .then(response => {
            setQuestion(response.data);
            setLoading(false);
          })
          .catch(error => {
            setError(`Failed to fetch question results. Error: ${error.message}, ${questionId}`);
            setLoading(false);
        });
      }, [questionId, setLoading, setError]);
    
      if (error) {
        return <div>Error: {error}</div>;
      }
    
      if (loading || !question) {
        return <div>Loading...</div>;
      }
    
    return (
        <ThemeProvider theme={theme}>
        {question ? (
            <>
            <Box bgcolor="secondary.light"  marginBottom={4}>
                <Typography align='center' color='primary.dark' variant="h4">Results:</Typography>
                <Typography align='center' color='secondary.dark' variant="h6">{question.question}</Typography>
                </Box>
                <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                fontSize={18}
                color='secondary.dark'
                bgcolor="primary.light"
                marginTop={4} marginBottom={4}>
                <ul style={{listStyleType: 'none'}}>
                    {question.choices.map(choice => (
                        <li key={choice.id}>
                            {choice.choice_text} - {choice.votes} votes 
                        </li>
                    ))}
                </ul>
                </Box>
                <Box 
                textAlign='center'>
                <Button variant="contained" onClick={() => window.history.back()}>Back</Button>
                </Box>
                <Box 
                textAlign='center'
                margin={2}>
                <Link to={'/polls/'}>
                <Button variant="contained">Home</Button>
                </Link>
                </Box>
            </>
        ) : (
            <div>Loading...</div>
        )}
        </ThemeProvider>
    );
};

export default QuestionResultPage;