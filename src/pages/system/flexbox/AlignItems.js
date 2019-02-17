import React from 'react';
import { unstable_Box as Box } from '@material-ui/core/Box';

function AlignItems() {
  return (
    <div style={{ width: '100%' }}>
      <Box
        display="flex"
        alignItems="flex-start"
        p={1}
        m={1}
        bgcolor="background.paper"
        css={{ height: 100 }}
      >
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
      <Box
        display="flex"
        alignItems="flex-end"
        p={1}
        m={1}
        bgcolor="background.paper"
        css={{ height: 100 }}
      >
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
      <Box
        display="flex"
        alignItems="center"
        p={1}
        m={1}
        bgcolor="background.paper"
        css={{ height: 100 }}
      >
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

export default AlignItems;
