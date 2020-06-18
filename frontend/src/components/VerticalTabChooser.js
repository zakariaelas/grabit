import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  Tab,
  makeStyles,
  Box,
  Tabs,
  Typography,
  Divider,
  Hidden,
} from '@material-ui/core';
import { Link, useLocation, Switch } from 'react-router-dom';
import {
  displayNameSelector,
  userImageSelector,
} from '../app/authReducer';
import { useSelector } from 'react-redux';
import ShadowPaper from './ShadowPaper';
import AvatarOrInitials from './AvatarOrInitials';

const findSelectedTabFromPath = (location, children) => {
  const selectedTab = children.findIndex(
    (tab) => tab.props.path === location.pathname,
  );
  return selectedTab !== -1 ? selectedTab : 0;
};

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: '620px',
  },
  tabContainer: {
    flex: '1 1 auto',
    marginLeft: theme.spacing(3),
  },
  tabColumn: {
    minWidth: '205px',
    height: 'auto',
  },
  avatar: {
    marginRight: theme.spacing(1),
  },
  bold: {
    fontWeight: 500,
  },
  flexBasis100: {
    flexBasis: '100%',
  },
}));

const VerticalTabChooser = ({ children }) => {
  const classes = useStyles();
  const location = useLocation();
  const imageUrl = useSelector(userImageSelector);
  const displayName = useSelector(displayNameSelector);
  const [currentTab, selectTab] = useState(
    findSelectedTabFromPath(location, children),
  );
  const handleChange = (_, value) => {
    selectTab(value);
  };

  useEffect(() => {
    selectTab(findSelectedTabFromPath(location, children));
  }, [location.pathname]);

  return (
    <>
      <Hidden smDown>
        <Box display="flex" className={classes.container}>
          <ShadowPaper>
            <Box p={3} display="flex" flexDirection="column">
              <Box mb={3} px={1.5} display="flex" alignItems="center">
                <AvatarOrInitials
                  className={classes.avatar}
                  imageUrl={imageUrl}
                  displayName={displayName}
                />
                <Typography variant="body1" className={classes.bold}>
                  {displayName}
                </Typography>
              </Box>
              <Box mb={3}>
                <Divider variant="fullWidth" />
              </Box>
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={currentTab}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
              >
                {children.map((tab, index) => {
                  //remove the last element which is a <Redirect /> component
                  if (index === children.length - 1) return null;
                  return (
                    <Tab
                      key={tab.props.label}
                      label={tab.props.label}
                      component={Link}
                      icon={tab.props.icon}
                      to={tab.props.path}
                    />
                  );
                })}
              </Tabs>
            </Box>
          </ShadowPaper>
          <Box display="flex" className={classes.tabContainer}>
            <ShadowPaper className={classes.flexBasis100}>
              <Box py={3} px={4}>
                <Switch>{children}</Switch>
              </Box>
            </ShadowPaper>
          </Box>
        </Box>
      </Hidden>
      <Hidden smUp>
        <Switch>{children}</Switch>
      </Hidden>
    </>
  );
};

VerticalTabChooser.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default VerticalTabChooser;
