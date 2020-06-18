import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import { TextField } from '@material-ui/core';

// This components serves as a wrapper around formik and mui textfield ...
// It should be used only with the GoogleAddressAutocomplete component !!

const MapsFormikTextField = ({ optionValue, name, ...props }) => {
  const [{ onChange, ...field }, meta, helpers] = useField(name);
  const hasError = meta.touched && meta.error;
  const errorMsg =
    hasError && typeof meta.error.address === 'string'
      ? meta.error.address
      : null;
  useEffect(() => {
    if (optionValue)
      helpers.setValue({
        address: optionValue.description,
        place_id: optionValue.place_id,
      });
  }, [optionValue]);
  return (
    <>
      <TextField
        color="secondary"
        error={!!hasError}
        helperText={errorMsg}
        {...props}
        {...field}
      />
    </>
  );
};

//Name prop is mandatory
MapsFormikTextField.propTypes = {
  name: PropTypes.string.isRequired,
};

export default MapsFormikTextField;
