import React, {
  useCallback,
  useState,
  useEffect,
  useRef,
} from 'react';
import { useSelector } from 'react-redux';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import GoogleAddressAutocomplete from '../../components/GoogleAddressAutocomplete';

const Home = ({ currentUser }) => {
  console.log('re-rendered');

  return (
    <div>
      <h1>Home</h1>
      <h3>Hello {currentUser.displayName} !</h3>
    </div>
  );
};

Home.whyDidYouRender = true;

export default Home;
