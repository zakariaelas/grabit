import React from 'react';
import { useSelector } from 'react-redux';
import { currentUserSelector } from '../app/authReducer';
import { Route } from 'react-router-dom';
import NotFound from './NotFound';

// Component that wraps react-router's Route component
// The component makes a "decision" whether to render a component or not ...
// ... based on if the user is authenticated.
// It can also make this decision based on the role of the currentUser ...
// ... this allows us to implement role based access control on some components
const PrivateRoute = ({ component: Component, role, ...props }) => {
  const currentUser = useSelector(currentUserSelector);
  return (
    <Route
      {...props}
      render={(routeProps) => {
        if (
          currentUser &&
          currentUser.isAuthenticated === true &&
          (!role ||
            (typeof role === 'string' && role === currentUser.role))
        ) {
          return (
            <Component currentUser={currentUser} {...routeProps} />
          );
        } else {
          return <NotFound />;
        }
      }}
    />
  );
};

PrivateRoute.whyDidYouRender = true;

export default PrivateRoute;
