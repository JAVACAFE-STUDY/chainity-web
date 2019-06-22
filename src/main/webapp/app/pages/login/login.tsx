import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import classNames from 'classnames';
import { IRootState } from 'app/shared/reducers';
import { login } from 'app/shared/reducers/authentication';
import {
    Button,
    createStyles,
    CssBaseline,
    FormControl,
    Input,
    InputLabel,
    Paper,
    Typography,
    WithStyles,
    withStyles
} from '@material-ui/core';

export interface ILoginProps extends StateProps, DispatchProps, RouteComponentProps<{}>, WithStyles {
}

interface ILoginState {
    userName: string;
    password: string;
}

const styles = theme => createStyles({
    main: {
        width: 'auto',
        display: 'block',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [ theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2) ]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto'
        }
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: '100%',
        marginTop: theme.spacing.unit
    },
    submit: {
        marginTop: theme.spacing.unit * 3
    },
    errorMessage: {
        height: '30px',
        marginTop: '20px'
    },
    logo: {
        height: '60px',
        marginBottom: '5px'
    },
    input: {
        cursor: 'not-allowed'
    }
});

class Login extends React.Component<ILoginProps, ILoginState> {
    state: ILoginState = {
        userName: '',
        password: ''
    };

    constructor(props: ILoginProps) {
        super(props);

        const { loginSuccess } = props;
        if (loginSuccess) {
            this.props.history.push('/event');
        }
    }

    handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        this.login();
    };

    login = async () => {
        await this.props.login(this.state.userName, this.state.password);

        if (this.props.loginSuccess) {
            this.props.history.push('/event');
        }
    };

    changeUserName = e => {
        this.setState({
            userName: e.target.value.trim()
        });
    };

    enterPassword = (e: React.KeyboardEvent) => {
        if (e.key.toUpperCase() === 'ENTER') {
            this.login();
        }
    };

    changePassword = e => {
        this.setState({
            password: e.target.value.trim()
        });
    };

    render() {
        const { classes } = this.props;
        const hostname = window.location.host;

        return (
            <main className={ classes.main }>
                <CssBaseline/>
                <Paper className={classes.paper}>
                    <img src={ '/content/images/logo.png' } className={ classes.logo }/>
                    <Typography component="h1" variant="h5">자바카페에 로그인</Typography>
                    <Typography component="h1" variant="h5">{hostname}</Typography>
                    <form className={classes.form}
                          onSubmit={ this.handleSubmit }
                    >
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="user-id">유저ID</InputLabel>
                            <Input
                                id="user-id"
                                name="user-id"
                                placeholder="유저ID( Email )"
                                className={ classNames(classes.input) }
                                onChange={ this.changeUserName }
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="user-password">패스워드</InputLabel>
                            <Input
                                id="user-password"
                                placeholder="패스워드"
                                type="password"
                                className={ classNames(classes.input) }
                                onKeyDown={ this.enterPassword }
                                onChange={ this.changePassword }
                            />
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={ classNames(classes.submit) }
                        >로그인
                        </Button>
                        <Typography className={ classNames(classes.errorMessage) }>
                            { this.props.errorMessage }
                        </Typography>
                    </form>
                </Paper>
            </main>
        );
    }
}

const mapStateToProps = ({ authentication }: IRootState) => ({
    loginError: authentication.loginError,
    loginSuccess: authentication.loginSuccess,
    errorMessage: authentication.errorMessage
});

const mapDispatchToProps = { login };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles, { withTheme: true })(Login));
