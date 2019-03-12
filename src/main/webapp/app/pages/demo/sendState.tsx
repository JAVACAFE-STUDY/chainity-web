import React from 'react';
import UsingProps from './usingProps';

class SendProps extends React.Component {
  render() {
    return (
      // @ts-ignore
      <UsingProps props1="전달1" props2="전달2" props3="전달3"/>
    );
  }
}

export default SendProps;
