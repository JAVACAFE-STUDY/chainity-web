import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ErrorBoundary from 'app/shared/error/error-boundary';
import AppRoutes from 'app/routes';
import Footer from 'app/shared/layout/footer/footer';
import { Card } from 'reactstrap';
import Typography from '@material-ui/core/Typography/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Sidebar from '../sidebar/sidebar';

// drawer를 사용하지 않도록 설정했으므로 0px로 설정
// const drawerWidth = 240;
const drawerWidth = 0;

export interface IDrawerState {
  open: boolean;
  anchorEl: any;
}

const styles = theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
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
    [theme.breakpoints.up('sm')]: {
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
    }
  },
  'app-bar-button': {
    padding: '20px',
    color: 'rgb(255, 255, 255)'
  }
});

class MenuDrawer extends React.Component<IDrawerState> {
  state: IDrawerState = {
    open: true, // default로 열어놓도록 설정
    anchorEl: null
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    // @ts-ignore
    const { classes, theme } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    const appBar = (
      <AppBar
        position="fixed"
        className={classNames(classes.appBar, {
          [classes.appBarShift]: this.state.open
        })}
      >
        <Toolbar disableGutters={!this.state.open}>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={this.handleDrawerOpen}
            className={classNames(classes.menuButton, {
              [classes.hide]: this.state.open
            })}
          >
            <MenuIcon />
          </IconButton>
          <Link to={'/'} style={{ color: '#00ffff' }}>
            {' '}
            <Typography variant="h6" color="inherit" noWrap>
              JavaCafe
            </Typography>
          </Link>
          <div className={classes.navigationBar}>
            <Link to={'/event'} style={{ color: '#ffffff' }}>
              <Button className={classes['app-bar-button']}>이벤트</Button>
            </Link>
            <Link className={classes.appBarLink} to={'/rank'} style={{ color: '#ffffff' }}>
              <Button className={classes['app-bar-button']}>랭킹</Button>
            </Link>
          </div>
          <div className={classes.grow} />
          <div>
            <IconButton aria-owns={open ? 'menu-appbar' : undefined} aria-haspopup="true" onClick={this.handleMenu} color="inherit">
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    );

    const renderMenu = (
      <Menu
        id="menu-appbar"
        anchorEl={this.state.anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={open}
        onClose={this.handleClose}
      >
        <MenuItem onClick={this.handleClose}>Profile</MenuItem>
        <MenuItem onClick={this.handleClose}>My account</MenuItem>
      </Menu>
    );

    const drawer = (
      <Drawer
        variant="permanent"
        className={classNames(classes.drawer, {
          [classes.drawerOpen]: this.state.open,
          [classes.drawerClose]: !this.state.open
        })}
        classes={{
          paper: classNames({
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open
          })
        }}
        open={this.state.open}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={this.handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <Sidebar />
      </Drawer>
    );

    /*
      화면구성요소
      appBar : 전체 menu의 navigation영역이 담긴 header영역
      renderMenu :
      drawer : 기존 layout에서 전체 menu의 navigation 역할을 했던 left 메뉴
    */
    return (
      <div className={classes.root}>
        <CssBaseline />
        {appBar}
        {renderMenu}
        {/*drawer*/}
        <main className={classes.content}>
          <Card className="jh-card">
            <ErrorBoundary>
              <AppRoutes />
            </ErrorBoundary>
          </Card>
          <Footer />
        </main>
      </div>
    );
  }
}

// @ts-ignore
export default withStyles(styles, { withTheme: true })(MenuDrawer);
