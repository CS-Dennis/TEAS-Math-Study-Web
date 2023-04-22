import { Box, Grid, IconButton } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import TitleWithBackground from '../Components/TitleWithBackground';

export default function PracticeQuestions() {
  const temp = localStorage.getItem('type');
  return (
    <>
      <Grid container>
        <Grid item xs={12} md={2} />
        <Grid item xs={12} md={8}>
          <Grid item xs={12} sx={{ display: 'flex' }}>
            <Box sx={{ alignSelf: 'center' }}>
              <Link to={'/'}>
                <IconButton aria-label='delete' size='large'>
                  <KeyboardBackspaceRoundedIcon fontSize='inherit' />
                </IconButton>
              </Link>
            </Box>

            <Box
              sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
            >
              <TitleWithBackground title={'Practice Mode'} />
            </Box>
          </Grid>

          <Grid>{temp}</Grid>
        </Grid>
      </Grid>
    </>
  );
}
