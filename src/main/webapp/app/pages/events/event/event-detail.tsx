import '../event.css';

import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux';
import { getSession } from 'app/shared/reducers/authentication';
import { getEvent, getEventParticipations, getEventRewards } from '../event.reducer';
import { createStyles, withStyles } from '@material-ui/core/styles';
import ApplyList from '../../../components/card/apply-list';
import CompletionList from '../../../components/card/completion-list';
import Typography from '@material-ui/core/Typography';
import RewardList from '../../../components/card/reward-list';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { convertDate } from 'app/shared/util/date-utils';
import queryString from 'query-string';

const styles = theme =>
    createStyles({
        root: {
            flexGrow: 1
        },
        paper: {
            padding: theme.spacing.unit * 2,
            textAlign: 'left',
            color: theme.palette.text.secondary
        },
        item: {
            marginTop: '20px'
        }
    });

const mainContent = (classes, event) => (
    <React.Fragment>
        <Paper className={ classes.paper }>
            <Typography component="h2" variant="h1">
                { event.title }
            </Typography>
            <Grid>
                <Grid item className={ classes.item }>
                    <Avatar style={ { float: 'left' } }>H</Avatar>
                    <Typography component="h5" variant="h5">
                        { event.createdBy }
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        { convertDate(event.createdAt) }
                    </Typography>
                </Grid>
            </Grid>
            <Typography className={ classes.item } variant="h5" color="textSecondary">보상금</Typography>
            <Typography variant="h5">
                { event.tokens }
            </Typography>
            <Typography className={ classes.item } variant="h5" color="textSecondary">참여신청기간</Typography>
            <Typography variant="h6">
                { convertDate(event.startDate) } ~ { convertDate(event.finishDate) }
            </Typography>
            <Typography className={ classes.item } variant="h5" color="textSecondary">내용</Typography>
            <Typography variant="h5">
                { event.description }
            </Typography>
        </Paper>
    </React.Fragment>
);

const sidebarContent = classes => (
    <Paper className={ classes.paper }>
        <ApplyList participations={ [] }/>
        <Divider variant="middle"/>
        <CompletionList/>
    </Paper>
);

const gridContainer = (classes, leftXs, rightXs, event, rewards) => (
    <Grid container spacing={ 24 }>
        <Grid item xs={ leftXs }>
            { mainContent(classes, event) }
            <RewardList items={ rewards }/>
        </Grid>
        <Grid item xs={ rightXs }>
            { sidebarContent(classes) }
        </Grid>

    </Grid>
);

export interface IEventDetailPageProp extends StateProps, DispatchProps, RouteComponentProps {
    classes: any;
    match: any;
}

export class EventDetailPage extends React.Component<IEventDetailPageProp> {

    componentDidMount() {
        const eventId = queryString.parse(this.props.location.search).id;
        this.props.getEvent('1', eventId);
        this.props.getEventParticipations('1', eventId);
        this.props.getEventRewards('1', eventId);
    }

    moveToList = () => {
        this.props.history.push('/event');
    };

    render() {
        const { account, classes, event, rewards, participations } = this.props;

        console.log('event', event);
        console.log('participations', participations);

        return (
            <div>
                { gridContainer(classes, 9, 3, event, rewards) }
                <Button variant="outlined" className={ classes.button } onClick={ this.moveToList }>
                    &lt; 목록으로 돌아가기
                </Button>
            </div>
        );
    }
}

const mapStateToProps = storeState => ({
    account: storeState.authentication.account,
    isAuthenticated: storeState.authentication.isAuthenticated,
    participations: storeState.event.participations,
    event: storeState.event.event,
    rewards: storeState.event.rewards
});

const mapDispatchToProps = { getSession, getEvent, getEventParticipations, getEventRewards };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EventDetailPage)));
