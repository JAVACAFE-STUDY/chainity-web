import React from 'react';
import { unstable_Box as Box } from '@material-ui/core/Box';

function Display() {
  return (
    <div style={{ width: '100%' }}>
      <Box display="flex" p={1} bgcolor="background.paper">
        {"I'm a flexbox container!"}
      </Box>
    </div>
  );
}

export default Display;
