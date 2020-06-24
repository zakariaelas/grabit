import React from 'react';
import PropTypes from 'prop-types';
import MobileDrawer from './MobileDrawer';
import NavigationRail from './NavigationRail';
import { Hidden } from '@material-ui/core';

const ResponsiveNavigationRail = ({ open, handleClose }) => {
  return (
    <>
      <Hidden smUp>
        <MobileDrawer open={open} handleClose={handleClose} />
      </Hidden>
      <Hidden smDown>
        <NavigationRail />
      </Hidden>
    </>
  );
};

ResponsiveNavigationRail.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default ResponsiveNavigationRail;
