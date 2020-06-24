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
  Divider,
  LinearProgress,
} from '@material-ui/core';
import { Place } from '@material-ui/icons';
import moment from 'moment';
import OrderActions from './OrderActions';
import { Link, useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  chip: {
    textTransform: 'capitalize',
    fontWeight: 600,
  },
  item: {
    textTransform: 'capitalize',
  },
  cardActions: {
    justifyContent: 'space-between',
  },
  cardIcon: {
    display: 'block',
  },
}));

const COLORS = {
  pending: 'default',
  delivered: 'primary',
  picked: 'secondary',
};

const OrderItem = ({ order }) => {
  const classes = useStyles();
  const location = useLocation();
  return (
    <Card variant="outlined">
      {order.isLoading && <LinearProgress color="secondary" />}
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
            className={classes.chip}
            label={order.status}
            variant="outlined"
            color={COLORS[order.status]}
          />
        </Box>
        <Typography variant="h6" component="h2" gutterBottom>
          {order.from.address.split(',')[0]}
        </Typography>
        <Box mb={1} display="flex" alignItems="center">
          <Box mr={0.5}>
            <Place className={classes.cardIcon} fontSize="small" />
          </Box>
          <Typography variant="body2">
            {order.destination.address}
          </Typography>
        </Box>
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
        <Box mt={2}>
          <Divider variant="inset" />
        </Box>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          component={Link}
          to={{
            pathname: `/orders/${order.id}`,
            state: { background: location },
          }}
          size="small"
        >
          Learn More
        </Button>
        <OrderActions orderId={order.id} status={order.status} />
      </CardActions>
    </Card>
  );
};

OrderItem.propTypes = {
  order: PropTypes.object.isRequired,
};

export default OrderItem;
