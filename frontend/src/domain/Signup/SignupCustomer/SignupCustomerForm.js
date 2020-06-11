import React from 'react';
import { Form, withFormik } from 'formik';
import MuiFormikTextField from '../../../components/MuiFormikTextField';
import * as yup from 'yup';
import { Button, Box } from '@material-ui/core';

const SignupCustomerForm = (props) => {
  return (
    <Form>
      <div>
        <MuiFormikTextField
          name="displayName"
          label="Full Name"
          variant="filled"
          margin="dense"
        />
      </div>
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
      <div>
        <MuiFormikTextField
          name="confirmationpassword"
          label="Confirm Password"
          type="password"
          variant="filled"
          margin="dense"
        />
      </div>
      <Box mt={2}>
        <Button
          style={{
            textTransform: 'initial',
            fontWeight: 600,
          }}
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
        >
          Continue
        </Button>
      </Box>
    </Form>
  );
};

yup.addMethod(yup.string, 'isSameAs', function (ref, end) {
  return this.test({
    name: 'isSameAs',
    message: 'Passwords do not match',
    exclusive: false,
    test: function (v) {
      return v === this.resolve(ref);
    },
  });
});

const validationSchema = yup.object().shape({
  displayName: yup
    .string()
    .trim()
    .nullable()
    .required('You must enter a fullname'),
  email: yup
    .string()
    .trim()
    .email('You must enter a valid email')
    .nullable()
    .required('You must enter an email'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .nullable()
    .required('You must enter a password'),
  confirmationpassword: yup
    .string()
    .nullable()
    .required('Passwords do not match')
    .isSameAs(yup.ref('password')),
});

const formikOptions = {
  mapPropsToValues: ({ initialValues }) => ({ ...initialValues }),
  displayName: 'SignupCustomerForm',
  enableReinitialize: true,
  handleSubmit: (values, { setSubmitting, props }) => {
    values = validationSchema.cast(values);
    props.onSubmit(values);
    setSubmitting(false);
  },
  validationSchema,
};

export default withFormik(formikOptions)(SignupCustomerForm);
