import React, { useEffect } from 'react';
import { withFormik, FieldArray, Form } from 'formik';
import {
  Grid,
  Box,
  makeStyles,
  FormLabel,
  Typography,
} from '@material-ui/core';
import MuiFormikTextField from '../../components/MuiFormikTextField';
import CircularProgressButton from '../../components/CircularProgressButton';
import validationSchema from './requestValidationSchema';
import GoogleMapReact from 'google-map-react';
import useGeolocation from '../../components/useGeolocation';
import GoogleAddressAutocomplete from '../../components/GoogleAddressAutocomplete';
import ItemsFormik from './ItemsFormik';

const useStyles = makeStyles((theme) => ({
  fullWidth: {
    width: '100%',
  },
}));

const directionsService = { current: null };
const directionsRenderer = { current: null };

let RequestForm = ({ values }) => {
  const { latitude, longitude } = useGeolocation({
    enableHighAccuracy: true,
  });

  const classes = useStyles();

  useEffect(() => {
    if (
      values.from &&
      values.destination &&
      values.from.address &&
      values.destination.address
    ) {
      directionsService.current.route(
        {
          origin: values.from.address,
          destination: values.destination.address,
          travelMode: 'DRIVING',
        },
        function (response, status) {
          if (status === 'OK') {
            directionsRenderer.current.setDirections(response);
          } else {
            window.alert(
              'Directions request failed due to ' + status,
            );
          }
        },
      );
    }
  }, [values.from, values.destination]);

  return (
    <Form>
      <Grid container spacing={4} alignItems="baseline">
        <Grid container spacing={3} item lg={6} md={12}>
          <Grid item lg={12} className={classes.fullWidth}>
            <GoogleAddressAutocomplete
              variant="outlined"
              fullWidth
              name="from"
              label="Pickup"
              placeholder="Pickup address"
            />
          </Grid>
          <Grid item lg={12} className={classes.fullWidth}>
            <GoogleAddressAutocomplete
              variant="outlined"
              fullWidth
              name="destination"
              label="Destination"
              placeholder="Destination address"
            />
          </Grid>
          <Grid item lg={12} className={classes.fullWidth}>
            <Box height={500} width={'100%'}>
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: process.env.REACT_APP_MAPS_KEY,
                  libraries: 'places',
                }}
                center={{
                  lat: 33.589886 || latitude,
                  lng: -7.603869 || longitude,
                }}
                yesIWantToUseGoogleMapApiInternals
                defaultZoom={14}
                onGoogleApiLoaded={({ map, maps }) => {
                  directionsService.current = new window.google.maps.DirectionsService();
                  directionsRenderer.current = new window.google.maps.DirectionsRenderer();
                  directionsRenderer.current.setMap(map);
                  map.setOptions({
                    styles: [
                      {
                        featureType: 'poi.business',
                        elementType: 'labels',
                        stylers: [{ visibility: 'on' }],
                      },
                    ],
                  });
                }}
              />
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={4} item lg={6} sm={12}>
          <Grid item lg={12}>
            <FieldArray name="items" component={ItemsFormik} />
          </Grid>

          <Grid item lg={6} md={12}>
            <MuiFormikTextField
              fullWidth
              name="date"
              variant="outlined"
              label="Date"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item lg={6} md={12}>
            <MuiFormikTextField
              fullWidth
              name="schedule"
              variant="outlined"
              label="Schedule"
              placeholder="ASAP"
            />
          </Grid>
          <Grid item lg={6} md={12}>
            <MuiFormikTextField
              fullWidth
              name="minBudget"
              variant="outlined"
              label="Minimum Budget"
            />
          </Grid>
          <Grid item lg={6} md={12}>
            <MuiFormikTextField
              fullWidth
              name="maxBudget"
              variant="outlined"
              label="Maximum Budget"
            />
          </Grid>
          <Grid item lg={12}>
            <MuiFormikTextField
              fullWidth
              multiline
              rows={4}
              name="description"
              variant="outlined"
              label="Description"
              placeholder="Describe your order (extra directions, order details, etc.)"
            />
          </Grid>
        </Grid>
        <Grid item lg={12}>
          <CircularProgressButton
            fullWidth
            color="primary"
            variant="contained"
            type="submit"
          >
            Submit
          </CircularProgressButton>
        </Grid>
      </Grid>
    </Form>
  );
};

const formikOptions = {
  mapPropsToValues: ({ initialValues }) => ({ ...initialValues }),
  displayName: 'RequestForm',
  enableReinitialize: true,
  handleSubmit: (values, { setSubmitting, props }) => {
    values = validationSchema.cast(values);
    props.onSubmit(values);
    setSubmitting(false);
  },
  validationSchema,
};

RequestForm.whyDidYouRender = true;

RequestForm = withFormik(formikOptions)(RequestForm);

export default RequestForm;
