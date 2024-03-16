import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
    Button,
    Typography,
    Box
  } from '@mui/material';
import { Link } from 'react-router-dom';

const QuestionResultPage = () => {
    const { questionId } = useParams();
    const [question, setQuestion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Define error state

    useEffect(() => {
        const apiUrl = `http://127.0.0.1:8080/polls/${questionId}/results`;
        console.log('Request URL:', apiUrl); // Log the URL
        console.log(questionId)
        axios.get(`http://127.0.0.1:8080/polls/${questionId}/results`)
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
        <div>
        {question ? (
            <>
                <Typography sx={{ mt: 3 }} align='center' color='primary' variant="h3">Results:</Typography>
                <Typography sx={{ mt: 3 }} align='center' color='secondary' variant="h4">{question.question}</Typography>
                <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                fontSize={20}>
                <ul style={{listStyleType: 'none'}}>
                    {question.choices.map(choice => (
                        <li key={choice.id}>
                            {choice.choice_text} - {choice.votes} votes ({((choice.votes / question.totalVotes) * 100).toFixed(2)}%)
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
        </div>
    );
};

export default QuestionResultPage;