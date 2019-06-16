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
import { getUser } from 'app/pages/users/users.reducer';
import { getEventParticipationByUser } from 'app/pages/events/event.reducer';
import ProfileRewardList from 'app/pages/profile/profile-reward-list';

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
        button: {
            borderRadius: '3px',
            fontSize: '14px',
            fontWeight: 400,
            padding: '6px 10px',
            backgroundColor: '#fff',
            borderColor: '#e5e5e5',
            color: '#2e2e2e',
            whiteSpace: 'nowrap'
        }
    });

const mainContent = (classes, user) => (
    <React.Fragment>
        <Paper className={ classes.paper }>
            <ProfileCard/>
        </Paper>
        <Paper className={ classes.paper }>
            <ProfileRewardList userId={ user._id }/>
        </Paper>
    </React.Fragment>
);

const sidebarContent = (classes, user, userParticipations) => (
    <React.Fragment>
        <Paper className={ classes.paper }>
            <Wallet user={ user }/>
            <Divider variant="middle"/>
            <Events userParticipations={ userParticipations }/>
        </Paper>
    </React.Fragment>
);

const gridContainer = (classes, leftXs, rightXs, user, userParticipations) => (
    <Grid container spacing={ 24 }>
        <Grid item xs={ leftXs }>
            { mainContent(classes, user) }
        </Grid>
        <Grid item xs={ rightXs }>
            { sidebarContent(classes, user, userParticipations) }
        </Grid>
    </Grid>
);

export interface IProfileProp extends StateProps, DispatchProps {
    classes: any;
}

export interface IProfileState {
    profile: any;
}

export class ProfilePage extends React.Component<IProfileProp, IProfileState> {

    state: IProfileState = {
        profile: null
    };

    componentDidMount() {
        const { account } = this.props;
        this.props.getUser('1', account._id, account.status, account.role);
        this.props.getEventParticipationByUser('1', account._id);
    }

    render() {
        const { classes, user, userParticipations } = this.props;
        return (
            <div>
                <div>
                    { gridContainer(classes, 9, 3, user, userParticipations) }
                </div>
            </div>
        );
    }
}

const mapStateToProps = storeState => ({
    account: storeState.authentication.account,
    isAuthenticated: storeState.authentication.isAuthenticated,
    user: storeState.users.user,
    userParticipations: storeState.event.userParticipations
});

const mapDispatchToProps = { getSession, getUser, getEventParticipationByUser };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(ProfilePage));
