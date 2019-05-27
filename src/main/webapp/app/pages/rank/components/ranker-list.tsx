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
import { API_SERVER_URL } from 'app/config/constants';
import axios from 'axios';
const URL_GET_REWARDS = process.env.URL_GET_REWARDS;

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

  search = async () => {
    // @ts-ignore
    const { range } = this.props;
    const url = API_SERVER_URL + URL_GET_REWARDS;
    // const url = 'http://localhost:8090/groups/1/rewards';

    const res = await axios.get(url, {
      params: {
        range
      }
    });

    this.setState({
      isLoaded: true,
      items: res.data.docs
    });
  };

  componentDidMount() {

    this.search();

    // @ts-ignore
    // const { range } = this.props;
    // const url = API_SERVER_URL + URL_GET_REWARDS;
    // const url = 'http://localhost:8090/groups/1/rewards';

    /*
    fetch(`${url}?range=${range}`)
      .then(response => response.json())
      .then(json => {
          console.log('######', JSON.stringify(json));
          this.setState({
            isLoaded: true,
            items: json.docs
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
    */
  }

  render() {
    // @ts-ignore
    const { classes, title, range } = this.props;

    // @ts-ignore
    const { error, isLoaded, items } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
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
                <TableRow>
                  <TableCell align="right">Loading...</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      );
    } else {
      return (
        <Card>
          <CardHeader
            title={title}
          />
          <CardContent>
            <Table className={classes.table}>
              <TableHead>
                { items.length < 1 ? (<TableRow><TableCell /></TableRow>) : (
                  <TableRow>
                    <TableCell />
                    <TableCell align="right" />
                    <TableCell align="right" />
                    <TableCell align="right">참여 수</TableCell>
                  </TableRow>
                )}
              </TableHead>
              <TableBody>
                { items.length < 1 ? (<TableRow><TableCell align="center">데이터가 없습니다.</TableCell></TableRow>) : items.map((row, i) => (
                  <TableRow key={range + row['_id'] + i}>
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
