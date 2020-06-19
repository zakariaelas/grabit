import React from 'react';
import { Container, Box } from '@material-ui/core';
import { Switch } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const AppContainer = ({ children }) => {
  return (
    <>
      <Navbar>
        <Switch>{children}</Switch>
        <Footer mb={4} mt={4} />
      </Navbar>
    </>
  );
};

AppContainer.whyDidYouRender = true;

export default AppContainer;
