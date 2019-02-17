import React from 'react';
import { unstable_Box as Box } from '@material-ui/core/Box';

function Values() {
  return (
    <Box width="100%" bgcolor="background.paper">
      <Box width={1 / 4} bgcolor="grey.300" p={1} my={0.5}>
        Width 1/4
      </Box>
      <Box width={300} bgcolor="grey.300" p={1} my={0.5}>
        Width 300
      </Box>
      <Box width="75%" bgcolor="grey.300" p={1} my={0.5}>
        Width 75%
      </Box>
      <Box width={1} bgcolor="grey.300" p={1} my={0.5}>
        Width 1
      </Box>
    </Box>
  );
}

export default Values;
