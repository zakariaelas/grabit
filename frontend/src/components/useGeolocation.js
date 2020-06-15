import { useState, useEffect } from 'react';

const defaultPositon = {
  latitude: null,
  longitude: null,
  // longitude and latitude are probably what we'll end up caring about ...
  // ... however, for completeness of this hook, we'll return GeolocationCoordinates
  // ... interface properties (https://developer.mozilla.org/en-US/docs/Web/API/GeolocationCoordinates)
  // So this hook basically takes the properties of the GeolocationPosition and ...
  // ... GeolocationCoordinates interfaces and "spreads" them in a single object
  altitude: null,
  accuracy: null,
  altitudeAccuracy: null,
  heading: null,
  speed: null,
  timestamp: null,
  // error implements the GeolocationPositionError interface ...
  // ... (https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPositionError)
  error: null,
};

const useGeolocation = (options = {}) => {
  const [position, setPosition] = useState(defaultPositon);

  useEffect(() => {
    const updatePosition = ({ coords = {}, timestamp }) => {
      // using the spread operator on the coords object will not work as expected ...
      // ... read this for an explanation https://stackoverflow.com/a/57049526
      const {
        latitude,
        longitude,
        altitude,
        accuracy,
        altitudeAccuracy,
        heading,
        speed,
      } = coords;
      setPosition({
        latitude,
        longitude,
        altitude,
        accuracy,
        altitudeAccuracy,
        heading,
        speed,
        timestamp,
      });
    };

    const setError = (error) => {
      setPosition({
        error,
        ...defaultPositon,
      });
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        updatePosition,
        setError,
        options,
      );
    } else {
      setError({ message: 'Geolocation API not supported' });
    }
  }, []);

  return position;
};

export default useGeolocation;
