import React from 'react';
import { useSelector } from 'react-redux';
import { currentUserSelector } from '../app/authReducer';
import { Route, Redirect } from 'react-router-dom';

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
          currentUser.isAuthenticated &&
          (!role ||
            (typeof role === 'string' && role === currentUser.role))
        ) {
          return (
            <Component currentUser={currentUser} {...routeProps} />
          );
        } else if (!currentUser || !currentUser.isAuthenticated) {
          return <Redirect to="/404" />;
        } else {
          return <Redirect to="/404" />;
        }
      }}
    />
  );
};

PrivateRoute.whyDidYouRender = true;

export default PrivateRoute;
