import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import classNames from 'classnames';
import { IRootState } from 'app/shared/reducers';
import { login } from 'app/shared/reducers/authentication';
import { Card, createStyles, WithStyles, withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';

export interface ILoginProps extends StateProps, DispatchProps, RouteComponentProps<{}>, WithStyles {
}

interface ILoginState {
    userName: string;
    password: string;
}

const styles = () => createStyles({
    form: {
        minWidth: '600px',
        textAlign: 'center'
    },
    loginHeader: {
        'margin': '25px 0 0 0',
        'display': 'inline-block',
        'text-align': 'left',
        'border-left': '3px solid',
        'padding-left': '35px',
        'width': '100%',
        'font-weight': '200',
        'color': '#ED2553',
        'font-size': '40px'
    },
    loginSubHeader: {
        'margin': '0 0 45px',
        'display': 'inline-block',
        'text-align': 'left',
        'border-left': '3px solid',
        'padding-left': '35px',
        'width': '100%',
        'font-weight': '100',
        'color': '#ED2553'
    },
    input: {
        margin: '10px 0'
    },
    button: {
        margin: '15px 0 30px 0',
        width: '100%'
    },
    errorMessage: {
        height: '30px'
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

    handleLogin = async () => {
        await this.props.login(this.state.userName, this.state.password);

        if (this.props.loginSuccess) {
            this.props.history.push('/event');
        }
    };

    changeUserName = e => {
        this.setState({
            userName: e.target.value
        });
    };

    changePassword = e => {
        this.setState({
            password: e.target.value
        });
    };

    render() {
        const { classes } = this.props;
        return (
            <Grid
                container
                spacing={ 0 }
                direction="column"
                alignItems="center"
                justify="center"
            >
                <Grid item xs={ 5 }>
                    <Card className={ classNames(classes.form) }>
                        <CardContent>
                            <Typography className={ classNames(classes.loginHeader) }>자바카페에 로그인</Typography>
                            <Typography
                                className={ classNames(classes.loginSubHeader) }>javacafe.cryptoband.com
                            </Typography>
                            <FormControl
                                fullWidth
                            >
                                <InputLabel htmlFor="user-id-input">유저ID</InputLabel>
                                <Input
                                    id="user-id-input"
                                    placeholder="유저ID( Email )"
                                    className={ classNames(classes.input) }
                                    onChange={ this.changeUserName }
                                />
                            </FormControl>
                            <FormControl
                                fullWidth
                            >
                                <InputLabel htmlFor="user-password">패스워드</InputLabel>
                                <Input
                                    id="user-password"
                                    placeholder="패스워드"
                                    type="password"
                                    className={ classNames(classes.input) }
                                    onChange={ this.changePassword }
                                />
                            </FormControl>
                            <Button variant="contained" color="primary" className={ classNames(classes.button) }
                                    onClick={ this.handleLogin }
                            >로그인
                            </Button>
                            <Typography className={ classNames(classes.errorMessage) }>
                                { this.props.errorMessage }
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
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

// @ts-ignore
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles, { withTheme: true })(Login));
