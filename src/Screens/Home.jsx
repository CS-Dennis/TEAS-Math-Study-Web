import { Box, Button, Grid } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>
      <Grid container>
        <Grid item xs={12} md={2} />
        <Grid item xs={12} md={8}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}><h1>Math Preparation For TEAS</h1></Box>
          </Grid>

          <Grid item xs={12} sx={{ marginTop: '100px', display: 'flex', justifyContent: 'center' }} >
            <Link to={'/practice'}><Button variant='outlined' sx={{ textTransform: 'none' }} >Practice</Button></Link>
          </Grid>

          <Grid item xs={12} sx={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }} >
            <Link to={'/exam'}>
              <Button variant='outlined' sx={{ textTransform: 'none' }} >Exam</Button>
            </Link>
          </Grid>
        </Grid>
        <Grid item xs={12} md={2} />
      </Grid>
    </>
  )
}
