import './profile.css';

import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux';
import { getSession } from 'app/shared/reducers/authentication';
import { createStyles, withStyles } from '@material-ui/core/styles';
import Wallet from '../../components/card/wallet';
import Events from '../../components/card/events';
import ProfileCard from './profile-card';
import RewardList from 'app/components/card/reward-list';

const styles = theme =>
    createStyles({
        root: {
            flexGrow: 1
        },
        paper: {
            padding: theme.spacing.unit * 2,
            textAlign: 'center',
            color: theme.palette.text.secondary
        },
        side: {}
    });

const mainContent = classes => (
    <React.Fragment>
        <Paper className={ classes.paper }>
            <ProfileCard/>
        </Paper>
        <Paper className={ classes.paper }>
            <RewardList eventId={ '1' }/>
        </Paper>
    </React.Fragment>
);

const sidebarContent = classes => (
    <React.Fragment>
        <Paper className={ classes.side }>
            <Wallet/>
            <Divider variant="middle"/>
            <Events/>
        </Paper>
    </React.Fragment>
);

const gridContainer = (classes, leftXs, rightXs) => (
    <Grid container spacing={ 24 }>
        <Grid item xs={ leftXs }>
            { mainContent(classes) }
        </Grid>
        <Grid item xs={ rightXs }>
            { sidebarContent(classes) }
        </Grid>
    </Grid>
);

export interface IProfileProp extends StateProps, DispatchProps {
    classes: any;
}

export class ProfilePage extends React.Component<IProfileProp> {
    componentDidMount() {
        this.props.getSession();
    }

    render() {
        const { account, classes } = this.props;
        return (
            <div>
                { gridContainer(classes, 9, 3) }
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
)(withStyles(styles)(ProfilePage));
