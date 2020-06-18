import React from 'react';
import { ReactComponent as NotFoundSvg } from '../assets/404.svg';
import {
  Box,
  makeStyles,
  Button,
  Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  svg: {
    width: '50%',
    height: '50%',
  },
  button: {
    borderRadius: '200px',
    color: 'white',
    textTransform: 'initial',
    backgroundColor: '#3a384d',
    '&:hover': {
      backgroundColor: '#222a30',
    },
  },
  title: {
    textTransform: 'uppercase',
    fontWeight: 600,
  },
}));

const NotFound = (props) => {
  const classes = useStyles();
  return (
    <Box
      p={4}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Box mb={3} textAlign="center">
        <NotFoundSvg className={classes.svg} />
      </Box>
      <Typography
        className={classes.title}
        align="center"
        variant="h3"
      >
        404 - Page not found
      </Typography>
      <Box mt={3}>
        <Button
          component={Link}
          to="/"
          variant="contained"
          color="secondary"
          className={classes.button}
        >
          Go to homepage
        </Button>
      </Box>
    </Box>
  );
};

export default NotFound;
