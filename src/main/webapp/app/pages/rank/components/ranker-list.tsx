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

export interface IHomeCardProp {
  classes: any;
}

export class RankerList extends React.Component<IHomeCardProp> {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    // @ts-ignore
    const { range } = this.props;
    fetch(`http://localhost:8090/groups/1/rewards?range=${range}`)
      .then(response => response.json())
      .then(json => {
          this.setState({
            isLoaded: true,
            items: json
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  render() {
    // @ts-ignore
    const { classes, title } = this.props;

    // @ts-ignore
    const { error, isLoaded, items } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <Card>
          <CardHeader
            title={title}
          />
          <CardContent>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell align="right" />
                  <TableCell align="right" />
                  <TableCell align="right">참여 수</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.docs.map(row => (
                  <TableRow key={row['_id']}>
                    <TableCell component="th" scope="row">#{row['_id']}</TableCell>
                    <TableCell align="right">{row.rewardedUser}</TableCell>
                    <TableCell align="right">{row.tokens}</TableCell>
                    <TableCell align="right">{row.event.length}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      );
    }
  }
}

export default withStyles(styles)(RankerList);
