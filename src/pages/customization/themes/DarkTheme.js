import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import WithTheme from './WithTheme';

const theme = createMuiTheme({
  palette: {
    type: 'dark', // Switching the dark mode on is a single property value change.
  },
  typography: { useNextVariants: true },
});

function DarkTheme() {
  return (
    <MuiThemeProvider theme={theme}>
      <WithTheme />
    </MuiThemeProvider>
  );
}

export default DarkTheme;
