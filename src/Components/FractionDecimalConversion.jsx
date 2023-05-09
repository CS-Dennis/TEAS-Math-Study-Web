import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Stack,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getRandomNum, saveQuestion, shuffleList } from '../Utils/util';
import { INDEX_ANSWER_MAPPING } from '../Constants';
import Timer from './Timer';
import EndPractice from './EndPractice';

export default function FractionDecimalConversion({ questionTypeChange }) {
  const [questionsViewed, setQuestionsViewed] = useState(
    parseInt(localStorage.getItem('numsOfQuestionsViewed')),
  );
  const [numerator, setNumerator] = useState(getRandomNum(1, 100));
  const [denominator, setDenominator] = useState(getRandomNum(1, 100));

  // true answer
  const [result, setResult] = useState(null);

  // list of all answers (true and false answers)
  const [allResults, setAllResults] = useState([]);

  // flag for skipping the question
  const [flag, setFlag] = useState(false);

  // null, index for user's answer
  const [answerIndex, setAnswerIndex] = useState(null);

  // null, true, or false for user's answer
  const [answer, setAnswer] = useState(null);

  // generate a question
  const generateQuestion = () => {
    const newNumerator = getRandomNum(1, 100);
    const newDenominator = getRandomNum(1, 100);
    const newResult = Math.round((newNumerator / newDenominator) * 1000) / 1000;
    setNumerator(newNumerator);
    setDenominator(newDenominator);
    setResult(newResult);

    // reseult variables
    setAllResults([]);
    setFlag(false);
    setAnswerIndex(null);
    setAnswer(null);

    const errors = [0, 0, 0];
    if (newResult / 10 >= 1) {
      errors.forEach((error, index) => {
        errors[index] = getRandomNum(1, 100) + getRandomNum(1, 100) / 100;
      });
    } else if (newResult / 10 < 1 && newResult / 10 >= 0.1) {
      // if  1 <=  < 10
      errors.forEach((error, index) => {
        errors[index] = getRandomNum(1, 10) + getRandomNum(1, 100) / 100;
      });
    } else if (newResult / 10 < 0.1) {
      // if answer < 1
      errors.forEach((error, index) => {
        errors[index] = getRandomNum(1, 100) / 100;
      });
    }

    setAllResults([...shuffleList([newResult, ...errors])]);
  };

  // display the answer card
  const checkAnswer = () => {
    const realIndex = allResults.findIndex((item) => item === result);
    if (answerIndex !== null) {
      setAnswer(realIndex === parseInt(answerIndex));
    }

    const questionDetail = {
      index: parseInt(localStorage.getItem('numsOfQuestionsViewed')),
      question:
        'What is ' + numerator + '/' + denominator + ' in decimal form?',
      answer: answerIndex !== null ? realIndex === parseInt(answerIndex) : null,
      answers: allResults,
      answerIndex: allResults.findIndex((item) => item === result),
    };

    saveQuestion(questionDetail);
    setQuestionsViewed(parseInt(localStorage.getItem('numsOfQuestionsViewed')));
  };

  // ok button for the next question
  const nextQuestion = () => {
    questionTypeChange();
    generateQuestion();
  };

  // skip the question
  const skipQuestion = () => {
    const questionDetail = {
      index: parseInt(localStorage.getItem('numsOfQuestionsViewed')),
      question:
        'What is ' + numerator + '/' + denominator + ' in decimal form?',
      answer: answer,
      answers: allResults,
      answerIndex: allResults.findIndex((item) => item === result),
    };

    saveQuestion(questionDetail);
    setQuestionsViewed(parseInt(localStorage.getItem('numsOfQuestionsViewed')));

    questionTypeChange();
    generateQuestion();
  };

  useEffect(() => {
    setQuestionsViewed(parseInt(localStorage.getItem('numsOfQuestionsViewed')));
    generateQuestion();
  }, []);

  return (
    <>
      {/* question card */}
      {answer === null && (
        <Paper elevation={3} sx={{ padding: '20px', marginTop: '20px' }}>
          <Box
            sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}
          >
            <Box
              sx={{
                width: '100%',
              }}
            >
              Flag Question
              <Checkbox
                checked={flag}
                onChange={(e) => setFlag(e.target.checked)}
              />
            </Box>
            <Box
              sx={{
                justifyContent: 'flex-end',
                display: 'flex',
                width: '100%',
              }}
            >
              <Timer />
            </Box>
          </Box>
          <Box>
            What is {numerator}/{denominator} in decimal form?
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Stack>
              <RadioGroup
                value={answerIndex}
                onChange={(e) => setAnswerIndex(e.target.value)}
              >
                <FormControlLabel
                  value={0}
                  control={<Radio />}
                  label={'A. ' + allResults[0]}
                />
                <FormControlLabel
                  value={1}
                  control={<Radio />}
                  label={'B. ' + allResults[1]}
                />
                <FormControlLabel
                  value={2}
                  control={<Radio />}
                  label={'C. ' + allResults[2]}
                />
                <FormControlLabel
                  value={3}
                  control={<Radio />}
                  label={'D. ' + allResults[3]}
                />
              </RadioGroup>
            </Stack>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
            {!flag && answerIndex !== null && (
              <Button onClick={checkAnswer} variant='outlined'>
                Check Answer
              </Button>
            )}

            {flag && (
              <Button variant='outlined' onClick={skipQuestion}>
                Skip
              </Button>
            )}
          </Box>
        </Paper>
      )}

      {/* answer card */}
      {answer !== null && (
        <Paper
          elevation={3}
          sx={{
            padding: '20px',
            marginTop: '20px',
            justifyContent: 'center',
            display: 'grid',
          }}
        >
          {answer && (
            <Box>
              <img
                src='/icons/check-mark.png'
                alt='checkmark'
                style={{ height: '100px' }}
              />
            </Box>
          )}
          {!answer && (
            <>
              <Box>
                <img
                  src='/icons/error.png'
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
                {
                  INDEX_ANSWER_MAPPING[
                    allResults.findIndex((item) => item === result)
                  ]
                }
              </Box>
            </>
          )}
          <Box>
            <Button variant='outlined' onClick={nextQuestion}>
              Ok
            </Button>
          </Box>
        </Paper>
      )}

      {/* End Practice */}
      <EndPractice questionsViewed={questionsViewed} />
    </>
  );
}
