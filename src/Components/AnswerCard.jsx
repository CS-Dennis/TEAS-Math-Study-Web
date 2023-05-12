import { Box, Button, IconButton, Paper } from '@mui/material';
import React from 'react';
import { INDEX_ANSWER_MAPPING } from '../Constants';
import PublishedWithChangesRoundedIcon from '@mui/icons-material/PublishedWithChangesRounded';

export default function AnswerCard({
  answer,
  setAnswer,
  allResults,
  result,
  nextQuestion,
}) {
  return (
    <>
      {answer !== null && answer !== 1 && (
        <Paper
          elevation={3}
          sx={{
            position: 'relative',
            padding: '20px',
            marginTop: '20px',
            justifyContent: 'center',
            display: 'grid',
          }}
        >
          {answer && (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <img
                src='./icons/check-mark.png'
                alt='checkmark'
                style={{ height: '100px' }}
              />
            </Box>
          )}
          {!answer && (
            <>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
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
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Button variant='outlined' sx={{}} onClick={nextQuestion}>
              Ok
            </Button>
          </Box>
          <Box sx={{ position: 'absolute', right: 10, bottom: 20 }}>
            <IconButton aria-label='flip' onClick={() => setAnswer(1)}>
              <PublishedWithChangesRoundedIcon />
            </IconButton>
          </Box>
        </Paper>
      )}
    </>
  );
}
