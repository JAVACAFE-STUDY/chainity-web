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

export interface IRewardListProp {
    classes?: any;
    items: any;
}

export interface IRewardListState {
    error: any;
    isLoaded: boolean;
}

export class RewardList extends React.Component<IRewardListProp, IRewardListState> {
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
    }

    render() {
        const { classes, items } = this.props;
        const { error, isLoaded } = this.state;

        // TODO 에러처리
        // if (error) {
        //     return <div>Error: { error.message }</div>;
        // } else if (!isLoaded) {
        //     return <div>Loading...</div>;
        // } else {
        let tableBody;

        if (_.isEmpty(items)) {
            return (<Card>
                <CardHeader
                    title="보상 내역"
                />
                <CardContent>
                    데이터가 없습니다.
                </CardContent>
            </Card>);
        } else {
            tableBody = (<TableBody>
                { items.docs.map(row => (
                    <TableRow key={ row[ '_id' ] }>
                        <TableCell component="th" scope="row">{ row.rewardedUser }</TableCell>
                        <TableCell align="right">{ row.tokens }</TableCell>
                        <TableCell align="right">{ row.createdAt }</TableCell>
                        <TableCell align="right">{ row.tx }</TableCell>
                    </TableRow>
                )) }
            </TableBody>);
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
                        { tableBody }
                    </Table>
                </CardContent>
            </Card>
        );
        // }
    }
}

export default withStyles(styles)(RewardList);
