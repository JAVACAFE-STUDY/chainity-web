import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import PersonAdd from '@material-ui/icons/GroupAdd';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import { RouteComponentProps } from 'react-router';
import axios from 'axios';
// @ts-ignore
import crypto from 'crypto';

const styles = theme => createStyles({
    main: {
        width: 'auto',
        display: 'block',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
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
    }
});
interface IRegisterRouterParams {
    token: string;
}

interface IUserRegisterInfo {
    invitee: string;
    email: string;
    name: string;
    password: string;
}
interface IRegisterProps extends RouteComponentProps<IRegisterRouterParams>, WithStyles {}
interface IRegisterState {
    token: string;
    decodeToken: string[];
    userRegisterInfo?: IUserRegisterInfo;
}

function decode(urlSearch) {
    try {
        const searchParams = new URLSearchParams(urlSearch);
        const token = searchParams.get('token');
        const decipher = crypto.createDecipher('aes-256-cbc', 'CHANGE_THIS_TO_SOMETHING_RANDOM');
        return decipher.update(token, 'base64', 'utf8');
    } catch (e) {
        return '';
    }
}

class Register extends React.Component<IRegisterProps, IRegisterState> {

    state: IRegisterState = {
        token: this.props.match.params.token,
        decodeToken: decode(this.props.location.search).split('::'),
        userRegisterInfo: {
            invitee: '',
            email: '',
            name: '',
            password: ''
        }
    };

    componentDidMount(): void {
        !this.state.decodeToken[1] && this.goLoginPage();

        this.setState({
            userRegisterInfo: {
                invitee: this.state.decodeToken[0],
                email: this.state.decodeToken[1],
                name: '',
                password: ''
            }
        });
    }

    goLoginPage = () => {
        this.props.history.replace({
            pathname: '/'
        });
    };

    handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.formValidator(e);
        this.setState({
            userRegisterInfo : {
                ...this.state.userRegisterInfo,
                [e.target.name]: e.target.value
            }
        });
    };

    formValidator = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.setCustomValidity('');
        if (e.target.name === 'password') {
            if (e.target.validity.valueMissing) {
                e.target.setCustomValidity('비밀번호를 입려해주세요.');
            }
            if (e.target.validity.patternMismatch) {
                e.target.setCustomValidity('영문,숫자만 입력가능합니다.');
            }
        } else if (e.target.name === 'passwordConfirm') {
            if (this.state.userRegisterInfo.password !== e.target.value) {
                e.target.setCustomValidity('비밀번호가 일치하지 않습니다.');
            }
        }
    };

    handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const groupId = 1;
            await axios.post(`/v1/groups/${groupId}/register`, {
                groupId,
                invitee: this.state.userRegisterInfo.invitee,
                name: this.state.userRegisterInfo.name,
                password: this.state.userRegisterInfo.password
            });

            this.goLoginPage();
        } catch (e) {
            alert(e);
        }
    };

    render() {
        const { classes } = this.props;
        const hostname = window.location.host;

        return (
            <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <PersonAdd />
                    </Avatar>
                    <Typography component="h1" variant="h5">자바카페에 가입</Typography>
                    <Typography component="h1" variant="h5">{hostname}</Typography>
                    <form className={classes.form}
                          onSubmit={this.handleFormSubmit}
                    >
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">유저 ID</InputLabel>
                            <Input id="email"
                                   name="email"
                                   autoComplete="email"
                                   readOnly
                                   disabled
                                   value={this.state.userRegisterInfo.email}
                                   onChange={this.handleInputChange}
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="name">이름</InputLabel>
                            <Input id="name"
                                   name="name"
                                   onChange={this.handleInputChange}
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">비밀번호</InputLabel>
                            <Input id="password"
                                   name="password"
                                   type="password"
                                   inputProps={ {
                                       pattern: '[a-zA-Z0-9]+'
                                   }}
                                   onChange={this.handleInputChange}
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="passwordConfirm">비밀번호 확인</InputLabel>
                            <Input id="passwordConfirm"
                                   name="passwordConfirm"
                                   type="password"
                                   inputProps={ {
                                       pattern: this.state.userRegisterInfo.password
                                   }}
                                   onChange={this.handleInputChange}
                            />
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            회원가입
                        </Button>
                    </form>
                </Paper>
            </main>
        );
    }
}

export default withStyles(styles, { withTheme: true })(Register);
