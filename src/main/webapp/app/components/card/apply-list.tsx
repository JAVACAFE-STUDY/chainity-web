import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { createStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button/Button';
import List from '@material-ui/core/List/List';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar/Avatar';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import CardHeader from '@material-ui/core/CardHeader/CardHeader';
import { API_PREFIX, GROUP_ID, URL_EVENTS, URL_PARTICIPATIONS, URL_USERS, URL_REWARDS } from 'app/config/constants';
import axios from 'axios';
import _ from 'lodash';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

const styles = createStyles({
    card: {
        minWidth: 275
    },
    title: {
        fontSize: 14
    },
    pos: {
        marginBottom: 12
    },
    text: {
        textAlign: 'left'
    },
    rewardButton: {
        'margin-top': '5px'
    }
});

export interface IApplyListProp {
    classes?: any;
    participants: any[];
    eventId: string;
    account: { _id: string };
    refreshRewards: any;
    refreshParticipants: any;
    rewardedUsers: any;
    participantUsers: any;
}

export class ApplyList extends React.Component<IApplyListProp> {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            participants: []
        };
    }

    handleApply = () => {
        const url = `${API_PREFIX}/${GROUP_ID}${URL_EVENTS}/${this.props.eventId}${URL_PARTICIPATIONS}`;
        axios.post(url)
            .then(res => {
                this.setState({
                    isLoaded: true
                });
                this.props.refreshParticipants();
                // this.searchApplier();
                alert('참여 신청되었습니다.');
            });
    };

    handleCancel = () => {

        const { account } = this.props;
        // @ts-ignore
        const { participants } = this.state;

        const participation = participants.find(ele => ele._id === account._id);
        const participantId = participation.participantId;
        const url = `${API_PREFIX}/${GROUP_ID}${URL_EVENTS}/${this.props.eventId}${URL_PARTICIPATIONS}/${participantId}`;
        axios.delete(url)
            .then(res => {
                this.setState({
                    isLoaded: true
                });
                this.props.refreshParticipants();
                // this.searchApplier();
                alert('참여 신청이 취소되었습니다.');
            });
    };

    giveReward = id => {

        const url = `${API_PREFIX}/${GROUP_ID}${URL_EVENTS}/${this.props.eventId}${URL_REWARDS}`;
        // @ts-ignore
        const { tokens } = this.props;

        axios.post(url, {
                rewardedUser: id,
                tokens
            })
            .then(res => {
                this.setState({
                    isLoaded: true
                });
                this.props.refreshRewards();
                alert('보상 처리를 진행합니다. 원장에 반영되기까지 시간이 소요 될 수 있습니다.');
            });

    };

    // TODO :
    render() {

        const { classes, account, rewardedUsers, participantUsers } = this.props;
        // @ts-ignore
        const rewardedUsersIds = rewardedUsers && Array.isArray(rewardedUsers) ? rewardedUsers.map(ele => ele.rewardedUser) : [];
        const participants = participantUsers && Array.isArray(participantUsers) ? participantUsers.filter(participantUser => !rewardedUsersIds.includes(participantUser.participantUser)) : [];
        const isParticipated = participants.some(ele => ele._id === account._id);

        return (
            <Card>
                <CardHeader
                    title="참여신청"
                    action={
                        isParticipated ? (
                            <Button size="small" onClick={ this.handleCancel }>취소하기</Button>
                        ) : (
                            <Button size="small" onClick={ this.handleApply }>신청하기</Button>
                        )
                    }
                />
                <CardContent>
                    <List className={ classes.root }>
                        {
                            participants && participants.length > 0 ? participants.map((participant, i) => (
                                <ListItem key={i} alignItems="flex-start">
                                    <ListItemAvatar>
                                        { !_.isEmpty(participant.avatar) ? <Avatar src={ participant.avatar }>{ participant.name }</Avatar>
                                            : <Avatar>H</Avatar> }
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={participant.name}
                                        secondary={
                                            <React.Fragment>
                                                <Typography component="span" className={ classes.inline } color="textPrimary">
                                                    {participant.createdAt.substr(0, 10)}
                                                </Typography>
                                            </React.Fragment>
                                        }
                                    />
                                    {
                                        (account.role === 'system' || account.role === 'admin') && (
                                            <Button variant="outlined" className={ classes.button + ' ' + classes.rewardButton } onClick={ this.giveReward.bind(this, participant.participantUser) }>
                                                보상
                                            </Button>
                                        )
                                    }
                                </ListItem>
                                )
                            ) : (
                                <ListItem alignItems="flex-start">
                                    신청자가 없습니다.
                                </ListItem>
                            )
                        }
                    </List>
                </CardContent>
            </Card>
        );
    }
}

const mapStateToProps = storeState => ({
    account: storeState.authentication.account
});

// @ts-ignore
export default withRouter(connect(mapStateToProps)(withStyles(styles)(ApplyList)));
