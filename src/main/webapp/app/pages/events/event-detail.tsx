import './event.css';

import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux';
import { getSession } from 'app/shared/reducers/authentication';
import { getEventDetail } from './event-detail.reducer';
import { createStyles, withStyles } from '@material-ui/core/styles';
import ApplyList from '../card/apply-list';
import CompletionList from '../card/completion-list';
import Typography from '@material-ui/core/Typography';
import RewardList from '../card/reward-list';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

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
                        안경섭
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        2019-08-19
                    </Typography>
                </Grid>
            </Grid>
            <Typography className={ classes.item } variant="h5" color="textSecondary">보상금</Typography>
            <Typography variant="h5">
                { event.tokens }
            </Typography>
            <Typography className={ classes.item } variant="h5" color="textSecondary">참여신청기간</Typography>
            <Typography variant="h6">
                { event.startDate } ~ { event.finishDate }
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
        <ApplyList/>
        <Divider variant="middle"/>
        <CompletionList/>
    </Paper>
);

const gridContainer = (classes, leftXs, rightXs, event) => (
    <Grid container spacing={ 24 }>
        <Grid item xs={ leftXs }>
            { mainContent(classes, event) }
            <RewardList eventId={ event._id }/>
            <Button variant="outlined" className={ classes.button }>
                &lt; 목록으로 돌아가기
            </Button>
        </Grid>
        <Grid item xs={ rightXs }>
            { sidebarContent(classes) }
        </Grid>

    </Grid>
);

export interface IEventDetailPageProp extends StateProps, DispatchProps {
    classes: any;
    match: any;
}

export class EventDetailPage extends React.Component<IEventDetailPageProp> {
    componentDidMount() {
        // this.props.getSession();
        this.props.getEventDetail('1', '1');
    }

    render() {
        const { account, classes, match, event } = this.props;
        // match.params.id

        return (
            <div>
                { gridContainer(classes, 9, 3, event) }
            </div>
        );
    }
}

const mapStateToProps = storeState => ({
    account: storeState.authentication.account,
    isAuthenticated: storeState.authentication.isAuthenticated,
    event: storeState.eventDetail.event
});

const mapDispatchToProps = { getSession, getEventDetail };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(EventDetailPage));
