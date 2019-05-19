import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import classNames from 'classnames';
import { createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import ErrorBoundary from 'app/shared/error/error-boundary';
import { Card } from 'reactstrap';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { connect } from 'react-redux';
import { logout } from 'app/shared/reducers/authentication';

const styles = theme => createStyles({
    root: {
        display: 'flex'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create([ 'width', 'margin' ], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        backgroundColor: '#2196F3'
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${ drawerWidth }px)`,
        transition: theme.transitions.create([ 'width', 'margin' ], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36
    },
    loginButton: {
        marginLeft: 0
    },
    hide: {
        display: 'none'
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap'
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        overflowX: 'hidden',
        width: theme.spacing.unit * 7 + 1,
        [ theme.breakpoints.up('sm') ]: {
            width: theme.spacing.unit * 9 + 1
        }
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar
    },
    grow: {
        flexGrow: 1
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3
    },
    navigationBar: {
        display: 'inline-block',
        'padding-left': '20px',
        '& a:hover': {
            'text-decoration': 'none'
        },
        color: '#ffffff'
    },
    'app-bar-button': {
        padding: '20px',
        color: 'rgb(255, 255, 255)',
        'font-size': '17px',
        'margin-top': '-1px'
    },
    logo: {
        height: '50px',
        'margin-left': '20px'
    },
    profile: {
        width: '50px',
        height: '50px',
        'border-radius': '50%'
    }
});

// drawer를 사용하지 않도록 설정했으므로 0px로 설정
// const drawerWidth = 240;
const drawerWidth = 0;

interface IDrawerState {
    component: any;
    open?: boolean;
    anchorEl?: any;
}

interface IDrawerProps extends StateProps, DispatchProps, WithStyles, RouteComponentProps {
}

const defaultAvatar = classes =>
    (
        <img
            className={ classes.profile }
            src={ '/content/images/default-avatar.png' }
        />
    );

const profileImageElement = ({ classes, account }) => {
    if (!account.avatar) {
        return defaultAvatar(classes);
    }

    const userImage = new Image();
    userImage.onerror = () => {
        return defaultAvatar(classes);
    };
    userImage.src = account.avatar;

    return (
        <img
            className={ classes.profile }
            src={ account.avatar }
        />
    );
};

class MenuDrawer extends React.Component<IDrawerProps, IDrawerState> {
    state: IDrawerState = {
        open: false,
        anchorEl: null,
        component: null
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleLogout = () => {
        this.props.logout();
    };

    render() {
        const { classes } = this.props;
        const open = Boolean(this.state.anchorEl);

        const appBar = (
            <AppBar
                position="fixed"
                className={ classNames(classes.appBar) }
                color="inherit"
            >
                <Toolbar disableGutters={ !this.state.open }>
                    <Link to={ '/event' }>
                        <img
                            src={ '/content/images/javacafe_logo2.png' }
                            className={ classes.logo }
                        />
                    </Link>
                    <div className={ classes.navigationBar }>
                        <Link to={ '/event' }>
                            <Button className={ classes[ 'app-bar-button' ] }>이벤트</Button>
                        </Link>
                        <Link className={ classes.appBarLink } to={ '/rank' }>
                            <Button className={ classes[ 'app-bar-button' ] }>랭킹</Button>
                        </Link>
                    </div>
                    <div className={ classes.grow }/>
                    <div>
                        <IconButton aria-owns={ open ? 'menu-appbar' : undefined } aria-haspopup="true"
                                    onClick={ this.handleMenu } color="inherit">
                            {
                                profileImageElement(this.props)
                            }

                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        );

        const renderMenu = (
            <Menu
                id="menu-appbar"
                anchorEl={ this.state.anchorEl }
                anchorOrigin={ {
                    vertical: 'top',
                    horizontal: 'right'
                } }
                transformOrigin={ {
                    vertical: 'top',
                    horizontal: 'right'
                } }
                open={ open }
                onClose={ this.handleClose }
            >
                <MenuItem onClick={ this.handleClose }><Link to={ '/profile' }>프로필</Link></MenuItem>
                <MenuItem onClick={ this.handleLogout }>로그아웃</MenuItem>
            </Menu>
        );

        /*
          화면구성요소
          appBar : 전체 menu의 navigation영역이 담긴 header영역
          renderMenu :
          drawer : 기존 layout에서 전체 menu의 navigation 역할을 했던 left 메뉴
        */

        // @ts-ignore
        const RouterComponent = this.props.component;
        return (
            <div className={ classes.root }>
                <CssBaseline/>
                { appBar }
                { renderMenu }
                <main className={ classes.content }>
                    <Card className="jh-card">
                        <ErrorBoundary>
                            <RouterComponent location={ this.props.location } history={ this.props.history }/>
                        </ErrorBoundary>
                    </Card>
                </main>
            </div>
        );
    }
}

const mapStateToProps = storeState => ({
    account: storeState.authentication.account
});

type StateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = { logout };

type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles, { withTheme: true })(MenuDrawer));
