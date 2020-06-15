import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import { TextField } from '@material-ui/core';

//Re-usable component that couples MUI's textfield with Formik.
//This is necessary, because we need to make MUI's TextField component "aware" of Formik.
//One of the things that formik "injects" into the TextField component is the onChange handler.
//It is important to extract this coupling in a separate component in order to re-use it across different components
const SpecialFormikTextField = ({ optionValue, name, ...props }) => {
  //makes use of formik v2 useField hook.
  //Another alternative is to use formik's Field component.
  const [{ onChange, ...field }, meta, helpers] = useField(name);
  const hasError = meta.touched && meta.error;
  const errorMsg = hasError && meta.error;

  useEffect(() => {
    console.log(optionValue);
    if (optionValue)
      helpers.setValue({
        description: optionValue.description,
        id: optionValue.place_id,
      });
  }, [optionValue]);

  return (
    <>
      <TextField
        color="secondary"
        error={!!hasError}
        helperText={errorMsg}
        {...field}
        {...props}
      />
    </>
  );
};

//Name prop is mandatory
SpecialFormikTextField.propTypes = {
  name: PropTypes.string.isRequired,
};

export default SpecialFormikTextField;
