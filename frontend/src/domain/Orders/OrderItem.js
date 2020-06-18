import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  CardActions,
  Button,
  makeStyles,
} from '@material-ui/core';
import { Place } from '@material-ui/icons';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  chip: {
    textTransform: 'capitalize',
    fontWeight: 600,
  },
  chip_pending: {
    color: theme.palette.secondary.main,
  },
  chip_delivered: {
    color: '#4caf50',
  },
  chip_picked: {
    color: '#ff9800',
  },
  item: {
    '&:after': {
      content: ' ‒ ',
    },
    '&:last-of-type:after': {
      content: '',
    },
  },
}));

const OrderItem = ({ order }) => {
  const classes = useStyles();
  return (
    <Card variant="outlined">
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {moment(order.date).format('DD MMMM, YYYY')}
          </Typography>
          <Chip
            className={`${classes.chip} ${
              classes[`chip_${order.status}`]
            }`}
            label={order.status}
            variant="outlined"
            color="secondary"
          />
        </Box>
        <Typography variant="h5" component="h2" gutterBottom>
          {order.from.address}
        </Typography>
        <Typography
          className={classes.item}
          color="textSecondary"
          gutterBottom
        >
          {order.items.map((item, index) =>
            index < order.items.length - 1
              ? `${item.text} ‒ `
              : item.text,
          )}
        </Typography>

        <Box display="flex" alignItems="center">
          <Place fontSize="small" />
          <Typography>{order.destination.address}</Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

OrderItem.propTypes = {
  order: PropTypes.object.isRequired,
};

export default OrderItem;
