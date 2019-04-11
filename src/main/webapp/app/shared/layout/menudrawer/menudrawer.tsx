import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { createStyles, withStyles } from '@material-ui/core/styles';
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
        })
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
        'padding-left': '30px',
        '& a:hover': {
            'text-decoration': 'none'
        },
        color: '#ffffff'
    },
    'app-bar-button': {
        padding: '20px',
        color: 'rgb(255, 255, 255)'
    },
    logo: {
        width: '50px',
        height: '50px'
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

interface IDrawerProps extends StateProps, DispatchProps {}

class MenuDrawer extends React.Component<IDrawerProps, IDrawerState> {
    // @ts-ignore
    state: IDrawerState = {
        open: false,
        anchorEl: null,
        component: null
    };

    constructor(props: IDrawerProps | Readonly<IDrawerProps>, context?: any) {
        super(props, context);
    }

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
        // @ts-ignore
        const { classes, theme } = this.props;
        // @ts-ignore
        const open = Boolean(this.state.anchorEl);

        // @ts-ignore
        const appBar = (
            <AppBar
                position="fixed"
                className={ classNames(classes.appBar, {
                    [ classes.appBarShift ]: this.state.open
                }) }
            >
                <Toolbar disableGutters={ !this.state.open }>
                    <Link to={ '/' }>
                        <img
                            src={ '/content/images/logo.png' }
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
                            <img
                                className={ classes.logo }
                                src={ this.props.account.avatar }
                            />
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
                { /*drawer*/ }
                <main className={ classes.content }>
                    <Card className="jh-card">
                        <ErrorBoundary>
                            <RouterComponent { ...this.props } />
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

// @ts-ignore
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles, { withTheme: true })(MenuDrawer));
