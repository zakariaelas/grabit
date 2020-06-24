import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  makeStyles,
  Hidden,
} from '@material-ui/core';
import { Switch, useLocation } from 'react-router-dom';
import Footer from '../../components/Footer';
import { trackPosition } from '../../realtime/location';
import {
  userRoleSelector,
  userIdSelector,
} from '../../app/authReducer';
import { ROLES } from '../../constants';
import { useSelector } from 'react-redux';
import ResponsiveNavigationRail from '../NavigationRail/ReponsiveNavigationRail';
import PrivateRoute from '../../components/PrivateRoute';
import OrderDialog from '../OrderDialog/OrderDialog';
import GrabitAppBar from '../GrabitAppBar/GrabitAppBar';

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: 64,
  },
}));

const AppContainer = ({ children }) => {
  const classes = useStyles();

  const location = useLocation();
  const background = location.state && location.state.background;

  const role = useSelector(userRoleSelector);
  const userId = useSelector(userIdSelector);

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const handleClick = () => {
    setMobileDrawerOpen(true);
  };

  const handleClose = () => {
    setMobileDrawerOpen(false);
  };

  useEffect(() => {
    console.log(userId);
    if (role === ROLES.DRIVER) return trackPosition(userId);
  }, [role]);

  const content = (
    <>
      <Switch location={background || location}>{children}</Switch>{' '}
      <PrivateRoute
        exact
        path="/orders/:oid"
        component={OrderDialog}
      />
    </>
  );

  return (
    <>
      <GrabitAppBar handleClick={handleClick} />
      <Box display="flex">
        <ResponsiveNavigationRail
          open={mobileDrawerOpen}
          handleClose={handleClose}
        />
        <main className={classes.content}>
          <Hidden smDown>
            <Box>
              <Container maxWidth="lg">
                {content}
                <Footer mt={2} />
              </Container>
            </Box>
          </Hidden>
          <Hidden smUp>{content}</Hidden>
        </main>
      </Box>
    </>
  );
};

AppContainer.whyDidYouRender = true;

export default AppContainer;
