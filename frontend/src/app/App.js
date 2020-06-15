import React from 'react';
import {
  createMuiTheme,
  Box,
  MuiThemeProvider,
  CssBaseline,
  responsiveFontSizes,
} from '@material-ui/core';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import LandingPage from '../domain/Landing/LandingPage';
import configureStore from './configureStore';
import { Provider } from 'react-redux';
import Home from '../domain/Home/Home';
import PrivateRoute from '../components/PrivateRoute';
import NotFound from '../components/NotFound';
import AppContainer from '../components/AppContainer';
import Request from '../domain/Request/Request';

let theme = createMuiTheme({
  palette: {
    primary: {
      main: '#F71117',
    },
    secondary: {
      main: '#849FB1',
      dark: '#333C45',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 980,
      lg: 1280,
      xl: 1920,
    },
  },
  typography: {
    fontFamily: ['"Montserrat"', 'Arial', 'sans-serif'],
    useNextVariants: true,
  },
});

theme = responsiveFontSizes(theme);

const store = configureStore();

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      {/* CssBaseline is used to reset some styles (padding, margins, etc.) across different browsers.  */}
      <CssBaseline />
      <Box>
        <Provider store={store}>
          <Router basename={process.env.PUBLIC_URL}>
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route
                exact
                path="/logout"
                render={() => {
                  localStorage.removeItem('token');
                  window.location.href = `${process.env.PUBLIC_URL}/`;
                }}
              />
              <AppContainer>
                <PrivateRoute exact path="/home" component={Home} />
                <PrivateRoute
                  exact
                  path="/new-order"
                  component={Request}
                />
                <Route component={NotFound} />
              </AppContainer>
            </Switch>
          </Router>
        </Provider>
      </Box>
    </MuiThemeProvider>
  );
}

App.whyDidYouRender = true;

export default App;
