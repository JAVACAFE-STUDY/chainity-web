import React from 'react';
import { unstable_Box as Box } from '@material-ui/core/Box';

function Width() {
  return (
    <Box width="100%" bgcolor="background.paper">
      <Box width="25%" bgcolor="grey.300" p={1} my={0.5}>
        Width 25%
      </Box>
      <Box width="50%" bgcolor="grey.300" p={1} my={0.5}>
        Width 50%
      </Box>
      <Box width="75%" bgcolor="grey.300" p={1} my={0.5}>
        Width 75%
      </Box>
      <Box width="100%" bgcolor="grey.300" p={1} my={0.5}>
        Width 100%
      </Box>
      <Box width="auto" bgcolor="grey.300" p={1} my={0.5}>
        Width auto
      </Box>
    </Box>
  );
}

export default Width;
