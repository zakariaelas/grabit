import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Typography, Box, CircularProgress } from '@material-ui/core';

const distanceMatrixService = { current: null };

const defaultDistanceMatrix = {
  distance: {
    value: 0,
    text: '',
  },
  duration: {
    value: 0,
    text: '',
  },
  error: null,
};

// The idea from this component is to provide a more Declarative API ...
// ... getting closer to the "React" way of doing things.
// In my case, instead of calling the Maps API from my submit handlers (Request Component) ...
// ... I would rather use this component to abstract the Google Maps logic.

const GoogleMapsDistanceMatrix = ({
  options,
  onSuccess,
  onError,
  ...props
}) => {
  const [distanceMatrix, setDistanceMatrix] = useState(
    defaultDistanceMatrix,
  );
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (!distanceMatrixService.current && window.google) {
      distanceMatrixService.current = new window.google.maps.DistanceMatrixService();
    }
    setIsLoading(true);
    distanceMatrixService.current.getDistanceMatrix(
      options,
      (response, status) => {
        setIsLoading(false);
        try {
          if (status === 'OK') {
            const distance = response.rows[0].elements[0].distance;
            const duration = response.rows[0].elements[0].duration;
            setDistanceMatrix({
              distance,
              duration,
              error: null,
            });
            onSuccess(response, distance, duration);
          } else {
            setDistanceMatrix({
              ...defaultDistanceMatrix,
              error: 'An error happened !',
            });
            onError(response);
          }
        } catch (err) {
          setDistanceMatrix({
            ...defaultDistanceMatrix,
            error: 'An error happened !',
          });
        }
      },
    );
  }, [options]);
  return (
    <Box py={2} px={2} display="flex" flexDirection="column">
      {isLoading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <>
          {distanceMatrix.error ? (
            <Typography color="error">
              {distanceMatrix.error}
            </Typography>
          ) : (
            <>
              <Typography paragraph>
                <strong>Estimated Distance</strong>:{' '}
                {distanceMatrix.distance &&
                  distanceMatrix.distance.text}
              </Typography>
              <Typography paragraph>
                <strong>Estimated Duration</strong>:{' '}
                {distanceMatrix.duration &&
                  distanceMatrix.duration.text}
              </Typography>
            </>
          )}
        </>
      )}
    </Box>
  );
};

GoogleMapsDistanceMatrix.propTypes = {
  options: PropTypes.object.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func,
};

export default GoogleMapsDistanceMatrix;
