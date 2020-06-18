import React from 'react';
import { Form, withFormik } from 'formik';
import MuiFormikTextField from '../../components/MuiFormikTextField';
import * as yup from 'yup';
import {
  Button,
  Box,
  Grid,
  Avatar,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: 80,
    height: 80,
  },
}));

const ProfileForm = ({ values, setFieldValue }) => {
  const classes = useStyles();
  return (
    <Form>
      <Grid container alignItems="center">
        <Grid
          container
          item
          lg={5}
          md={12}
          alignItems="center"
          direction="column"
        >
          <Avatar className={classes.avatar} src={values.imageUrl} />
          <Box mt={2} mb={2} display="flex">
            <Box mr={2}>
              <Button variant="outlined" color="primary">
                Upload
              </Button>
            </Box>
            <Button
              onClick={() => setFieldValue('imageUrl', '')}
              variant="outlined"
              color="secondary"
            >
              Remove
            </Button>
          </Box>
        </Grid>
        <Grid item lg={7} md={12}>
          <div>
            <MuiFormikTextField
              name="displayName"
              label="Full Name"
              variant="outlined"
              margin="normal"
              fullWidth
            />
          </div>
          <div>
            <MuiFormikTextField
              name="email"
              label="Email"
              variant="outlined"
              margin="normal"
              fullWidth
            />
          </div>
          <div>
            <MuiFormikTextField
              name="phoneNumber"
              label="Phone Number"
              type="text"
              variant="outlined"
              margin="normal"
              fullWidth
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
              Update
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Form>
  );
};

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
  phoneNumber: yup
    .string()
    .trim()
    .matches(/^(\+?212|0)[67]\d{8}$/, 'Invalid phone number'),
  imageUrl: yup.string().trim(),
});

const formikOptions = {
  mapPropsToValues: ({ initialValues }) => ({ ...initialValues }),
  displayName: 'ProfileForm',
  enableReinitialize: true,
  handleSubmit: (values, { setSubmitting, props }) => {
    values = validationSchema.cast(values);
    props.onSubmit(values);
    setSubmitting(false);
  },
  validationSchema,
};

export default withFormik(formikOptions)(ProfileForm);
