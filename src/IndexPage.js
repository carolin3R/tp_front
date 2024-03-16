import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Button,
  Typography,
  Box
} from '@mui/material';


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
class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latestQuestions: []
    };
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:8800/polls/')
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
      <ThemeProvider theme={theme}>
      <Box bgcolor="secondary.dark" p={2}>
        <Typography sx={{ mt: 3 }} align='center' color='white' variant="h4">
          Welcome to TigerPoll!
        </Typography>
        <Typography variant='subtitle1' align='center' color='secondary.light'>
          Help the USG make student-approved decisions by voting in weekly polls.
        </Typography>
      </Box>
      <div>
        <Typography sx={{ mt: 3 }} align='center' color='primary' variant="h5" margin={4}>Latest Questions:</Typography>
        <Box 
          display="flex"
          justifyContent="center"
          alignItems="center"
          bgcolor="primary.light">
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
      </ThemeProvider>
    );
  }
}

export default IndexPage;