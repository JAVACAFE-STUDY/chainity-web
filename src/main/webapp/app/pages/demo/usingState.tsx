import React from 'react';

class UsingProps extends React.Component {
  render() {
    // @ts-ignore
    const { props1, props2, props3 } = this.props;
    return (
      <div>
        <h1>전달받은 props</h1>
        <ul>
          <li>{ props1 }</li>
          <li>{ props2 }</li>
          <li>{ props3 }</li>
        </ul>
      </div>
    );
  }
}

export default UsingProps;
