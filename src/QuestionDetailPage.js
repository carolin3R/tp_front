import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
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
const QuestionDetailPage = () => {
  const { questionId } = useParams();
  const [question, setQuestion] = useState(null);
  const [selectedChoice, setSelectedChoice] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const apiUrl = `http://127.0.0.1:8080/polls/${questionId}/`;
    console.log('Request URL:', apiUrl); // Log the URL
    axios.get(apiUrl)
      .then(response => {
        setQuestion(response.data);
      })
      .catch(error => {
        setError(`Failed to fetch question details. Error: ${error.message}, ${questionId}`);
      });
  }, [questionId]);

  const handleVote = async () => {
    if (!selectedChoice) {
        setError("Please select a choice before submitting your vote.");
        return;
      }

    console.log("SELECTED CHOICE: ", selectedChoice)
    try {
      await axios.post(`http://127.0.0.1:8080/polls/${questionId}/vote/`, { "choice": parseInt(selectedChoice) },{
    });
      
      console.log('Vote submitted successfully'); // Add this line
      navigate(`/polls/${questionId}/results`);
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            console.error('Server Error:', error.response.status, error.response.data);
            // Handle specific error messages from the server
            if (error.response.status === 400 && error.response.data.error === "You didn't select a choice.") {
              setError("Please select a choice before submitting your vote.");
            } else {
              setError(`Server Error: ${error.response.data}`);
            }
          } else if (error.request) {
            // The request was made but no response was received
            console.error('Network Error:', error.request);
            setError('Network Error: Unable to communicate with the server.');
          } else {
            // Something happened in setting up the request that triggered an error
            console.error('Error:', error.message);
            setError('Error: Something went wrong while submitting the vote.');
          }
        }
      };

  const handleChange = (event) => {
    setSelectedChoice(event.target.value);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!question) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
    <Box bgcolor='secondary.dark'>
      <Typography align='center' color='white' variant="h4" padding={2}>{question.question}</Typography>
      </Box>
      <form>
      <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      fontSize={20}
      bgcolor='secondary.light'
      marginTop={2} marginBottom={2}>
        <ul style={{listStyleType: 'none'}}>
          {question.choices.map(choice => (
            <li key={choice.id}>
              <input
                type="radio"
                //name="choice"
                value={choice.id}
                onChange={handleChange}
                checked={selectedChoice === String(choice.id)}
              />
              {choice.choice_text}
            </li>
          ))}
        </ul>
        </Box>
        <Box textAlign='center' margin={2}>
        <Link to={'/polls/' + questionId + "/results"}>
        <Button type="button" variant="contained" onClick={handleVote}>
            Vote
        </Button>
        </Link>
        </Box>
      </form>
      <Box textAlign='center' margin={2}>
      <Button variant="contained" onClick={() => window.history.back()}>Back</Button>
      </Box>
      </ThemeProvider>
  );
};

export default QuestionDetailPage;



