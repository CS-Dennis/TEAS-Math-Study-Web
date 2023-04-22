import { Box, Grid, IconButton } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import TitleWithBackground from '../Components/TitleWithBackground'
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';

export default function Exam() {
  return (
    <>
      <Grid container>
        <Grid item xs={12} md={2} />
        <Grid item xs={12} md={8} sx={{ display: 'flex', }} >
          <Box sx={{ alignSelf: 'center' }}>
            <Link to={'/'}>
              <IconButton aria-label="delete" size="large">
                <KeyboardBackspaceRoundedIcon fontSize="inherit" />
              </IconButton>
            </Link>
          </Box>

          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <TitleWithBackground title={'Exam Mode'} />
          </Box>
        </Grid>
        <Grid item xs={12} md={2} />
      </Grid>
    </>
  )
}
