import React from 'react';
import { Paper, Box, Typography } from '@material-ui/core';
import RequestForm from './RequestForm';
import moment from 'moment';

const Request = (props) => {
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
            schedule: '',
            items: [],
            currentItem: '',
          }}
          onSubmit={(values) => {
            console.log(values);
          }}
        />
      </Box>
    </Paper>
  );
};

export default Request;
