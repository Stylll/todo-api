import React from 'react';

/* eslint-disable react/prefer-stateless-function */

class Display extends React.Component{
    render(){
        return (1 == 1 && this.props.check) ? <div>{this.props.children}</div> : null;
    }
}

export default Display;