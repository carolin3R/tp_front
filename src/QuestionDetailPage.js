import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Button,
    Typography,
    Box
  } from '@mui/material';
  import { Link } from 'react-router-dom';


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
    console.log("selected choice:", selectedChoice)
    try {
      await axios.post(`http://127.0.0.1:8080/polls/${questionId}/vote/`, { choice: selectedChoice });
      
      console.log('Vote submitted successfully'); // Add this line
      navigate(`/polls/${questionId}/results`);
    } catch (error) {
        console.error('Error submitting vote:', error);
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
    <div>
      <Typography sx={{ mt: 3 }} align='center' color='primary' variant="h4">{question.question}</Typography>
      <form>
      <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      fontSize={20}>
        <ul style={{listStyleType: 'none'}}>
          {question.choices.map(choice => (
            <li key={choice.id}>
              <input
                type="radio"
                name="choice"
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
    </div>
  );
};

export default QuestionDetailPage;



