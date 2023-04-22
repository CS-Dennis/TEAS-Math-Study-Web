import { Box, Button, Grid } from '@mui/material'
import React from 'react'

export default function Home() {
  return (
    <>
      <Grid container>
        <Grid xs={12} md={2} />
        <Grid xs={12} md={8}>
          <Grid xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}><h1>Math Preparation For TEAS</h1></Box>
          </Grid>

          <Grid xs={12} sx={{ marginTop: '100px', display: 'flex', justifyContent: 'center' }} >
            <Button variant='outlined' sx={{ textTransform: 'none' }} >Practice</Button>
          </Grid>

          <Grid xs={12} sx={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }} >
            <Button variant='outlined' sx={{ textTransform: 'none' }} >Exam</Button>
          </Grid>
        </Grid>
        <Grid xs={12} md={2} />
      </Grid>
    </>
  )
}
