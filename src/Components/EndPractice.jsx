import { Box, Button, Grid } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function EndPractice({ questionsViewed }) {
  const navigate = useNavigate();
  const endPractice = () => {
    localStorage.setItem('report', true);
    navigate('/practice/report');
  };
  console.log(questionsViewed);
  return (
    <>
      {questionsViewed > 0 && (
        <Grid item xs={12}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '50px',
            }}
          >
            <Button variant='outlined' onClick={endPractice}>
              End Practice
            </Button>
          </Box>
        </Grid>
      )}
    </>
  );
}
