import React from 'react';
import { Form, withFormik } from 'formik';
import MuiFormikTextField from '../../components/MuiFormikTextField';
import * as yup from 'yup';
import { Box } from '@material-ui/core';
import CircularProgressButton from '../../components/CircularProgressButton';

const LoginForm = ({ isLoading }) => {
  return (
    <Form>
      <div>
        <MuiFormikTextField
          name="email"
          label="Email"
          variant="filled"
          margin="dense"
        />
      </div>
      <div>
        <MuiFormikTextField
          name="password"
          label="Password"
          type="password"
          variant="filled"
          margin="dense"
        />
      </div>
      <Box mt={2}>
        <CircularProgressButton
          style={{
            textTransform: 'initial',
            fontWeight: 600,
          }}
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          isLoading={isLoading}
        >
          Continue
        </CircularProgressButton>
      </Box>
    </Form>
  );
};

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email('You must enter a valid email')
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
