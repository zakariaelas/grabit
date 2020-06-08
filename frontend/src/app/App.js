import React from 'react';
import {
  createMuiTheme,
  Box,
  MuiThemeProvider,
  Container,
  CssBaseline,
} from '@material-ui/core';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import LandingPage from '../domain/Landing/LandingPage';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#831c00',
    },
  },
  typography: {
    useNextVariants: true,
  },
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      {/* CssBaseline is used to reset some styles (padding, margins, etc.) across different browsers.  */}
      <CssBaseline />
      <Box my={4}>
        <Router basename={process.env.PUBLIC_URL}>
          <Container maxWidth="md">
            <Switch>
              <Route exact path="/" component={LandingPage} />
            </Switch>
          </Container>
        </Router>
      </Box>
    </MuiThemeProvider>
  );
}

export default App;
