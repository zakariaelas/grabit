import React from 'react';
import { ReactComponent as NotFoundSvg } from '../assets/404.svg';
import { Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  svg: {
    width: '100%',
    height: '100%',
  },
}));

const NotFound = (props) => {
  const classes = useStyles();
  return (
    <Box p={4}>
      <NotFoundSvg className={classes.svg} />
    </Box>
  );
};

export default NotFound;
