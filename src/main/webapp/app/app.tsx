import 'react-toastify/dist/ReactToastify.css';
import './app.css';

import React from 'react';
import { connect } from 'react-redux';
import { Card } from 'reactstrap';
import { HashRouter as Router } from 'react-router-dom';
import { toast, ToastContainer, ToastPosition } from 'react-toastify';

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import { setLocale } from 'app/shared/reducers/locale';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import ErrorBoundary from 'app/shared/error/error-boundary';
import { AUTHORITIES } from 'app/config/constants';
import AppRoutes from 'app/routes';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

export interface IAppProps extends StateProps, DispatchProps {
}

const deafultTheme = createMuiTheme({
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(',')
  }/*
  ,
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#ff4400'
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00'
    }
    // error: will use the default color
  }
  */
  /*
  ,
  palette: {
    type: 'dark'
  }
  */
});

export class App extends React.Component<IAppProps> {

    render() {
        const paddingTop = '60px';
        return (
            <MuiThemeProvider theme={deafultTheme}>
              <Router>
                <div className="app-container" style={ { paddingTop } }>
                  <ToastContainer
                    position={ toast.POSITION.TOP_LEFT as ToastPosition }
                    className="toastify-container"
                    toastClassName="toastify-toast"
                  />
                  <ErrorBoundary>
                    <AppRoutes/>
                  </ErrorBoundary>
                </div>
              </Router>
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = ({ authentication, locale }: IRootState) => ({
    currentLocale: locale.currentLocale,
    isAuthenticated: authentication.isAuthenticated,
    isAdmin: hasAnyAuthority(authentication.account.authorities, [ AUTHORITIES.ADMIN ])
});

const mapDispatchToProps = { setLocale, getSession };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
