import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { createStyles, withStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions/CardActions';
import CardHeader from '@material-ui/core/CardHeader/CardHeader';

const styles = createStyles({
    card: {
        minWidth: 275
    },
    title: {
        fontSize: 14
    },
    pos: {
        marginBottom: 12
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

export class Events extends React.Component<IHomeCardProp> {
    render() {
        const { classes } = this.props;
        return (
            <Card>
                <CardHeader title="이벤트"/>
                <CardActions className={ classes.text }>
                    <CardContent className={ classes.margin }>
                        <Typography color="textSecondary" component="p">
                            첨여
                        </Typography>
                        <Typography component="p">
                            { '13' }
                        </Typography>
                    </CardContent>
                </CardActions>
            </Card>
        );
    }
}

export default withStyles(styles)(Events);
