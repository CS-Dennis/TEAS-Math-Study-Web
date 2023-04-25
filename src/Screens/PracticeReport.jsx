import { Box, Button, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import TitleWithBackground from '../Components/TitleWithBackground';
import { useNavigate } from 'react-router-dom';
import ReportSection from '../Components/ReportSection';

export default function PracticeReport() {
  const navigate = useNavigate();

  const exitToHome = () => {
    navigate('/');
  };

  useEffect(() => {
    const reportStatus = localStorage.getItem('report');
    if (!reportStatus) {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Grid container>
        <Grid item xs={12} md={2} />
        <Grid item xs={12} md={8}>
          <Grid item xs={12} sx={{ display: 'flex', margin: '0 10px' }}>
            <Box
              sx={{
                minWidth: '50px',
                alignSelf: 'center',
              }}
            >
              <Button variant='outlined' onClick={exitToHome}>
                Exit
              </Button>
            </Box>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <TitleWithBackground title={'Report'} />
            </Box>
          </Grid>

          {/* report section */}
          <Grid item xs={12} sx={{ margin: '20px 10px' }}>
            <ReportSection />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
