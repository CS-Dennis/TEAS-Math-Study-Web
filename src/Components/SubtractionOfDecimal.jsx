import React, { useEffect, useState } from 'react';
import { getRandomNum, saveQuestion, shuffleList } from '../Utils/util';
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
import Timer from './Timer';
import EndPractice from './EndPractice';
import AnswerCard from './AnswerCard';

export default function SubtractionOfDecimal({ questionTypeChange }) {
  const [questionsViewed, setQuestionsViewed] = useState(
    parseInt(localStorage.getItem('numsOfQuestionsViewed')),
  );
  const [decimal1, setDecimal1] = useState(null);
  const [decimal2, setDecimal2] = useState(null);

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
    const decimal1 = getRandomNum(1, 100) / Math.pow(10, getRandomNum(0, 3));
    const decimal2 = getRandomNum(1, 100) / Math.pow(10, getRandomNum(0, 3));

    const newResult = Math.round((decimal1 - decimal2) * 1000) / 1000;

    setDecimal1(decimal1);
    setDecimal2(decimal2);
    setResult(newResult);

    // reseult variables
    setAllResults([]);
    setFlag(false);
    setAnswerIndex(null);
    setAnswer(null);

    let errors = [0, 0, 0];
    const negOrPos = newResult >= 0 ? 1 : -1;
    errors[0] =
      (getRandomNum(1, 100) / Math.pow(10, getRandomNum(0, 3))) * negOrPos;
    errors[1] =
      (getRandomNum(1, 100) / Math.pow(10, getRandomNum(0, 3))) * negOrPos;
    errors[2] =
      (getRandomNum(1, 100) / Math.pow(10, getRandomNum(0, 3))) * negOrPos;

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
      question: 'What is ' + decimal1 + ' - ' + decimal2 + '?',
      answer: answerIndex !== null ? realIndex === parseInt(answerIndex) : null,
      answers: allResults,
      answerIndex: allResults.findIndex((item) => item === result),
    };

    if (answer !== 1) {
      saveQuestion(questionDetail);
    }
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
      question: 'What is ' + decimal1 + ' - ' + decimal2 + '?',
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
      {(answer === null || answer === 1) && (
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
            What is {decimal1} - {decimal2}?
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
                  disabled={answer === 1 ? true : false}
                  value={0}
                  control={<Radio />}
                  label={'A. ' + allResults[0]}
                />
                <FormControlLabel
                  disabled={answer === 1 ? true : false}
                  value={1}
                  control={<Radio />}
                  label={'B. ' + allResults[1]}
                />
                <FormControlLabel
                  disabled={answer === 1 ? true : false}
                  value={2}
                  control={<Radio />}
                  label={'C. ' + allResults[2]}
                />
                <FormControlLabel
                  disabled={answer === 1 ? true : false}
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
      <AnswerCard
        answer={answer}
        setAnswer={setAnswer}
        allResults={allResults}
        result={result}
        nextQuestion={nextQuestion}
      />

      {/* End Practice */}
      <EndPractice questionsViewed={questionsViewed} />
    </>
  );
}
