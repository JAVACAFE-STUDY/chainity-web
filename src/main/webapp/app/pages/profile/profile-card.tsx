import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { createStyles, withStyles } from '@material-ui/core/styles';

const styles = theme =>
    createStyles({
        card: {
            display: 'flex'
        },
        details: {
            display: 'flex',
            flexDirection: 'column'
        },
        content: {
            flex: '1 0 auto',
            textAlign: 'left'
        },
        cover: {
            width: 151
        },
        button: {
            margin: theme.spacing.unit
        },
        avatar: {
            width: '100px',
            height: '100px',
            color: '#fff'
        }
    });

export interface IProfileCardProp {
    classes: any;
}

export class ProfileCard extends React.Component<IProfileCardProp> {
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Card className={ classes.card }>
                    <div>
                        <div className={ classes.avatar }>test</div>
                        <Button color="secondary" style={ { fontSize: 10 } }
                                className={ classes.button }>+수정하기</Button>
                    </div>
                    <div className={ classes.details }>
                        <CardContent className={ classes.content }>
                            <Typography component="h5" variant="h5">
                                안경섭
                                <Button color="secondary" style={ { fontSize: 10 } }
                                        className={ classes.button }>+수정</Button>
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                                이메일
                            </Typography>
                            <Typography variant="subtitle1">
                                email@javacafe.co.kr
                            </Typography>
                        </CardContent>
                    </div>
                </Card>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(ProfileCard);
