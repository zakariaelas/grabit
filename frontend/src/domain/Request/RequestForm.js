import React, { useState, useEffect, useRef } from 'react';
import { withFormik, FieldArray, Form } from 'formik';
import {
  Grid,
  Box,
  InputAdornment,
  IconButton,
  List,
  ListItemText,
  ListItem,
  ListItemIcon,
  Typography,
} from '@material-ui/core';
import MuiFormikTextField from '../../components/MuiFormikTextField';
import {
  Add,
  RemoveCircle,
  DesktopWindows,
  PhotoSizeSelectLargeRounded,
} from '@material-ui/icons';
import CircularProgressButton from '../../components/CircularProgressButton';
import validationSchema from './requestValidationSchema';
import GoogleMapReact from 'google-map-react';
import useGeolocation from '../../components/useGeolocation';
import GoogleAddressAutocomplete from '../../components/GoogleAddressAutocomplete';

const HomeTooltip = () => <Typography variant="h5">🏠</Typography>;

const BikeTooltip = () => <Typography variant="h5">🏍️</Typography>;

const directionsService = { current: null };
const directionsRenderer = { current: null };

let RequestForm = ({ values }) => {
  const { latitude, longitude } = useGeolocation({
    enableHighAccuracy: true,
  });

  const [loaded, setLoaded] = useState(false);
  const mapRef = useRef(null);

  useEffect(() => {
    if (
      !directionsRenderer.current &&
      !directionsService.current &&
      window.google
    ) {
      console.log('here bro');
      directionsService.current = new window.google.maps.DirectionsService();
      directionsRenderer.current = new window.google.maps.DirectionsRenderer();
      directionsRenderer.current.setMap(mapRef.current.map_);
    }
    if (
      values.from &&
      values.destination &&
      values.from.description &&
      values.destination.description
    ) {
      directionsService.current.route(
        {
          origin: values.from.description,
          destination: values.destination.description,
          travelMode: 'DRIVING',
        },
        function (response, status) {
          if (status === 'OK') {
            console.log('response', response);
            directionsRenderer.current.setDirections(response);
          } else {
            window.alert(
              'Directions request failed due to ' + status,
            );
          }
        },
      );
    }
  }, [loaded, values.from, values.destination]);

  return (
    <Form>
      <Grid container spacing={3}>
        <Grid container spacing={3} item lg={6} sm={12}>
          <Grid item lg={12}>
            <MuiFormikTextField
              fullWidth
              multiline
              rows={4}
              name="description"
              variant="outlined"
              label="Description"
              placeholder="Describe your order"
            />
          </Grid>
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
        </Grid>
        <Grid container spacing={3} item lg={6} sm={12}>
          <Grid item lg={12}>
            <GoogleAddressAutocomplete
              variant="outlined"
              fullWidth
              name="from"
              label="Pickup"
              placeholder="Pickup address"
            />
          </Grid>
          <Grid item lg={12}>
            <GoogleAddressAutocomplete
              variant="outlined"
              fullWidth
              name="destination"
              label="Destination"
              placeholder="Destination address"
            />
          </Grid>
          <Grid item lg={12}>
            <Box height={500} width={'100%'}>
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: process.env.REACT_APP_MAPS_KEY,
                  libraries: 'places',
                }}
                ref={mapRef}
                defaultCenter={{
                  lat: latitude,
                  lng: longitude,
                }}
                yesIWantToUseGoogleMapApiInternals
                defaultZoom={13}
                onGoogleApiLoaded={({ map, maps }) => {
                  //setLoaded(true);
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
              >
                <HomeTooltip lat={latitude} lng={longitude} />
                <BikeTooltip lat={33.9954189} lng={-6.8500229} />
              </GoogleMapReact>
            </Box>
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

const ItemsFormik = ({ push, remove, form }) => {
  const { values, setFieldValue } = form;
  console.log(form);
  return (
    <>
      <MuiFormikTextField
        variant="outlined"
        label="Order Item"
        name="currentItem"
        placeholder="Enter an item"
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={() => {
                  if (values.currentItem === '') return;
                  setFieldValue('currentItem', '');
                  push({ text: values.currentItem });
                }}
              >
                <Add color="secondary" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Box>
        <List>
          {values.items.map((value, index) => (
            <ListItem key={index}>
              <ListItemIcon style={{ minWidth: '38px' }}>
                <IconButton
                  size="small"
                  edge="end"
                  aria-label="delete"
                  onClick={() => remove(index)}
                >
                  <RemoveCircle color="primary" fontSize="small" />
                </IconButton>
              </ListItemIcon>
              <ListItemText primary={value.text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
};

ItemsFormik.whyDidYouRender = true;

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
