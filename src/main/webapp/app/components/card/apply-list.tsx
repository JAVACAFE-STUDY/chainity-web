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
import { API_PREFIX, GROUP_ID, URL_EVENTS, URL_PARTICIPATIONS, URL_USERS } from 'app/config/constants';
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
    }
});

export interface IApplyListProp {
    classes?: any;
    participants: any[];
    eventId: string;
    account: { _id: string };
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

    searchApplier = async () => {
        console.dir(this.props);
        // /v1/groups/:groupId/events/:eventId/participations
        const url = `${API_PREFIX}/${GROUP_ID}${URL_EVENTS}/${this.props.eventId}${URL_PARTICIPATIONS}?limit=999`;
        const res = await axios.get(url);
        const getUsersPromises = [];
        const participants = [];
        const users = [];

        // @ts-ignore
        if (res && res.data && res.data.docs && res.data.docs.length > 0) {
            // @ts-ignore
            res.data.docs.forEach(ele => {
                getUsersPromises.push(this.searchUserInfo(ele.participant));
                participants.push({
                    _id: ele.participant,
                    participantId: ele._id,
                    createdAt: ele.createdAt
                });
            });
        }

        axios.all(getUsersPromises)
            .then(responses => {

                responses.forEach(ele => {
                    participants.forEach((participant, i) => {
                        if (ele.data._id === participant._id) {
                            participants[i] = {
                                ...participant,
                                ...ele.data
                            };
                        }
                    });
                });

                this.setState({
                    isLoaded: true,
                    participants
                });
            });
    }

    searchUserInfo = async id => {
        const url = `${API_PREFIX}/${GROUP_ID}${URL_USERS}/${id}`;
        const res = await axios.get(url);
        return res;
    }

    componentDidMount() {
        this.searchApplier();
    }

    handleApply = async () => {
        const url = `${API_PREFIX}/${GROUP_ID}${URL_EVENTS}/${this.props.eventId}${URL_PARTICIPATIONS}`;
        const res = await axios.post(url);
        this.setState({
            isLoaded: true
        });
        this.searchApplier();
    };

    handleCancel = async () => {

        const { account } = this.props;
        // @ts-ignore
        const { participants } = this.state;

        const participation = participants.find(ele => ele._id === account._id);
        const participantId = participation.participantId;
        const url = `${API_PREFIX}/${GROUP_ID}${URL_EVENTS}/${this.props.eventId}${URL_PARTICIPATIONS}/${participantId}`;
        const res = await axios.delete(url);
        this.setState({
            isLoaded: true
        });
        this.searchApplier();
    };

    // TODO : 참여신청여부에 따라 신청하기/취소하기로 변경
    // TODO : 취소기능 추가
    render() {

        const { classes, account } = this.props;
        // @ts-ignore
        const { participants } = this.state;
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
