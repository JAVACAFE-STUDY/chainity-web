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
import axios from 'axios';
import { API_PREFIX, GROUP_ID, URL_EVENTS, URL_PARTICIPATIONS, URL_USERS } from 'app/config/constants';
import { convertDateYMDHMS, dateFormatYMDHMS } from 'app/shared/util/date-utils';

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
    rewards: any;
    rewardedUsers: any;
}

export interface IRewardListState {
    error: any;
    isLoaded: boolean;
    rewards: any;
}

export class RewardList extends React.Component<IRewardListProp, IRewardListState> {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            rewards: []
        };
    }

    render() {
        const { classes, rewardedUsers } = this.props;
        const { error, isLoaded } = this.state;

        // TODO 에러처리
        // if (error) {
        //     return <div>Error: { error.message }</div>;
        // } else if (!isLoaded) {
        //     return <div>Loading...</div>;
        // } else {
        let tableBody;
        if (_.isEmpty(rewardedUsers)) {
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
                { rewardedUsers && Array.isArray(rewardedUsers) && rewardedUsers.length > 0 && rewardedUsers.map((row, i) => (
                    <TableRow key={i}>
                        <TableCell component="th" scope="row">{ row.name }</TableCell>
                        <TableCell align="right">{ row.rewardToken }</TableCell>
                        <TableCell align="right">{ dateFormatYMDHMS(new Date(row.createdAt)) }</TableCell>
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
