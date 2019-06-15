import React from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { getSession } from 'app/shared/reducers/authentication';
import { getGroup } from 'app/pages/group/groups.reducer';
import { getEventParticipations, getEvents } from 'app/pages/events/event.reducer';
import { getUsers } from 'app/pages/users/users.reducer';
import _ from 'lodash';
import { Link } from 'react-router-dom';

const styles = {
    card: {
        minWidth: 275
    },
    title: {
        fontSize: 14
    },
    pos: {
        marginBottom: 12
    },
    logo: {
        height: '50px'
    },
    subtitle: {
        'margin-top': '5px'
    }
};

export interface IHomeStatusProp extends StateProps, DispatchProps {
    classes?: any;
}

export class HomeStatus extends React.Component<IHomeStatusProp> {

    componentDidMount() {
        this.props.getGroup('1');
        this.props.getEvents('1');
        this.props.getUsers('1');
    }

    render() {
        const { classes, group, events, participations, users } = this.props;
        console.log('group, events, participations, users  => ', group, events, participations, users);
        let initialTokens = 0;
        let usedTokens = 0;
        let name = '';

        if (!_.isEmpty(group)) {
            // TODO initialTokens 값은 api 에서 전달되는 값 수정필요. ( number 가 아닌 hash 값이 전달됨)
            // initialTokens = group.initialTokens;
            initialTokens = 0;
            usedTokens = group.usedTokens;
            name = group.name;
        }
        return (
            <Card>
                <CardContent>
                    <Typography variant="h5" component="h2" color="textSecondary" gutterBottom>
                      <img src={ '/content/images/logo.png' } className={ classes.logo } /> { name } 상태
                    </Typography>
                    <Typography variant="subtitle1" className={classes.subtitle} component="p" color="textSecondary">
                        총 토큰 발생
                    </Typography>
                    <Typography component="p">
                        { initialTokens }
                    </Typography>
                    <Typography variant="subtitle1" className={classes.subtitle} component="p" color="textSecondary">
                        토큰 보상
                    </Typography>
                    <Typography component="p">
                        { usedTokens }
                    </Typography>
                    <Typography variant="subtitle1" className={classes.subtitle}component="p" color="textSecondary">
                        사용자 수
                    </Typography>
                    <Typography component="p">
                        { users.totalDocs }
                    </Typography>
                    <Typography variant="subtitle1" className={classes.subtitle} component="p" color="textSecondary">
                        이벤트 수
                    </Typography>
                    <Typography component="p">
                        { events.totalDocs }
                    </Typography>
                    <Typography variant="subtitle1" className={classes.subtitle} component="p" color="textSecondary">
                        참여 수
                    </Typography>
                    <Typography component="p">
                        { participations.length }
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}

const mapStateToProps = storeState => ({
    group: storeState.groups.group,
    events: storeState.event.events,
    participations: storeState.event.participations,
    users: storeState.users.data
});

const mapDispatchToProps = { getSession, getGroup, getEvents, getEventParticipations, getUsers };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HomeStatus));
