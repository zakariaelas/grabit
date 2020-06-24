import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  routesSelector,
  isLoadingDriverNavigationSelector,
} from './DriverNavigationReducer';
import {
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Grid,
} from '@material-ui/core';
import LoadingSpinner from '../../components/LoadingSpinner';
import { getRoutes } from './DriverNavigationActions';
import GoogleMapReact from 'google-map-react';
import { Link, useLocation } from 'react-router-dom';

const DriverNavigation = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const routes = useSelector(routesSelector);
  console.log(routes);
  const isLoading = useSelector(isLoadingDriverNavigationSelector);
  useEffect(() => {
    dispatch(getRoutes());
  }, []);
  return (
    <Box>
      <Typography variant="h4" align="center">
        We assist <em>you</em> during your <em>deliveries</em>
      </Typography>
      <Box my={4}>
        <Divider />
      </Box>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Box>
          <Grid container spacing={3}>
            <Grid item lg={6}>
              <Typography variant="h5" paragraph>
                <strong>Summary</strong>
              </Typography>
              <List>
                {routes.map((route, index) => (
                  <ListItem
                    component={Link}
                    to={{
                      pathname: `/orders/${route.id}`,
                      state: { background: location },
                    }}
                    button
                    alignItems="flex-start"
                  >
                    <ListItemAvatar>
                      <Avatar>{index + 1}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={route.address}
                      secondary={
                        <>
                          <Typography
                            variant="body2"
                            component="span"
                          >
                            Ali Connors
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item lg={6}>
              <Box height={500} width={'100%'}>
                <GoogleMapReact
                  bootstrapURLKeys={{
                    key: process.env.REACT_APP_MAPS_KEY,
                    libraries: 'places',
                  }}
                  center={{
                    lat: 33.589886,
                    lng: -7.603869,
                  }}
                  yesIWantToUseGoogleMapApiInternals
                  defaultZoom={14}
                  onGoogleApiLoaded={({ map, maps }) => {
                    const directionsService = new window.google.maps.DirectionsService();
                    const directionsRenderer = new window.google.maps.DirectionsRenderer();
                    directionsRenderer.setMap(map);
                    map.setOptions({
                      styles: [
                        {
                          featureType: 'poi.business',
                          elementType: 'labels',
                          stylers: [{ visibility: 'on' }],
                        },
                      ],
                    });
                    if (routes.length === 0) return;
                    directionsService.route(
                      {
                        origin: routes[0].address,
                        destination:
                          routes[routes.length - 1].address,
                        waypoints: routes
                          .slice(1, -1)
                          .map((route) => ({
                            location: route.address,
                            stopover: true,
                          })),
                        travelMode: 'DRIVING',
                      },
                      function (response, status) {
                        if (status === 'OK') {
                          directionsRenderer.setDirections(response);
                        } else {
                          window.alert(
                            'Directions request failed due to ' +
                              status,
                          );
                        }
                      },
                    );
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
};

DriverNavigation.propTypes = {};

export default DriverNavigation;
