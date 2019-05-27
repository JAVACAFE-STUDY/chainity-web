import React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';

const styles = theme => ({
  'first-p': {
    'margin-top': '20px'
  },
  secondP: {
    'margin-top': '10px'
  }
});

class Hello extends React.Component {
    render() {
        // @ts-ignore
        const { classes, theme } = this.props;
        return (
            <article>
                <h1>Hello world!</h1>
                <p className={classes['first-p']}>Hello world demo page.</p>
                <p className={classes.secondP}>If you want to see other demos, please click them in the left menu</p>
            </article>
        );
    }
}

export default withStyles(styles, { withTheme: true })(Hello);
