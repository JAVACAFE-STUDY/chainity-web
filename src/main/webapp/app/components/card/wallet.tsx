import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper
    },
    subtitle: {
        'margin-top': '5px'
    }
});

export interface IWalletCardProp {
    classes?: any;
    user: any;
}

export class Wallet extends React.Component<IWalletCardProp> {
    render() {

        const { user, classes } = this.props;
        const keyStore = user.keyStore;
        const tokens = !_.isEmpty(user.tokens) ? user.tokens : 0;

        return (
            <Card style={ { textAlign: 'left' } }>
                <CardHeader title="지갑"/>
                <CardActions>
                    <CardContent style={ { marginLeft: 10, overflow: 'hidden' } }>
                        <Typography variant="subtitle1" className={classes.subtitle} component="p" color="textSecondary">
                            주소
                        </Typography>
                        <Typography component="p">
                            { keyStore && keyStore.address }
                        </Typography>
                        <Typography variant="subtitle1" className={classes.subtitle} component="p" color="textSecondary">
                            토큰
                        </Typography>
                        <Typography component="p">
                            { tokens }
                        </Typography>
                    </CardContent>
                </CardActions>
            </Card>
        );
    }
}

export default withStyles(styles)(Wallet);
