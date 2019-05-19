import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { createStyles, withStyles } from '@material-ui/core/styles';
import _ from 'lodash';

const styles = theme => createStyles({
    root: {
        width: '100%',
        maxWidth: 500,
        backgroundColor: theme.palette.background.paper,
        overflowX: 'auto'
    },
    inline: {
        display: 'inline'
    }
});

let id = 0;

function createData(name, calories, fat, carbs, protein) {
    id += 1;
    return { id, name, calories, fat, carbs, protein };
}


/*
const rewardListItem = classes => {
  let a = 1;
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
};
*/

export interface IHomeCardProp {
    classes: any;
    items: any;
}

export class RewardList extends React.Component<IHomeCardProp> {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false
        };
    }

    componentDidMount() {
        // @ts-ignore
        const { eventId } = this.props;

        // fetch(`http://localhost:8090/groups/1/users/${eventId}/rewards`, { mode: 'cors' })
        //     .then(response => response.json())
        //     .then(json => {
        //             this.setState({
        //                 isLoaded: true,
        //                 items: json
        //             });
        //         },
        //         // Note: it's important to handle errors here
        //         // instead of a catch() block so that we don't swallow
        //         // exceptions from actual bugs in components.
        //         error => {
        //             this.setState({
        //                 isLoaded: true,
        //                 error
        //             });
        //         }
        //     );
    }

    render() {
        const { classes, items } = this.props;

        console.log(items);

        // @ts-ignore
        const { error, isLoaded } = this.state;

        // if (error) {
        //     return <div>Error: { error.message }</div>;
        // } else if (!isLoaded) {
        //     return <div>Loading...</div>;
        // } else {
        if (_.isEmpty(items)) {
            return '';
        }
        return (
            <Card>
                <CardHeader
                    title="보상 내역"
                />
                <CardContent>
                    <Table className={ classes.table }>
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">이름</TableCell>
                                <TableCell align="right">보상금</TableCell>
                                <TableCell align="right">일시</TableCell>
                                <TableCell align="right">원장 기록</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { items.docs.map(row => (
                                <TableRow key={ row[ '_id' ] }>
                                    <TableCell component="th" scope="row">{ row.rewardedUser }</TableCell>
                                    <TableCell align="right">{ row.tokens }</TableCell>
                                    <TableCell align="right">{ row.createdAt }</TableCell>
                                    <TableCell align="right">{ row.tx }</TableCell>
                                </TableRow>
                            )) }
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        );
        //}
    }
}

export default withStyles(styles)(RewardList);
