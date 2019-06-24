import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { createStyles, withStyles } from '@material-ui/core/styles';
import { getEventRewardsByUser } from 'app/pages/events/event.reducer';
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

export interface IProfileRewardListProp extends StateProps, DispatchProps {
    classes?: any;
    userId: string;
}

export interface IProfileRewardListState {
    error: any;
    isLoaded: boolean;
}

export class ProfileRewardList extends React.Component<IProfileRewardListProp, IProfileRewardListState> {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false
        };
    }

    componentDidMount() {
        const { userId } = this.props;
        if (!_.isEmpty(userId)) {
            this.props.getEventRewardsByUser('1', userId);
        }
    }

    render() {
        const { classes, userRewards } = this.props;

        const txUrl = 'https://rinkeby.etherscan.io/tx';
        let tableBody;

        if (userRewards.totalDocs === 0) {
            // TODO table row merge and paging
            return (
                <Card>
                    <CardHeader
                        title="보상 내역"
                    />
                    <CardContent>
                        데이터가 없습니다.
                    </CardContent>
                </Card>
            );
        } else {
            tableBody = (<TableBody>
                { userRewards.docs.map(row => (
                    <TableRow key={ row[ '_id' ] }>
                        <TableCell component="th" scope="row"> <Link to={ `/event/detail/${row._id}` } className="alert-link">{ row._id }</Link></TableCell>
                        <TableCell align="right">{ row.tokens }</TableCell>
                        <TableCell align="right">{ row.createdAt }</TableCell>
                        <TableCell align="right"> <Link to={ `${txUrl}/${row.tx}` } className="alert-link">상세보기</Link></TableCell>
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
                                <TableCell align="right">이벤트</TableCell>
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
    }
}

const mapStateToProps = storeState => ({
    userRewards: storeState.event.userRewards
});

const mapDispatchToProps = { getEventRewardsByUser };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(ProfileRewardList));
