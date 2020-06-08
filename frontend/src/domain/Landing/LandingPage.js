import React from 'react';
import Login from '../Login/Login';
import { Box } from '@material-ui/core';

const LandingPage = (props) => {
  return (
    <Box>
      <h1>Welcome !</h1>
      <Login />
    </Box>
  );
};

export default LandingPage;
