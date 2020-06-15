import React from 'react';
import { Container, Box } from '@material-ui/core';
import { Switch } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const AppContainer = ({ children }) => {
  return (
    <>
      <Navbar />
      <Box mt={8}>
        <Container maxWidth="md">
          <Switch>{children}</Switch>
          <Footer position="absolute" mb={4} mt={4} />
        </Container>
      </Box>
    </>
  );
};

AppContainer.whyDidYouRender = true;

export default AppContainer;
