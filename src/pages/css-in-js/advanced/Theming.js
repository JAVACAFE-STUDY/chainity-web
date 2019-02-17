import React from 'react';
import { ThemeProvider, makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.background,
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
}));

function DeepChild() {
  const classes = useStyles();

  return <Button className={classes.root}>Theming</Button>;
}

function Theming() {
  return (
    <ThemeProvider
      theme={{
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      }}
    >
      <DeepChild />
    </ThemeProvider>
  );
}

export default Theming;
