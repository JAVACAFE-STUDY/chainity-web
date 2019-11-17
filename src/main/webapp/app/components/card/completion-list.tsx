import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { API_PREFIX, GROUP_ID, URL_EVENTS, URL_REWARDS, URL_USERS } from 'app/config/constants';
import axios from 'axios';
import _ from "lodash";

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: 'inline'
  }
});

export interface IHomeCardProp {
    classes?: any;
    eventId: string;
    rewards: any;
    rewardedUsers: any;
}

export class CompletionList extends React.Component<IHomeCardProp> {

    constructor(props) {
        super(props);
        this.state = {
            error: null
        };
    }

    render() {
        const { classes, rewardedUsers } = this.props;


        // @ts-ignore
        return (
            <Card>
                <CardHeader
                    title="참여완료"
                />
                <CardContent>
                    <List className={classes.root}>
                        {
                            rewardedUsers && rewardedUsers.length > 0 ? rewardedUsers.map((rewardedUser, i) => (
                                <ListItem key={i} alignItems="flex-start">
                                    <ListItemAvatar>
                                        { !_.isEmpty(rewardedUser.avatar) ? <Avatar src={ rewardedUser.avatar }>{ rewardedUser.name }</Avatar>
                                            : <Avatar>H</Avatar> }
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={rewardedUser.name}
                                        secondary={
                                            <React.Fragment>
                                                <Typography component="span" className={ classes.inline } color="textPrimary">
                                                    {rewardedUser.createdAt.substr(0, 10)}
                                                </Typography>
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                                )
                            ) : (
                                <ListItem alignItems="flex-start">
                                    참여자가 없습니다.
                                </ListItem>
                            )
                        }
                    </List>
                </CardContent>
            </Card>
        );
    }
}

export default withStyles(styles)(CompletionList);
