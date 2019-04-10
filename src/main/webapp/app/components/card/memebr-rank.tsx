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
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

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
    classes: any;
}

export class MemberRank extends React.Component<IHomeCardProp> {
    render() {
        const { classes } = this.props;
        return (
            <Card>
                <CardActions>
                    <Grid container>
                        <Grid item sm={8}>
                            <p>이달의 멤버</p>
                        </Grid>
                        <Grid item sm={4}>
                            <Link to={ '/rank' }>더보기</Link>
                        </Grid>
                    </Grid>
                </CardActions>
                <CardContent>
                    <List className={ classes.root }>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar>H</Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary="홍길동"
                                secondary={
                                    <React.Fragment>
                                        <Typography component="span" className={ classes.inline } color="textPrimary">
                                            금액
                                        </Typography>
                                        { ' 1000 ' }
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar>K</Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary="고길동"
                                secondary={
                                    <React.Fragment>
                                        <Typography component="span" className={ classes.inline } color="textPrimary">
                                            금액
                                        </Typography>
                                        { ' 2000 ' }
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar>Y</Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary="연신"
                                secondary={
                                    <React.Fragment>
                                        <Typography component="span" className={ classes.inline } color="textPrimary">
                                            금액
                                        </Typography>
                                        { ' 5000 ' }
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                    </List>
                </CardContent>
            </Card>
        );
    }
}

export default withStyles(styles)(MemberRank);
