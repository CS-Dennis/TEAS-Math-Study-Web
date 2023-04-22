import { Box, Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Select } from '@mui/material'
import React, { useState } from 'react'
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import '../App.css';
import TitleWithBackground from '../Components/TitleWithBackground';
import { Link, useNavigate } from 'react-router-dom';
import { QUESTION_TYPE_MAPPING } from '../Constants';

export default function Practice() {
  const [questionType, setQuestionType] = useState('');
  const navigate = useNavigate();

  const startQuestions = () => {
    localStorage.setItem("mode", "practice");
    localStorage.setItem("type", questionType);

    navigate('./questions');
  }

  return (
    <>
      <Grid container>
        <Grid item xs={12} md={2} />
        <Grid item xs={12} md={8} >
          <Grid item xs={12} sx={{ display: 'flex' }}>
            <Box sx={{ alignSelf: 'center' }}>
              <Link to={'/'}>
                <IconButton aria-label="delete" size="large">
                  <KeyboardBackspaceRoundedIcon fontSize="inherit" />
                </IconButton>
              </Link>
            </Box>

            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <TitleWithBackground title={'Practice Mode'} />
            </Box>
          </Grid>

          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <FormControl sx={{ minWidth: 450, marginTop: '50px' }}>
              <InputLabel id="demo-simple-select-label">Pick a question type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={questionType}
                label="Pick a question type"
                onChange={(e) => setQuestionType(e.target.value)}
              >
                <MenuItem value={1}>{QUESTION_TYPE_MAPPING['1']}</MenuItem>
                <MenuItem value={2}>{QUESTION_TYPE_MAPPING['2']}</MenuItem>
                <MenuItem value={3}>{QUESTION_TYPE_MAPPING['3']}</MenuItem>
                <MenuItem value={4}>{QUESTION_TYPE_MAPPING['4']}</MenuItem>
                <MenuItem value={5}>{QUESTION_TYPE_MAPPING['5']}</MenuItem>
                <MenuItem value={6}>{QUESTION_TYPE_MAPPING['6']}</MenuItem>
                <MenuItem value={7}>{QUESTION_TYPE_MAPPING['7']}</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {Number(questionType) > 0 &&
            <Grid item xs={12}>
              <Box sx={{ marginTop: '50px', display: 'flex', justifyContent: 'center' }}><Button variant='outlined' onClick={startQuestions}>Start</Button></Box>
            </Grid>
          }
        </Grid>
        <Grid item xs={12} md={2} />
      </Grid>
    </>
  )
}
