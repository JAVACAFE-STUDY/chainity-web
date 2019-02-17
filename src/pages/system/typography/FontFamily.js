import React from 'react';
import Typography from '@material-ui/core/Typography';
import { unstable_Box as Box } from '@material-ui/core/Box';

function FontFamily() {
  return (
    <Typography component="div">
      <Box fontFamily="fontFamily" m={1}>
        Default
      </Box>
      <Box fontFamily="Monospace" fontSize="h6.fontSize" m={1}>
        Monospace
      </Box>
    </Typography>
  );
}

export default FontFamily;
