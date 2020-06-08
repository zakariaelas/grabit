import React from 'react';
import { Form, withFormik } from 'formik';
import MuiFormikTextField from '../../components/MuiFormikTextField';
import * as yup from 'yup';
import { Button, Grid } from '@material-ui/core';

const LoginForm = (props) => {
  return (
    <Form>
      <Grid container spacing={3}>
        <Grid item lg={12}>
          <MuiFormikTextField
            name="email"
            label="Email"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item lg={12}>
          <MuiFormikTextField
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item lg={12}>
          <Button size="small" type="submit" variant="outlined">
            Submit
          </Button>
        </Grid>
      </Grid>
    </Form>
  );
};

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email()
    .nullable()
    .required('You must enter an e-mail'),
  password: yup
    .string()
    .nullable()
    .required('You must enter a password'),
});

const formikOptions = {
  mapPropsToValues: ({ initialValues }) => ({ ...initialValues }),
  displayName: 'LoginForm',
  enableReinitialize: true,
  handleSubmit: (values, { setSubmitting, props }) => {
    values = validationSchema.cast(values);
    props.onSubmit(values);
    setSubmitting(false);
  },
  validationSchema,
};

export default withFormik(formikOptions)(LoginForm);
