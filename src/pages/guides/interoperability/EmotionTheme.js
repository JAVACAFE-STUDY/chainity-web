import React from 'react';
import styled from '@emotion/styled';
import NoSsr from '@material-ui/core/NoSsr';
import { createMuiTheme } from '@material-ui/core/styles';
import { darken, fade } from '@material-ui/core/styles/colorManipulator';
import { ThemeProvider } from 'emotion-theming';

const theme = createMuiTheme({ typography: { useNextVariants: true } });

const StyledButton = styled.button`
  padding: 8px 12px;
  border: 1px solid;
  cursor: pointer;
  outline: none;
  border-radius: ${props => props.theme.shape.borderRadius}px;
  color: ${props => props.theme.palette.primary.contrastText};
  background-color: ${props => props.theme.palette.primary.main};
  border-color: ${props => props.theme.palette.primary.main};
  transition: ${props => props.theme.transitions.create(['background-color', 'box-shadow'])};
  font-family: ${[
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(',')};
  &:hover {
    background-color: ${props => darken(props.theme.palette.primary.main, 0.1)};
    border-color: ${props => darken(props.theme.palette.primary.main, 0.2)};
  }
  &:active {
    background-color: ${props => darken(props.theme.palette.primary.main, 0.2)};
    border-color: ${props => darken(props.theme.palette.primary.main, 0.3)};
  }
  &:focus {
    box-shadow: 0 0 0 0.2rem ${props => fade(props.theme.palette.primary.main, 0.5)};
  }
  font-size: 18px;
  ${theme.breakpoints.up('md')} {
    font-size: 16px;
  }
`;

function EmotionTheme() {
  return (
    <NoSsr>
      <ThemeProvider theme={theme}>
        <StyledButton>Emotion</StyledButton>
      </ThemeProvider>
    </NoSsr>
  );
}

export default EmotionTheme;
