import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles, createStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions/CardActions';
import Button from '@material-ui/core/Button/Button';
import List from '@material-ui/core/List/List';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar/Avatar';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import CardHeader from '@material-ui/core/CardHeader/CardHeader';

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

export interface IHomeCardProp {
  classes: any;
}

export class HomeStatus extends React.Component<IHomeCardProp> {
  render() {
    const { classes } = this.props;
    return (
      <Card>
        <CardHeader
          title="참여신청"
          action={
            <Button size="small">더보기</Button>
          }
        />
        <CardContent>
          <List className={classes.root}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar>H</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="홍길동"
                secondary={
                  <React.Fragment>
                    <Typography component="span" className={classes.inline} color="textPrimary">
                      금액
                    </Typography>
                    {' 1000 '}
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
                    <Typography component="span" className={classes.inline} color="textPrimary">
                      금액
                    </Typography>
                    {' 2000 '}
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
                    <Typography component="span" className={classes.inline} color="textPrimary">
                      금액
                    </Typography>
                    {' 5000 '}
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

export default withStyles(styles)(HomeStatus);
