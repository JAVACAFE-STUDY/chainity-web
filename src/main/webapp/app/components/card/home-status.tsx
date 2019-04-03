import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles, createStyles } from '@material-ui/core/styles';

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
    }
});

export interface IHomeCardProp {
    classes: any;
}

export class HomeStatus extends React.Component<IHomeCardProp> {
    render() {
        const { classes } = this.props;
        return (
            <Card>
                <CardContent className={ classes.text }>
                    <Typography className={ classes.title } color="textSecondary" gutterBottom>
                        JAVACAFE 상태
                    </Typography>
                    <Typography variant="h5" component="h2">
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

export default withStyles(styles)(HomeStatus);
