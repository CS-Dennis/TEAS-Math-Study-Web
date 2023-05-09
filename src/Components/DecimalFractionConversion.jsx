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
import Timer from './Timer';
import {
  gcdFromTwoNumbers,
  getRandomNum,
  saveQuestion,
  shuffleList,
} from '../Utils/util';
import { INDEX_ANSWER_MAPPING } from '../Constants';
import EndPractice from './EndPractice';

export default function DecimalFractionConversion({ questionTypeChange }) {
  const [questionsViewed, setQuestionsViewed] = useState(
    parseInt(localStorage.getItem('numsOfQuestionsViewed')),
  );

  // random deciaml in the question
  const [decimal, setDecimal] = useState(null);

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

  const generateQuestion = () => {
    // reseult variables
    setAllResults([]);
    setFlag(false);
    setAnswerIndex(null);
    setAnswer(null);

    // genreate a random decimal
    const decimalPlace = getRandomNum(1, 3);
    let randomDecimal = 0;
    let flag = true;
    while (flag) {
      const numeratorRandom = getRandomNum(1, 100);
      const denominatorRandom = getRandomNum(numeratorRandom, 100);
      randomDecimal =
        Math.round(
          (numeratorRandom / denominatorRandom) * Math.pow(10, decimalPlace),
        ) / Math.pow(10, decimalPlace);

      if (randomDecimal > 0 && randomDecimal < 1) {
        flag = false;
      }
    }
    // set the randomDecimal in the question
    setDecimal(randomDecimal);

    const gcd = gcdFromTwoNumbers(randomDecimal * 1000, 1000);
    const numerator = (randomDecimal * 1000) / gcd;
    const denominator = 1000 / gcd;
    // set the true answer
    const trueAnswer = numerator + '/' + denominator;
    setResult(trueAnswer);

    // set the 1st wrong answer
    let decimalPlaceDiff = decimalPlace;
    while (decimalPlaceDiff === decimalPlace) {
      decimalPlaceDiff = getRandomNum(1, 3);
    }
    const wrongAnswer1 =
      Math.round(randomDecimal * Math.pow(10, decimalPlace)) +
      '/' +
      Math.pow(10, decimalPlaceDiff);

    // set the 2nd wrong answer
    let numeratorTemp = getRandomNum(1, 100);
    let denominatorTemp = getRandomNum(numeratorTemp, 100);
    const wrongAnswer2 = numeratorTemp + '/' + denominatorTemp;

    // set the 3rd wrong answer
    numeratorTemp = getRandomNum(1, 100);
    denominatorTemp = getRandomNum(numeratorTemp, 100);
    const wrongAnswer3 = numeratorTemp + '/' + denominatorTemp;

    setAllResults([
      ...shuffleList([trueAnswer, wrongAnswer1, wrongAnswer2, wrongAnswer3]),
    ]);
  };

  // display the answer card
  const checkAnswer = () => {
    const realIndex = allResults.findIndex((item) => item === result);
    if (answerIndex !== null) {
      setAnswer(realIndex === parseInt(answerIndex));
    }

    const questionDetail = {
      index: parseInt(localStorage.getItem('numsOfQuestionsViewed')),
      question: 'What is ' + decimal + ' in fraction form?',
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
      question: 'What is ' + decimal + ' in fraction form?',
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <Box>What is {decimal} in fraction form?</Box>

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
                src='./icons/check-mark.png'
                alt='checkmark'
                style={{ height: '100px' }}
              />
            </Box>
          )}
          {!answer && (
            <>
              <Box>
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
