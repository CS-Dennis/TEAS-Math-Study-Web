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
import { getRandomNum, shuffleList } from '../Utils/util';
import { INDEX_ANSWER_MAPPING } from '../Constants';

export default function FractionDecimalConversion() {
  const [numerator, setNumerator] = useState(getRandomNum(1, 100));
  const [denominator, setDenominator] = useState(getRandomNum(1, 100));

  // true answer
  const [result, setResult] = useState(
    Math.round((numerator / denominator) * 1000) / 1000,
  );

  // list of all answers
  const [allResults, setAllResults] = useState([]);

  const [flag, setFlag] = useState(false);

  const [answerIndex, setAnswerIndex] = useState(null);
  const [answer, setAnswer] = useState(null);

  // generate wrong answers
  const generateResults = () => {
    // if answer is more than 10
    const errors = [0, 0, 0];
    if (result / 10 >= 1) {
      errors.forEach((error, index) => {
        errors[index] = getRandomNum(1, 100) + getRandomNum(1, 100) / 100;
      });
    } else if (result / 10 < 1 && result / 10 >= 0.1) {
      // if  1 <=  < 10
      errors.forEach((error, index) => {
        errors[index] = getRandomNum(1, 10) + getRandomNum(1, 100) / 100;
      });
    } else if (result / 10 < 0.1) {
      // if answer < 1
      errors.forEach((error, index) => {
        errors[index] = getRandomNum(1, 100) / 100;
      });
    }

    setAllResults([...shuffleList([result, ...errors])]);
  };

  const checkAnswer = () => {
    if (answerIndex !== null) {
      console.log(allResults);

      const realIndex = allResults.findIndex((item) => item === result);
      console.log(answerIndex);
      console.log(realIndex);
      console.log(realIndex - answerIndex);
      setAnswer(realIndex - answerIndex === 0);
      console.log(answer);
    }
  };

  useEffect(() => {
    generateResults();
  }, []);

  return (
    <>
      {/* question card */}
      {answer === null && (
        <Paper elevation={3} sx={{ padding: '20px', marginTop: '20px' }}>
          <Box sx={{ fontWeight: 'bold' }}>
            Flag Question{' '}
            <Checkbox
              checked={flag}
              onChange={(e) => setFlag(e.target.checked)}
            />
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
                  value='0'
                  control={<Radio />}
                  label={'A. ' + allResults[0]}
                />
                <FormControlLabel
                  value='1'
                  control={<Radio />}
                  label={'B. ' + allResults[1]}
                />
                <FormControlLabel
                  value='2'
                  control={<Radio />}
                  label={'C. ' + allResults[2]}
                />
                <FormControlLabel
                  value='3'
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

            {flag && <Button variant='outlined'>Skip</Button>}
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
            <Button variant='outlined'>Ok</Button>
          </Box>
        </Paper>
      )}
    </>
  );
}
