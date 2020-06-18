import React from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';
import CartEmpty from '../../assets/empty-cart.png';

const useStyles = makeStyles((theme) => ({
  svg: {
    width: '50%',
    height: '50%',
  },
  button: {
    color: 'white',
  },
  title: {
    fontWeight: 600,
    textTransform: 'capitalize',
  },
}));

const NoOrdersYet = (props) => {
  const classes = useStyles();
  return (
    <Box
      p={3}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box mb={4} display="flex" justifyContent="center">
        <img
          src={CartEmpty}
          alt="empty-cart"
          className={classes.svg}
        />
      </Box>
      <Typography
        className={classes.title}
        variant="h4"
        align="center"
      >
        No orders yet
      </Typography>
    </Box>
  );
};

export default NoOrdersYet;
