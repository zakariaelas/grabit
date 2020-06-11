import React from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Hidden,
  makeStyles,
} from '@material-ui/core';
import { ReactComponent as StandingMan } from '../../assets/standing.svg';
import { ReactComponent as House } from '../../assets/house.svg';
import Driver from '../../assets/driver.png';
import Deliver from '../../assets/deliver.png';

const useStyles = makeStyles((theme) => ({
  marginMan: {
    marginRight: '20px',
  },
  bodyBox: {},
  descriptionTitle: {
    fontWeight: 600,
  },
  container: {
    width: '980px',
    margin: '0 auto',
  },
  descriptionText: {
    fontWeight: 500,
    lineHeight: 1.8,
  },
  buttonsBox: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

const LandingBody = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="md">
      <Box mb={10}>
        <Typography
          align="center"
          className={classes.descriptionTitle}
          variant="h3"
        >
          How it Works
        </Typography>
      </Box>
      <Box px={4}>
        <Grid container spacing={5} alignItems="center">
          <Grid item lg={6} sm={12}>
            <Typography
              className={classes.descriptionTitle}
              variant="h4"
              paragraph
            >
              We do more than delivery
            </Typography>
            <Typography
              className={classes.descriptionText}
              variant="body1"
            >
              Schedule an order or receive one asap, you only make
              payments once your goods arrive at your door step.
            </Typography>
          </Grid>
          <Hidden smDown>
            <Grid item container justify="flex-end" lg={6} sm={12}>
              <StandingMan className={classes.marginMan} />
              <House />
            </Grid>
          </Hidden>
        </Grid>
      </Box>
      <Box mt={12} px={4}>
        <Grid container spacing={5}>
          <Hidden smDown>
            <Grid container justify="center" item lg={5}>
              <img src={Driver} alt="driver" />
            </Grid>
          </Hidden>
          <Grid item lg={7} sm={12}>
            <Typography
              className={classes.descriptionTitle}
              variant="h4"
              paragraph
            >
              Fast delivery with tracking
            </Typography>
            <Typography
              className={classes.descriptionText}
              variant="body1"
            >
              No more guessing when your courier is arriving ! We
              offer you real time tracking of our couriers so you
              never leave your eyes off your goods
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box mt={12} px={4}>
        <Grid container spacing={5}>
          <Grid item lg={6} sm={12}>
            <Typography
              className={classes.descriptionTitle}
              variant="h4"
              paragraph
            >
              Stay at home we do it for you
            </Typography>
            <Typography
              className={classes.descriptionText}
              variant="body1"
            >
              A couple of clicks is all what separates you from
              getting your needs delivered to your front door by our
              reliable couriers
            </Typography>
          </Grid>
          <Hidden smDown>
            <Grid item lg={6} sm={12}>
              <img src={Deliver} alt="deliver" />
            </Grid>
          </Hidden>
        </Grid>
      </Box>
    </Container>
  );
};

export default LandingBody;
