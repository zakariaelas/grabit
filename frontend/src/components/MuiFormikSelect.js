import React from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import {
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
} from '@material-ui/core';

const MuiFormikSelect = ({ name, label, children, ...props }) => {
  const [field, meta] = useField(name);
  const hasError = meta.touched && meta.error;
  const errorMsg = hasError && meta.error;
  return (
    <FormControl color="secondary" {...props}>
      <InputLabel id={`select-mui-${label}`}>{label}</InputLabel>
      <Select
        labelId={`select-mui-${label}`}
        id="demo-simple-select-outlined"
        label={label}
        {...field}
      >
        {children}
      </Select>
      {hasError && <FormHelperText>{errorMsg}</FormHelperText>}
    </FormControl>
  );
};

MuiFormikSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default MuiFormikSelect;
