import React, { createRef } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { createStyles, withStyles } from '@material-ui/core/styles';
import ProfileDialog from 'app/pages/profile/profile-dialog';
import { getSession, updateUser } from 'app/shared/reducers/authentication';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';

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
        },
        textField: {
            marginLeft: theme.spacing.unit,
            marginRight: theme.spacing.unit
        }
    });

export interface IProfileCardProp extends StateProps, DispatchProps {
    classes?: any;
}

export interface IProfileCardState {
    src: any;
    img: any;
    open: boolean;
    name: string;
    email: string;
}

export class ProfileCard extends React.Component<IProfileCardProp, IProfileCardState> {

    private readonly selectFileRef = createRef<HTMLInputElement>();

    state: IProfileCardState = {
        src: null,
        img: null,
        open: false,
        name: '',
        email: ''
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

    handleSelectFile = () => {
        this.selectFileRef.current.click();
    };

    onClose = () => {
        this.setState({ open: false });
    };

    saveCroppedImg = croppedImg => {
        this.setState({ open: false, img: croppedImg });
    };

    handleUpdateProfile = () => {
        const { account } = this.props;
        this.props.updateUser('1', account.id, this.state.name, account.status, account.role);
    };

    handleNameChange = e => {
        this.setState({ name: e.target.value });
    };

    handleEmailChange = e => {
        this.setState({ email: e.target.value });
    };

    render() {
        const { classes, account } = this.props;
        const emailDisable = true;
        return (
            <React.Fragment>
                <Card className={ classes.card }>
                    <div>
                        <div className={ classes.imgContainer }>
                            <img src={ this.state.img ? this.state.img : account.thumbnail }
                                 height="200px"
                                 width="200px"
                                 alt="Cropped"
                                 className={ classes.avatar }/>
                        </div>
                        <input type="file" ref={ this.selectFileRef } onChange={ this.onSelectFile }
                               style={ { display: 'none' } }/>
                        <Button
                            onClick={ this.handleSelectFile }
                            variant="contained"
                            color="primary"
                            className={ classes.button }
                        > +수정하기
                        </Button>
                        <ProfileDialog onClose={ this.onClose }
                                       open={ this.state.open } src={ this.state.src }
                                       saveCroppedImg={ this.saveCroppedImg }
                        />
                    </div>
                    <div className={ classes.details }>
                        <CardContent className={ classes.content }>
                            <div>
                                <TextField
                                    required
                                    id="name"
                                    label="이름"
                                    defaultValue={ account.name }
                                    className={ classes.textField }
                                    onChange={ this.handleNameChange }
                                    margin="normal"
                                    variant="outlined"
                                />
                                <Button color="secondary" onClick={ this.handleUpdateProfile }
                                        style={ { fontSize: 10 } }
                                        className={ classes.button }>프로파일 정보수정</Button>
                            </div>
                            <div>
                                <TextField
                                    required
                                    id="email"
                                    disabled={ emailDisable }
                                    label="이메일"
                                    defaultValue={ account.email }
                                    onChange={ this.handleEmailChange }
                                    className={ classes.textField }
                                    margin="normal"
                                    variant="outlined"
                                />
                            </div>
                        </CardContent>
                    </div>
                </Card>
            </React.Fragment>
        );
    }
}

const mapStateToProps = storeState => ({
    account: storeState.authentication.account,
    isAuthenticated: storeState.authentication.isAuthenticated
});

const mapDispatchToProps = { getSession, updateUser };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(ProfileCard));
