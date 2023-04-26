import { Box } from '@mui/material'
import React from 'react'

export default function TitleWithBackground({ title }) {
  return (
    <>
      <Box className='modeTitle' >
        {title}
      </Box>
    </>
  )
}
