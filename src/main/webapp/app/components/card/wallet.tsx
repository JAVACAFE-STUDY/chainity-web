import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper
    },
    inline: {
        display: 'inline'
    },
    text: {
        textAlign: 'left'
    },
    margin: {
        marginLeft: 10
    }
});

export interface IHomeCardProp {
    classes: any;
}

export class Wallet extends React.Component<IHomeCardProp> {
    render() {
        const { classes } = this.props;
        return (
            <Card className={ classes.text }>
                <CardHeader title="지갑"/>
                <CardActions>
                    <CardContent className={ classes.margin }>
                        <Typography color="textSecondary" component="p">
                            주소
                        </Typography>
                        <Typography component="p">
                            { '0x7bf53cf03d0j3f8dd' }
                        </Typography>
                        <Typography color="textSecondary" component="p">
                            토큰
                        </Typography>
                        <Typography component="p">
                            { '300,000' }
                        </Typography>
                    </CardContent>
                </CardActions>
            </Card>
        );
    }
}

export default withStyles(styles)(Wallet);
