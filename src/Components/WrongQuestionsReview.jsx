import { Box, IconButton, Paper, Stack } from '@mui/material';
import React, { useState } from 'react';
import WestRoundedIcon from '@mui/icons-material/WestRounded';
import EastRoundedIcon from '@mui/icons-material/EastRounded';

// question statement, answers, real answer index in parameter object
export default function WrongQuestionsReview({ questions }) {
  // eslint-disable-next-line no-unused-vars
  const [wrongQuestions, setWrongQuestions] = useState(questions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const nextQuestion = () => {
    if (currentQuestionIndex < wrongQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <>
      <Paper
        elevation={3}
        sx={{ marginTop: '20px', padding: '20px', display: 'flex' }}
      >
        <Box sx={{ minWidth: '30px' }}>
          {currentQuestionIndex > 0 && (
            <IconButton aria-label='left' onClick={prevQuestion}>
              <WestRoundedIcon />
            </IconButton>
          )}
        </Box>

        <Box sx={{ width: '100%', display: 'grid', justifyContent: 'center' }}>
          <Box>{wrongQuestions[currentQuestionIndex].question}</Box>
          <Box>
            <Stack>
              <Box
                sx={
                  wrongQuestions[currentQuestionIndex].answerIndex === 0
                    ? { color: 'green', fontWeight: 'bold' }
                    : {}
                }
              >
                A. {wrongQuestions[currentQuestionIndex].answers[0]}
              </Box>
              <Box
                sx={
                  wrongQuestions[currentQuestionIndex].answerIndex === 1
                    ? { color: 'green', fontWeight: 'bold' }
                    : {}
                }
              >
                B. {wrongQuestions[currentQuestionIndex].answers[1]}
              </Box>
              <Box
                sx={
                  wrongQuestions[currentQuestionIndex].answerIndex === 2
                    ? { color: 'green', fontWeight: 'bold' }
                    : {}
                }
              >
                C. {wrongQuestions[currentQuestionIndex].answers[2]}
              </Box>
              <Box
                sx={
                  wrongQuestions[currentQuestionIndex].answerIndex === 3
                    ? { color: 'green', fontWeight: 'bold' }
                    : {}
                }
              >
                D. {wrongQuestions[currentQuestionIndex].answers[3]}
              </Box>
            </Stack>
          </Box>
        </Box>

        <Box sx={{ minWidth: '30px' }}>
          {currentQuestionIndex < wrongQuestions.length - 1 && (
            <IconButton aria-label='right' onClick={nextQuestion}>
              <EastRoundedIcon />
            </IconButton>
          )}
        </Box>
      </Paper>
    </>
  );
}
