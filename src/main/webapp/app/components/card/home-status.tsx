import React from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { getSession } from 'app/shared/reducers/authentication';
import { getGroup } from 'app/pages/group/groups.reducer';

const styles = {
    card: {
        minWidth: 275
    },
    title: {
        fontSize: 14
    },
    pos: {
        marginBottom: 12
    }
};

export interface IHomeStatusProp extends StateProps, DispatchProps {
    classes?: any;
}

export class HomeStatus extends React.Component<IHomeStatusProp> {

    componentDidMount() {
        this.props.getGroup('1');
    }

    render() {
        const { classes, group } = this.props;
        console.log('group  => ', group);
        return (
            <Card>
                <CardContent>
                    <Typography variant="h5" component="h2" color="textSecondary" gutterBottom>
                        JAVACAFE 상태
                    </Typography>
                    <Typography component="p">
                        총 토큰 발생
                        <br/>
                        { '560' }
                    </Typography>
                    <Typography component="p">
                        토큰 보상
                        <br/>
                        { '160' }
                    </Typography>
                    <Typography component="p">
                        사용자 수<br/>
                        { '460' }
                    </Typography>
                    <Typography component="p">
                        이벤트 수<br/>
                        { '60' }
                    </Typography>
                    <Typography component="p">
                        참여 수<br/>
                        { '260' }
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}

const mapStateToProps = storeState => ({
    group: storeState.groups.group
});

const mapDispatchToProps = { getSession, getGroup };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HomeStatus));
