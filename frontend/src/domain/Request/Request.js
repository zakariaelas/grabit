import React from 'react';
import { Paper, Box, Typography } from '@material-ui/core';
import RequestForm from './RequestForm';
import moment from 'moment';
import { dialog, Confirm } from '../../components/ImperativeDialog';
import GoogleMapsDistanceMatrix from '../../components/GoogleMapsDistanceMatrix';
import { createOrder } from './RequestActions';
import { useHistory } from 'react-router-dom';

const Request = (props) => {
  const history = useHistory();
  return (
    <Paper elevation={0}>
      <Box p={5}>
        <Typography variant="h6" paragraph>
          Request
        </Typography>
        <Typography variant="body1" paragraph>
          Fill out this form and our couriers will do their best to
          deliver your order in an hour.
        </Typography>
        <RequestForm
          initialValues={{
            from: '',
            destination: '',
            description: '',
            minBudget: 0,
            maxBudget: 0,
            date: moment().format('YYYY-MM-DD'),
            schedule: 'ASAP',
            items: [],
            currentItem: '',
          }}
          onSubmit={async (values) => {
            const req = {
              ...values,
              estimatedDuration: null,
              estimatedDistance: null,
              estimatedPrice: 0,
            };
            const ok = await dialog(
              <Confirm title="Order Estimations">
                <Typography variant="body1">
                  The information shown below is only an{' '}
                  <strong>estimation</strong> of the order.
                </Typography>
                <GoogleMapsDistanceMatrix
                  options={{
                    origins: [values.from.address],
                    destinations: [values.destination.address],
                    travelMode: 'DRIVING',
                  }}
                  onSuccess={(response, distance, duration) => {
                    req.estimatedDistance = distance.value;
                    req.estimatedDuration = duration.value;
                    console.log(response, distance, duration);
                  }}
                />
              </Confirm>,
            );
            if (ok) await createOrder(req, history);
          }}
        />
      </Box>
    </Paper>
  );
};

export default Request;
