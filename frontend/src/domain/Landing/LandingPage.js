import React from 'react';
import {
  Box,
  makeStyles,
  Typography,
  Container,
} from '@material-ui/core';
import BgImage from '../../assets/bg.png';
import Nav from './Nav';
import RegistrationPanel from './RegistrationPanel';
import LandingBody from './LandingBody';
import Footer from '../../components/Footer';

const useStyles = makeStyles((theme) => ({
  header: {
    height: '100vh',
    backgroundImage: `url(${BgImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'top',
  },
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  titleHeader: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontWeight: 500,
    textTransform: 'lowercase',
  },
  boldItalic: {
    fontWeight: 600,
    fontStyle: 'italic',
  },
  marginMan: {
    marginRight: '50px',
  },
  bodyBox: {},
  descriptionTitle: {
    fontWeight: 600,
  },
  descriptionText: {
    fontWeight: 500,
    lineHeight: 1.8,
  },
}));

const LandingPage = () => {
  const classes = useStyles();

  return (
    <>
      <header className={classes.header}>
        <Box pt={6} height="100%">
          <Container className={classes.container} maxWidth="lg">
            <Nav />
            <div className={classes.titleHeader}>
              <Typography
                className={classes.title}
                variant="h2"
                align="center"
              >
                We <span className={classes.boldItalic}>deliver</span>{' '}
                it to your{' '}
                <span className={classes.boldItalic}>door</span>{' '}
                within{' '}
                <span className={classes.boldItalic}>one hour</span>
              </Typography>
              <RegistrationPanel />
            </div>
          </Container>
        </Box>
      </header>
      <Box className={classes.bodyBox} pt={12} mx="auto">
        <LandingBody />
      </Box>
      <Box mt={8} mb={4}>
        <Container maxWidth="md">
          <Footer px={4} />
        </Container>
      </Box>
    </>
  );
};

export default LandingPage;
