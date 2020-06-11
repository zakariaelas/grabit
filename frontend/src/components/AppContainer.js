import React from 'react';
import { Container, Box } from '@material-ui/core';
import { Switch } from 'react-router-dom';
import Navbar from './Navbar';

const AppContainer = ({ children }) => {
  return (
    <>
      <Navbar />
      <Box mt={8}>
        <Container maxWidth="md">
          <Switch>{children}</Switch>
        </Container>
      </Box>
    </>
  );
};

export default AppContainer;
