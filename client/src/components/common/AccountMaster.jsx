import 'babel-polyfill';
import React, { ReactPropTypes } from 'react';

/* eslint-disable react/prefer-stateless-function */
class AccountMaster extends React.Component {
  render() {
    return (
      <div>
        <div className="container padding-top">
          {/*<!-- Logo Image Begins -->*/}
          <div className="row">
            <div className="col hide-on-small-only m4 l4 xl4" />
            <div className="col s12 m4 l4 xl4">
              <div className="center">
                <img className="responsive-img center" alt="" height="60" width="60" src="./assets/logo.jpg" />
              </div>
            </div>
            <div className="col hide-on-small-only m4 l4 xl4" />
          </div>
          {/*<!-- Logo Image Ends -->*/}
          {/*<!-- Heading content Begins -->*/}
          <div className="center">
            <h3 className="white-text">SLATE</h3>
            <p className="white-text">Your personal docket</p>
          </div>
          {/*<!-- Heading content Ends -->*/}
          {this.props.children}
        </div>
      </div>
    );
  }
}
/*
AccountMaster.propTypes = {
  children: ReactPropTypes.object.isRequired
};
*/

export default AccountMaster;