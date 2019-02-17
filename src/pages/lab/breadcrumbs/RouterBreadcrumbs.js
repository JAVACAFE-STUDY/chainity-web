/* eslint-disable no-nested-ternary */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Link from '@material-ui/core/Link';
import NoSsr from '@material-ui/core/NoSsr';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import MemoryRouter from 'react-router/MemoryRouter';
import Route from 'react-router/Route';
import { Link as RouterLink } from 'react-router-dom';

const breadcrumbNameMap = {
  '/inbox': 'Inbox',
  '/inbox/important': 'Important',
  '/trash': 'Trash',
  '/spam': 'Spam',
  '/drafts': 'Drafts',
};

function ListItemLink(props) {
  const { to, open, ...other } = props;
  const primary = breadcrumbNameMap[to];

  return (
    <li>
      <ListItem button component={RouterLink} to={to} {...other}>
        <ListItemText primary={primary} />
        {open != null ? open ? <ExpandLess /> : <ExpandMore /> : null}
      </ListItem>
    </li>
  );
}

ListItemLink.propTypes = {
  open: PropTypes.bool,
  to: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: 360,
  },
  lists: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing.unit,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class RouterBreadcrumbs extends React.Component {
  state = {
    open: true,
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const { classes } = this.props;

    // Use NoSsr to avoid SEO issues with the documentation website.
    return (
      <NoSsr>
        <MemoryRouter initialEntries={['/inbox']} initialIndex={0}>
          <div className={classes.root}>
            <Route>
              {({ location }) => {
                const pathnames = location.pathname.split('/').filter(x => x);

                return (
                  <Breadcrumbs arial-label="Breadcrumb">
                    <Link component={RouterLink} color="inherit" to="/">
                      Home
                    </Link>
                    {pathnames.map((value, index) => {
                      const last = index === pathnames.length - 1;
                      const to = `/${pathnames.slice(0, index + 1).join('/')}`;

                      return last ? (
                        <Typography color="textPrimary" key={to}>
                          {breadcrumbNameMap[to]}
                        </Typography>
                      ) : (
                        <Link component={RouterLink} color="inherit" to={to} key={to}>
                          {breadcrumbNameMap[to]}
                        </Link>
                      );
                    })}
                  </Breadcrumbs>
                );
              }}
            </Route>
            <div className={classes.lists}>
              <List component="nav">
                <ListItemLink to="/inbox" open={this.state.open} onClick={this.handleClick} />
                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemLink to="/inbox/important" className={classes.nested} />
                  </List>
                </Collapse>
                <ListItemLink to="/trash" />
                <ListItemLink to="/spam" />
              </List>
            </div>
          </div>
        </MemoryRouter>
      </NoSsr>
    );
  }
}

RouterBreadcrumbs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RouterBreadcrumbs);
