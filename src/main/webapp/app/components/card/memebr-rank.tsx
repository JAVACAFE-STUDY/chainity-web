import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { BlurCircular } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';

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

export interface IMemberRankProp {
    classes?: any;
    members: any;
}

export class MemberRank extends React.Component<IMemberRankProp> {

    render() {
        const { classes, members } = this.props;

        let membersTemp = [];

        if (_.isArray(members)) {
            // TODO 전달되는 데이터가 없어 임시로 리스트 생성, members 만 사용하도록 변경할 것
            membersTemp = _.clone(members);
            membersTemp.push({
                'name': '테스트',
                'avatar': '',
                'tokens': '2000'
            });
        }

        return (
            <Card>
                <CardActions>
                    <Grid container>
                        <Grid item sm={ 8 }>
                            <p>이달의 멤버</p>
                        </Grid>
                        <Grid item sm={ 4 }>
                            <Link to={ '/rank' }>더보기</Link>
                        </Grid>
                    </Grid>
                </CardActions>
                <CardContent>
                    { !_.isEmpty(membersTemp)
                        ? membersTemp.map((member, idx) => (
                            <List key={ idx } className={ classes.root }>
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        { !_.isEmpty(member.avatar) ? <Avatar src={ member.avatar }>{ member.name }</Avatar>
                                            : <Avatar>G</Avatar> }
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={ member.name }
                                        secondary={
                                            <React.Fragment>
                                                <Typography component="span" className={ classes.inline } color="textPrimary">
                                                    <BlurCircular style={ { color: '#FFF42F' } }/>
                                                </Typography>
                                                { member.tokens }
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                            </List>
                        )) : (<Typography className={ classes.root } color="textSecondary" gutterBottom>
                            이달의 멤버정보가 없습니다.
                        </Typography>)
                    }
                </CardContent>
            </Card>
        );
    }
}

export default withStyles(styles)(MemberRank);
