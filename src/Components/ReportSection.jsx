import {
  Box,
  Button,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Stack,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { INDEX_ANSWER_MAPPING } from '../Constants';
import WrongQuestionsReview from './WrongQuestionsReview';

export default function ReportSection() {
  const [allQuestions, setAllQuestions] = useState([]);

  const [correctQuestions, setCorrectQuestions] = useState([]);
  const [wrongQuestions, setWrongQuestions] = useState([]);
  const [unansweredQuestions, setUnansweredQuestions] = useState([]);

  const [score, setScore] = useState(0);

  const updateQusetionLists = () => {
    const newAllQuestions = JSON.parse(localStorage.getItem('questions'));
    setAllQuestions(newAllQuestions);

    setCorrectQuestions(
      newAllQuestions.filter((question) => question.answer === true),
    );

    setWrongQuestions(
      newAllQuestions.filter((question) => question.answer === false),
    );

    setUnansweredQuestions(
      newAllQuestions.filter((question) => question.answer === null),
    );
  };

  // answer unanswered questions
  const [userAnswerIndex, setUserAnswerIndex] = useState(null);
  const [userAnswer, setUserAnswer] = useState(null);
  const checkAnswer = () => {
    if (
      parseInt(userAnswerIndex) === parseInt(unansweredQuestions[0].answerIndex)
    ) {
      setUserAnswer(true);
    } else {
      setUserAnswer(false);
    }
  };

  // for ok button on answer card
  const nextQuestion = () => {
    // update localStorage
    const newAllQuestions = JSON.parse(localStorage.getItem('questions'));
    newAllQuestions[unansweredQuestions[0].index].answer = userAnswer;
    localStorage.setItem('questions', JSON.stringify(newAllQuestions));

    // state variables
    updateQusetionLists();
    setUserAnswerIndex(null);
    setUserAnswer(null);

    // calculate score is all questions are answered
    calculateScore();
  };

  // calculate score is all questions are answered
  const calculateScore = () => {
    const newAllQuestions = JSON.parse(localStorage.getItem('questions'));
    const newUnansweredQuestions = newAllQuestions.filter(
      (question) => question.answer === null,
    );
    if (newUnansweredQuestions.length === 0) {
      const correctAnswers = newAllQuestions.filter(
        (question) => question.answer === true,
      );
      setScore(
        Math.round((correctAnswers.length / newAllQuestions.length) * 10000) /
          100,
      );
    }
  };

  const [seeWrongQuestionsFlag, setSeeWrongQuestionsFlag] = useState(false);
  const seeWrongQuestions = () => {
    setSeeWrongQuestionsFlag(true);
  };

  useEffect(() => {
    updateQusetionLists();
    calculateScore();
  }, []);

  return (
    <>
      <Paper elevation={3} sx={{ padding: '20px' }}>
        <Box>Total questions: {allQuestions.length}</Box>
        <Box>Correct answers: {correctQuestions.length}</Box>
        <Box>Wrong answers: {wrongQuestions.length}</Box>
        <Box>Flagged (Unanswerd) questions: {unansweredQuestions.length}</Box>
        {unansweredQuestions.length === 0 && (
          <>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                fontSize: '2em',
              }}
            >
              Score: {score}%
            </Box>

            {wrongQuestions.length > 0 && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '20px',
                }}
              >
                <Button variant='outlined' onClick={seeWrongQuestions}>
                  See Correct Answers
                </Button>
              </Box>
            )}
          </>
        )}
      </Paper>

      {/* unanswered questions */}
      {unansweredQuestions.length > 0 && (
        <>
          {userAnswer === null && (
            <Paper elevation={3} sx={{ padding: '20px', marginTop: '20px' }}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                Flagged Questions
              </Box>
              <Box>{unansweredQuestions[0].question}</Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Stack>
                  <RadioGroup
                    value={userAnswerIndex}
                    onChange={(e) => setUserAnswerIndex(e.target.value)}
                  >
                    <FormControlLabel
                      value={0}
                      control={<Radio />}
                      label={'A. ' + unansweredQuestions[0].answers[0]}
                    />
                    <FormControlLabel
                      value={1}
                      control={<Radio />}
                      label={'B. ' + unansweredQuestions[0].answers[1]}
                    />
                    <FormControlLabel
                      value={2}
                      control={<Radio />}
                      label={'C. ' + unansweredQuestions[0].answers[2]}
                    />
                    <FormControlLabel
                      value={3}
                      control={<Radio />}
                      label={'D. ' + unansweredQuestions[0].answers[3]}
                    />
                  </RadioGroup>

                  {userAnswerIndex !== null && (
                    <Button variant='outlined' onClick={checkAnswer}>
                      Check Answer
                    </Button>
                  )}
                </Stack>
              </Box>
            </Paper>
          )}

          {/* when userAnswer is correct */}
          {userAnswer !== null && (
            <Paper sx={{ padding: '20px', marginTop: '20px' }}>
              {userAnswer && (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <img
                    src='./icons/check-mark.png'
                    alt='checkmark'
                    style={{ height: '100px' }}
                  />
                </Box>
              )}
              {userAnswer === false && (
                <>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <img
                      src='./icons/error.png'
                      alt='error'
                      style={{ height: '80px' }}
                    />
                  </Box>
                  <Box
                    sx={{
                      fontWeight: 'bold',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    {INDEX_ANSWER_MAPPING[unansweredQuestions[0].answerIndex]}
                  </Box>
                </>
              )}

              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant='outlined' onClick={nextQuestion}>
                  Ok
                </Button>
              </Box>
            </Paper>
          )}
        </>
      )}

      {/* wrong questions */}
      {wrongQuestions.length > 0 && seeWrongQuestionsFlag && (
        <WrongQuestionsReview questions={wrongQuestions} />
      )}
    </>
  );
}
