import './rank.css';

import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { getSession } from 'app/shared/reducers/authentication';
import { withStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import RankerList from './components/ranker-list';

let id = 0;

function createData(name, calories, fat, carbs, protein) {
    id += 1;
    return { id, name, calories, fat, carbs, protein };
}

const styles = theme =>
    createStyles({
        root: {
            flexGrow: 1
        },
        paper: {
            padding: theme.spacing.unit * 2,
            textAlign: 'center',
            color: theme.palette.text.secondary
        }
    });

type SearchRange = 'month' | 'total';

const mainLeftContent = classes => {
    const title = '이번 달 랭킹';
    const range: SearchRange = 'month';

    return (
        <Paper className={ classes.paper }>
            <Typography color="textSecondary" variant="h1">
                <RankerList title={ title } range={ range }/>
            </Typography>
        </Paper>
    );
};

const mainRightContent = classes => {
    const title = '전체 랭킹';
    const range: SearchRange = 'total';

    return (
        <Paper className={ classes.paper }>
            <Typography color="textSecondary" variant="h1">
                <RankerList title={ title } range={ range }/>
            </Typography>
        </Paper>
    );
};

const gridContainer = (classes, leftXs, rightXs) => (
    <Grid container spacing={ 24 }>
        <Grid item xs={ leftXs }>
            { mainLeftContent(classes) }
        </Grid>
        <Grid item xs={ rightXs }>
            { mainRightContent(classes) }
        </Grid>
    </Grid>
);

export interface IHomeProp extends StateProps, DispatchProps {
    classes: any;
}

export class EventPage extends React.Component<IHomeProp> {
    componentDidMount() {
        this.props.getSession('email');
    }

    render() {
        const { account, classes } = this.props;
        return (
            <div>
                { gridContainer(classes, 6, 6) }
            </div>
        );
    }
}

const mapStateToProps = storeState => ({
    account: storeState.authentication.account,
    isAuthenticated: storeState.authentication.isAuthenticated
});

const mapDispatchToProps = { getSession };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(EventPage));
