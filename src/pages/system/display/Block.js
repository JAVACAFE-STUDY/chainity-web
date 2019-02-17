import React from 'react';
import { unstable_Box as Box } from '@material-ui/core/Box';

function Block() {
  return (
    <div style={{ width: '100%' }}>
      <Box component="span" display="block" p={1} m={1} bgcolor="background.paper">
        block
      </Box>
      <Box component="span" display="block" p={1} m={1} bgcolor="background.paper">
        block
      </Box>
    </div>
  );
}

export default Block;
