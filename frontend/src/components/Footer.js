import React from 'react';
import { Typography, Box, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
}));

const Footer = (props) => {
  const classes = useStyles();
  return (
    <Box display="flex" {...props}>
      <Box mr={1}>
        <Typography variant="body1">© 2020 Grabit</Typography>
      </Box>
      <Box mr={1}>
        <Typography
          className={classes.link}
          component={Link}
          to="/terms"
          variant="body1"
        >
          Terms
        </Typography>
      </Box>
      <Box>
        <Typography
          className={classes.link}
          component={Link}
          to="/privacy-policy"
          variant="body1"
        >
          Privacy Policy
        </Typography>
      </Box>
    </Box>
  );
};

Footer.whyDidYouRender = {
  logOnDifferentValues: true,
  customName: 'Footer',
};

export default React.memo(Footer);
