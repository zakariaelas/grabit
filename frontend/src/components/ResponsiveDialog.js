import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, useTheme, useMediaQuery } from '@material-ui/core';

// This component wraps the MUI Dialog component making it responsive ...
// By "reponsive", we simply mean that the dialog goes into fullscreen ...
// ... when the screen size is below or equal to "small" screen sized devices.
const ResponsiveDialog = ({ open, onClose, children }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Dialog fullScreen={fullScreen} open={open} onClose={onClose}>
      {children}
    </Dialog>
  );
};

ResponsiveDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ResponsiveDialog;
