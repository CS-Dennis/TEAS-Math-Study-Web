import React, { useEffect, useState } from 'react';
import {
  generateSetOfNumbers,
  generateSetOfNumbersToString,
  getRandomNum,
  saveQuestion,
  shuffleList,
} from '../Utils/util';
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

export default function FindModeQuestion({ questionTypeChange }) {
  // group of random numbers in string format
  const [groupOfNumbers, setGroupOfNumbers] = useState([]);

  const [questionsViewed, setQuestionsViewed] = useState(
    parseInt(localStorage.getItem('numsOfQuestionsViewed')),
  );
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

  const checkAnswer = () => {
    const realIndex = allResults.findIndex((item) => item === result);
    if (answerIndex !== null) {
      setAnswer(realIndex === parseInt(answerIndex));
    }

    const questionDetail = {
      index: parseInt(localStorage.getItem('numsOfQuestionsViewed')),
      question:
        'What is the mode of this group of numbers ' +
        groupOfNumbers.join(', '),
      answer: answerIndex !== null ? realIndex === parseInt(answerIndex) : null,
      answers: allResults,
      answerIndex: allResults.findIndex((item) => item === result),
    };

    if (answer !== 1) {
      saveQuestion(questionDetail);
    }
    setQuestionsViewed(parseInt(localStorage.getItem('numsOfQuestionsViewed')));
  };

  const nextQuestion = () => {
    questionTypeChange();
    generateQuestion();
  };

  const skipQuestion = () => {
    const questionDetail = {
      index: parseInt(localStorage.getItem('numsOfQuestionsViewed')),
      question:
        'What is the mode of this group of numbers ' +
        groupOfNumbers.join(', '),
      answer: answer,
      answers: allResults,
      answerIndex: allResults.findIndex((item) => item === result),
    };

    saveQuestion(questionDetail);
    setQuestionsViewed(parseInt(localStorage.getItem('numsOfQuestionsViewed')));

    questionTypeChange();
    generateQuestion();
  };

  const generateQuestion = () => {
    // reseult variables
    setAllResults([]);
    setFlag(false);
    setAnswerIndex(null);
    setAnswer(null);

    // the random size of the group of numbers (6 - 10)
    const tempNumOfNumbers = getRandomNum(6, 10);

    // generate a group of random numbers (integer, decimal, and fraction) based on the random size
    let tempGroupOfNumbers = generateSetOfNumbers(tempNumOfNumbers);

    const tempModeFrequency = getRandomNum(2, tempNumOfNumbers - 1);
    let tempMode = generateSetOfNumbers(1)[0];

    for (let index = 0; index < tempModeFrequency; index++) {
      tempGroupOfNumbers.pop();
    }

    for (let index = 0; index < tempModeFrequency; index++) {
      tempGroupOfNumbers.push(tempMode);
    }

    tempGroupOfNumbers = shuffleList([...tempGroupOfNumbers]);
    setGroupOfNumbers(generateSetOfNumbersToString(tempGroupOfNumbers));

    if (typeof tempMode === 'object') {
      tempMode = tempMode.n + '/' + tempMode.d;
    }
    setResult(tempMode);

    let errors = Array.from(new Set([...tempGroupOfNumbers]));
    for (let index = 0; index < errors.length; index++) {
      if (typeof errors[index] === 'object') {
        errors[index] = errors[index].n + '/' + errors[index].d;
      }
    }

    // remove the tempMode in errors
    const tempModeIndex = errors.findIndex((err) => err === tempMode);
    errors = errors
      .slice(0, tempModeIndex)
      .concat(errors.slice(tempModeIndex + 1, errors.length));

    setAllResults([
      ...shuffleList([tempMode, errors[0], errors[1], errors[2]]),
    ]);
  };

  useEffect(() => {
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
            What is the mode of this group of numbers
            {groupOfNumbers.map((num, index) => {
              if (index !== groupOfNumbers.length - 1) {
                return ' ' + num + ',';
              } else {
                return ' ' + num + ' ';
              }
            })}
            ?
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
