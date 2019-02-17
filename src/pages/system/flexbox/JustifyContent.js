import React from 'react';
import { unstable_Box as Box } from '@material-ui/core/Box';

function JustifyContent() {
  return (
    <div style={{ width: '100%' }}>
      <Box display="flex" justifyContent="flex-start" m={1} p={1} bgcolor="background.paper">
        <Box p={1} bgcolor="grey.300">
          Item 1
        </Box>
        <Box p={1} bgcolor="grey.300">
          Item 1
        </Box>
        <Box p={1} bgcolor="grey.300">
          Item 1
        </Box>
      </Box>
      <Box display="flex" justifyContent="flex-end" m={1} p={1} bgcolor="background.paper">
        <Box p={1} bgcolor="grey.300">
          Item 1
        </Box>
        <Box p={1} bgcolor="grey.300">
          Item 1
        </Box>
        <Box p={1} bgcolor="grey.300">
          Item 1
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" m={1} p={1} bgcolor="background.paper">
        <Box p={1} bgcolor="grey.300">
          Item 1
        </Box>
        <Box p={1} bgcolor="grey.300">
          Item 1
        </Box>
        <Box p={1} bgcolor="grey.300">
          Item 1
        </Box>
      </Box>
    </div>
  );
}

export default JustifyContent;
