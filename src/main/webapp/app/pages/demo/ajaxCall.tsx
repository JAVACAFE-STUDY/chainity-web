import React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';

const styles = theme => ({
});

class Hello extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(json => {
          this.setState({
            isLoaded: true,
            items: json
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  render() {
    // @ts-ignore
    const { classes, theme } = this.props;

    // @ts-ignore
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {items.map(item => (
            <li key={item.id}>
              <p>title: {item.title}</p>
              <p>body: {item.body}</p>
            </li>
          ))}
        </ul>
      );
    }
  }
}

export default withStyles(styles, { withTheme: true })(Hello);
