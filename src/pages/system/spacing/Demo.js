import React from 'react';
import { unstable_Box as Box } from '@material-ui/core/Box';

function Color() {
  return (
    <div>
      <Box p={1} bgcolor="background.paper">
        p={1}
      </Box>
      <Box m={1} bgcolor="background.paper">
        m={1}
      </Box>
      <Box p={2} bgcolor="background.paper">
        p={2}
      </Box>
    </div>
  );
}

export default Color;
