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
import { API_PREFIX, URL_AGGS_PARTICIPATIONS } from 'app/config/constants';
import axios from 'axios';
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

export interface IRankerListProp {
    classes: any;
    title: string;
    range: {
        startDate: string,
        endDate: string
    };
}

export interface IRankerListState {
    error: any;
    isLoaded: boolean;
    items: any;
}

export class RankerList extends React.Component<IRankerListProp, IRankerListState> {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    search = async () => {
        const { range } = this.props;
        const url = API_PREFIX + URL_AGGS_PARTICIPATIONS;
        const config = range ? { params: { startDate: range.startDate, endDate: range.endDate } } : null;
        const res = await axios.get(url, config);

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
        const { classes, title, range } = this.props;

        const { error, isLoaded, items } = this.state;

        // console.log(items);

        if (error) {
            return <div>Error: { error.message }</div>;
        } else if (!isLoaded) {
            return (
                <Card>
                    <CardHeader
                        title={ title }
                    />
                    <CardContent>
                        <Table className={ classes.table }>
                            <TableHead>
                                <TableRow>
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
                        title={ title }
                    />
                    <CardContent>
                        <Table className={ classes.table }>
                            <TableHead>
                                { _.isEmpty(items) ? (<TableRow><TableCell/></TableRow>) : (
                                    <TableRow>
                                        <TableCell />
                                        <TableCell align="right">이름</TableCell>
                                        <TableCell align="right">보상</TableCell>
                                        <TableCell align="right">참여 수</TableCell>
                                    </TableRow>
                                ) }
                            </TableHead>
                            <TableBody>
                                { _.isEmpty(items) ? (<TableRow><TableCell align="center">데이터가 없습니다.</TableCell></TableRow>) : items.map((row, i) => (
                                    <TableRow key={ range + row[ '_id' ] + i }>
                                        <TableCell component="th" scope="row">#{ row[ '_id' ] }</TableCell>
                                        <TableCell align="right">{ row.name }</TableCell>
                                        <TableCell align="right">{ row.tokens }</TableCell>
                                        <TableCell align="right">{ row.countOfPartipations }</TableCell>
                                    </TableRow>
                                )) }
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            );
        }
    }
}

export default withStyles(styles)(RankerList);
