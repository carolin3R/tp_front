import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  TextField,
  Button,
  Typography,
  Box
} from '@mui/material';

class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latestQuestions: []
    };
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:8080/polls/')
      .then(response => {
        this.setState({ latestQuestions: response.data.latest_question_list });
      })
      .catch(error => {
        console.error('Error fetching latest questions:', error);
        console.log(error.toJSON());
      });
  }

  render() {
    return (
      <div>
        <Typography sx={{ mt: 3 }} align='center' color='primary' variant="h5">Latest Questions:</Typography>
        <Box 
          display="flex"
          justifyContent="center"
          alignItems="center">
        <ul style={{listStyleType: 'none'}}>
          {this.state.latestQuestions.map(question => (
            <li key={question.id}>
              <Link to={'/polls/' + question.id}>
                <Button color='secondary'>
                {"question " + question.id + ": " + question.question_text}
                </Button>
              </Link>
                </li>
          ))}
        </ul>
        </Box>
      </div>
    );
  }
}

export default IndexPage;