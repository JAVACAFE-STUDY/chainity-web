import './event.css';

import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux';
import { getSession } from 'app/shared/reducers/authentication';
import { withStyles, createStyles } from '@material-ui/core/styles';
import ApplyList from '../card/apply-list';
import CompletionList from '../card/completion-list';
import Typography from '@material-ui/core/Typography';
import RewardList from '../card/reward-list';

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const styles = theme =>
  createStyles({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.secondary
    }
  });

const mainContent = classes => (
  <Paper className={classes.paper}>
    <Typography color="textSecondary" variant="h1">
      TODO : Event detail page
    </Typography>
  </Paper>
);

const sidebarContent = classes => (
  <Paper className={classes.paper}>
    <ApplyList />
    <Divider variant="middle" />
    <CompletionList />
  </Paper>
);

const gridContainer = (classes, leftXs, rightXs) => (
  <Grid container spacing={24}>
    <Grid item xs={leftXs}>
      {mainContent(classes)}
      <RewardList />
    </Grid>
    <Grid item xs={rightXs}>
      {sidebarContent(classes)}
    </Grid>
  </Grid>
);

export interface IHomeProp extends StateProps, DispatchProps {
  classes: any;
}

export class EventPage extends React.Component<IHomeProp> {
  componentDidMount() {
    this.props.getSession();
  }

  render() {
    const { account, classes } = this.props;
    return (
      <div>
        {gridContainer(classes, 9, 3)}
      </div>
    );
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated
});

const mapDispatchToProps = { getSession };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(EventPage));
