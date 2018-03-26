import React from 'react';
import Main from './Main';

/* eslint-disable react/prefer-stateless-function */
class Dummy extends React.Component {
  render() {
    return (
      <Main>
        <div>
          <h1>This is the dummy component</h1>
        </div>
      </Main>
    );
  }
}

export default Dummy;