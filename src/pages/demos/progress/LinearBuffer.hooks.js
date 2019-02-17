import React from 'react';
import { makeStyles } from '@material-ui/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

function LinearBuffer() {
  const classes = useStyles();
  const [completed, setCompleted] = React.useState(0);
  const [buffer, setBuffer] = React.useState(10);

  function progress() {
    if (completed > 100) {
      setCompleted(0);
      setBuffer(10);
    } else {
      const diff = Math.random() * 10;
      const diff2 = Math.random() * 10;
      setCompleted(completed + diff);
      setBuffer(completed + diff + diff2);
    }
  }

  React.useEffect(() => {
    const timer = setInterval(progress, 500);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={classes.root}>
      <LinearProgress variant="buffer" value={completed} valueBuffer={buffer} />
      <br />
      <LinearProgress color="secondary" variant="buffer" value={completed} valueBuffer={buffer} />
    </div>
  );
}

export default LinearBuffer;
