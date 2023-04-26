import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';

export default function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [start, setStart] = useState(false);

  const counter = () => {
    setSeconds((prevState) => {
      if (prevState === 59) {
        return 0;
      } else {
        return prevState + 1;
      }
    });
  };

  useEffect(() => {
    const timer = setInterval(() => counter(), 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (seconds === 0 && start) {
      setMinutes(minutes + 1);
    }
    if (!start) {
      setStart(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds]);

  return (
    <>
      <Box>
        {minutes} m : {seconds} s
      </Box>
    </>
  );
}
