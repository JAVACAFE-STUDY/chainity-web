import '../event.css';

import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
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
import { getUser } from 'app/pages/users/users.reducer';

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
        },
        'divider-margin': {
            margin: '10px',
            backgroundColor: 'transparent'
        }
    });

const mainContent = (classes, event, user) => (
    <React.Fragment>
        <Paper className={ classes.paper }>
            <Typography component="h2" variant="h2">
                { event.title }
            </Typography>
            <Grid>
                <Grid item className={ classes.item }>
                    <Avatar src={ user.avatar } style={ { float: 'left' } }>{user.name}</Avatar>
                    <div style={ { float: 'left', paddingLeft: '10px' } }>
                        <Typography component="h6" variant="h6">
                            { user.name }
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            { convertDate(event.createdAt) }
                        </Typography>
                    </div>
                </Grid>
            </Grid>
            <div style={ { clear: 'both', paddingTop: '15px' } }>
                <Typography className={ classes.item } variant="h6" color="textSecondary">보상금</Typography>
                <Typography variant="h6">
                    { event.tokens }
                </Typography>
                <Typography className={ classes.item } variant="h6" color="textSecondary">참여신청기간</Typography>
                <Typography variant="h6">
                    { convertDate(event.startDate) } ~ { convertDate(event.finishDate) }
                </Typography>
                <Typography className={ classes.item } variant="h6" color="textSecondary">내용</Typography>
                <Typography variant="h6">
                    { event.description }
                </Typography>
            </div>
        </Paper>
    </React.Fragment>
);

const sidebarContent = classes => (
    <Paper className={ classes.paper }>
        <ApplyList participations={ [] }/>
        <Divider variant="middle" className={ classes[ 'divider-margin' ] }/>
        <CompletionList/>
    </Paper>
);

const gridContainer = (classes, leftXs, rightXs, event, rewards, user) => (
    <Grid container spacing={ 24 }>
        <Grid item xs={ leftXs }>
            { mainContent(classes, event, user) }
            <Divider variant="middle" className={ classes[ 'divider-margin' ] }/>
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
        // TODO 유저정보 조회시 status, role 파라미터가 필수로 되어있음. 이벤트 상세정보에서 어떠한 사용자가 생성한 정보인지 조회시에는 불필요한정보임. 임시로 고정처리
        this.props.getUser('1', this.props.event.createdBy, 'active', 'system');
        this.props.getEventParticipations('1', eventId);
        this.props.getEventRewards('1', eventId);
    }

    moveToList = () => {
        this.props.history.push('/event');
    };

    render() {
        const { user, classes, event, rewards, participations } = this.props;

        console.log('event', event);
        console.log('participations', participations);
        console.log('user', user);

        return (
            <div>
                { gridContainer(classes, 9, 3, event, rewards, user) }
                <Button variant="outlined" style={ { marginTop: '10px' } } className={ classes.button } onClick={ this.moveToList }>
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
    rewards: storeState.event.rewards,
    user: storeState.users.user
});

const mapDispatchToProps = { getSession, getEvent, getEventParticipations, getEventRewards, getUser };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EventDetailPage)));
