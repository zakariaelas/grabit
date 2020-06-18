import React from 'react';
import { Container, Box } from '@material-ui/core';
import { Switch } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const AppContainer = ({ children }) => {
  return (
    <>
      <Navbar>
        <Box mt={8}>
          <Container maxWidth="lg">
            <Switch>{children}</Switch>
            <Footer mb={4} mt={4} />
          </Container>
        </Box>
      </Navbar>
    </>
  );
};

AppContainer.whyDidYouRender = true;

export default AppContainer;
