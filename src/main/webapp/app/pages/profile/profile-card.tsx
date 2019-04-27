import React, { createRef } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { createStyles, withStyles } from '@material-ui/core/styles';
import ProfileDialog from 'app/pages/profile/profile-dialog';

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

export interface IProfileCardState {
    src: any;
    img: any;
    open: boolean;
}

export class ProfileCard extends React.Component<IProfileCardProp, IProfileCardState> {

    private readonly selectFileRef = createRef<HTMLInputElement>();

    state: IProfileCardState = {
        src: null,
        img: null,
        open: false
    };

    onSelectFile = e => {
        // TODO 최대파일 사이즈 체크
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () =>
                this.setState({
                    src: reader.result,
                    open: true
                })
            );
            reader.readAsDataURL(e.target.files[ 0 ]);
        }
    };

    onClick = () => {
        console.log('onClick');
        this.selectFileRef.current.click();
    };

    onClose = () => {
        console.log('onClose');
        this.setState({ open: false });
    };

    saveCroppedImg = croppedImg => {
        this.setState({ open: false, img: croppedImg });
    };

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Card className={ classes.card }>
                    <div>
                        <div className={ classes.imgContainer }>
                            <img src={ this.state.img }
                                 height="200px"
                                 width="200px"
                                 alt="Cropped"
                                 className={ classes.avatar }/>
                        </div>
                        <input type="file" ref={ this.selectFileRef } onChange={ this.onSelectFile }
                               style={ { display: 'none' } }/>
                        <Button
                            onClick={ this.onClick }
                            variant="contained"
                            color="primary"
                            className={ classes.button }
                        > +수정하기
                        </Button>
                        <ProfileDialog classes={ classes } onClose={ this.onClose }
                                       open={ this.state.open } src={ this.state.src }
                                       saveCroppedImg={ this.saveCroppedImg }
                        />
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
        )
            ;
    }
}

export default withStyles(styles)(ProfileCard);
